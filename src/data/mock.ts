import type { Task, Category, Tag } from '../types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Personal', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: '2', name: 'Work', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: '3', name: 'Health', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { id: '4', name: 'Learning', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' }
];

export const mockTags: Tag[] = [
  { id: '1', name: 'Development', color: 'bg-blue-50 text-blue-600' },
  { id: '2', name: 'Design', color: 'bg-pink-50 text-pink-600' },
  { id: '3', name: 'Finance', color: 'bg-emerald-50 text-emerald-600' },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Gym - Strength Training',
    completed: true,
    priority: 'high',
    categoryId: '3',
    tags: [],
    dueTime: '6:30 AM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Work on MES Plan Tracking',
    completed: false,
    priority: 'high',
    categoryId: '2',
    tags: [],
    dueTime: '10:00 AM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Study AI Concepts',
    completed: false,
    priority: 'medium',
    categoryId: '4',
    tags: [],
    dueTime: '2:00 PM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Build Todo App UI',
    completed: false,
    priority: 'high',
    categoryId: '1',
    tags: ['1'],
    dueTime: '4:00 PM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Evening Cardio',
    completed: false,
    priority: 'low',
    categoryId: '3',
    tags: [],
    dueTime: '7:00 PM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
