import { useState } from 'react';
import { Plus, Tag as TagIcon, X, Check } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import clsx from 'clsx';
import type { Tag, Category } from '../types';

export default function TagsCategoriesView() {
  const { tags, categories, addTag, addCategory, deleteTag, deleteCategory } = useTaskStore();
  const [newTagName, setNewTagName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const colors = [
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  ];

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    addTag({ id: crypto.randomUUID(), name: newTagName, color: randomColor });
    setNewTagName('');
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    addCategory({ id: crypto.randomUUID(), name: newCategoryName, color: randomColor });
    setNewCategoryName('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-color)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Tags & Categories</h1>
          <p className="text-gray-500 dark:text-gray-400">Organize your tasks with custom labels.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Categories Section */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span className="text-2xl">📁</span> Categories
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              {categories.map(category => (
                <div key={category.id} className="flex items-center justify-between p-3 border border-[var(--border-color)] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={clsx("w-3 h-3 rounded-full", category.color.split(' ')[0])}></div>
                    <span className="font-medium text-sm">{category.name}</span>
                  </div>
                  <button onClick={() => deleteCategory(category.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="New Category..." 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1 input-field py-2 text-sm"
              />
              <button 
                onClick={handleAddCategory}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Tags Section */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span className="text-2xl">🏷️</span> Tags
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map(tag => (
                <div key={tag.id} className={clsx("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium", tag.color)}>
                  <TagIcon size={14} />
                  {tag.name}
                  <button onClick={() => deleteTag(tag.id)} className="ml-1 opacity-60 hover:opacity-100 transition-opacity">
                    <X size={14} />
                  </button>
                </div>
              ))}
              {tags.length === 0 && (
                <div className="text-sm text-gray-500 italic p-2">No tags created yet.</div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="New Tag..." 
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="flex-1 input-field py-2 text-sm"
              />
              <button 
                onClick={handleAddTag}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
