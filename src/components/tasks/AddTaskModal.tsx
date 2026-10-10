import { useState } from 'react';
import { X, Calendar, Clock, Flag, Tag as TagIcon, ListTodo } from 'lucide-react';
import clsx from 'clsx';
import { useTaskStore } from '../../store/useTaskStore';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { addTask, categories } = useTaskStore();

  const handleSave = () => {
    if (!title.trim()) return;
    addTask({
      title,
      description: notes,
      completed: false,
      priority,
      categoryId: categoryId || undefined,
      dueDate: dueDate || undefined,
      tags: [],
    });
    
    setTitle('');
    setNotes('');
    setPriority('medium');
    setCategoryId('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-[var(--surface-color)] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
          <h2 className="text-lg font-bold">Add Task</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Title & Notes */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-lg font-semibold border-none focus:outline-none placeholder:text-gray-400"
              autoFocus
            />
            <textarea
              placeholder="Notes (optional)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-transparent text-sm border-none focus:outline-none placeholder:text-gray-400 resize-none h-20"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
            {/* Date & Time */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={18} className="text-gray-500" />
                  <span>Today</span>
                </div>
              </button>
              <button className="flex-1 flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={18} className="text-gray-500" />
                  <span className="text-gray-500">Add Time</span>
                </div>
              </button>
            </div>

            {/* Priority */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)]">
              <div className="flex items-center gap-3 text-sm">
                <Flag size={18} className="text-gray-500" />
                <span>Priority</span>
              </div>
              <div className="flex items-center gap-2">
                {(['low', 'medium', 'high'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={clsx(
                      "px-3 py-1 text-xs font-medium rounded-lg transition-colors capitalize",
                      priority === p 
                        ? p === 'high' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                          p === 'medium' ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)]">
              <div className="flex items-center gap-3 text-sm">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="input-field"
                  >
                    <option value="">No Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)]">
              <div className="flex items-center gap-3 text-sm">
                <TagIcon size={18} className="text-gray-500" />
                <span>Tags</span>
              </div>
              <button className="text-primary bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-medium rounded-lg">
                + Add
              </button>
            </div>
            
            {/* Subtasks */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)]">
              <div className="flex items-center gap-3 text-sm">
                <ListTodo size={18} className="text-gray-500" />
                <span>Subtasks</span>
              </div>
              <button className="text-gray-400 hover:text-primary transition-colors">
                <X className="rotate-45" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-color)] flex justify-end">
          <button 
            className="btn-primary w-full sm:w-auto"
            onClick={handleSave}
            disabled={!title.trim()}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

function FolderKanbanIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
      <path d="M8 10v4"/>
      <path d="M12 10v2"/>
      <path d="M16 10v6"/>
    </svg>
  );
}
