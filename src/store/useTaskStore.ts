import { create } from 'zustand';
import type { Task, Category, Tag } from '../types';
import { supabase } from '../lib/supabase';

interface TaskState {
  tasks: Task[];
  categories: Category[];
  tags: Tag[];
  isLoading: boolean;
  
  // Actions
  fetchData: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addTag: (tag: Tag) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: [],
  categories: [],
  tags: [],
  isLoading: true,

  fetchData: async () => {
    set({ isLoading: true });
    
    const [tasksRes, categoriesRes, tagsRes] = await Promise.all([
      supabase.from('tasks').select('*'),
      supabase.from('categories').select('*'),
      supabase.from('tags').select('*'),
    ]);

    if (!tasksRes.error && !categoriesRes.error && !tagsRes.error) {
      set({
        tasks: tasksRes.data as Task[],
        categories: categoriesRes.data as Category[],
        tags: tagsRes.data as Tag[],
      });
    } else {
      console.error('Error fetching data from Supabase:', {
        tasksError: tasksRes.error,
        categoriesError: categoriesRes.error,
        tagsError: tagsRes.error
      });
    }
    
    set({ isLoading: false });
  },

  addTask: async (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Optimistic update
    set((state) => ({ tasks: [newTask, ...state.tasks] }));

    // Sync to Supabase
    const { error } = await supabase.from('tasks').insert(newTask);
    if (error) {
      console.error('Failed to add task to Supabase:', error);
      // Revert optimistic update
      set((state) => ({ tasks: state.tasks.filter(t => t.id !== newTask.id) }));
    }
  },

  toggleTask: async (id) => {
    const task = get().tasks.find(t => t.id === id);
    if (!task) return;
    
    const newCompletedStatus = !task.completed;
    const newUpdatedAt = new Date().toISOString();

    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map(t => 
        t.id === id ? { ...t, completed: newCompletedStatus, updatedAt: newUpdatedAt } : t
      )
    }));

    // Sync to Supabase
    const { error } = await supabase
      .from('tasks')
      .update({ completed: newCompletedStatus, updatedAt: newUpdatedAt })
      .eq('id', id);

    if (error) {
      console.error('Failed to toggle task in Supabase:', error);
      // Revert optimistic update
      set((state) => ({
        tasks: state.tasks.map(t => 
          t.id === id ? { ...t, completed: !newCompletedStatus } : t
        )
      }));
    }
  },

  deleteTask: async (id) => {
    const taskToDelete = get().tasks.find(t => t.id === id);
    
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.filter(t => t.id !== id)
    }));

    // Sync to Supabase
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    
    if (error && taskToDelete) {
      console.error('Failed to delete task in Supabase:', error);
      // Revert optimistic update
      set((state) => ({ tasks: [...state.tasks, taskToDelete] }));
    }
  },

  addTag: async (tag) => {
    set((state) => ({ tags: [...state.tags, tag] }));
    const { error } = await supabase.from('tags').insert(tag);
    if (error) set((state) => ({ tags: state.tags.filter(t => t.id !== tag.id) }));
  },

  deleteTag: async (id) => {
    const tagToDelete = get().tags.find(t => t.id === id);
    set((state) => ({ tags: state.tags.filter(t => t.id !== id) }));
    const { error } = await supabase.from('tags').delete().eq('id', id);
    if (error && tagToDelete) set((state) => ({ tags: [...state.tags, tagToDelete] }));
  },

  addCategory: async (category) => {
    set((state) => ({ categories: [...state.categories, category] }));
    const { error } = await supabase.from('categories').insert(category);
    if (error) set((state) => ({ categories: state.categories.filter(c => c.id !== category.id) }));
  },

  deleteCategory: async (id) => {
    const categoryToDelete = get().categories.find(c => c.id === id);
    set((state) => ({ categories: state.categories.filter(c => c.id !== id) }));
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error && categoryToDelete) set((state) => ({ categories: [...state.categories, categoryToDelete] }));
  },
}));
