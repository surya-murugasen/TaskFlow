import { Check, MoreHorizontal } from 'lucide-react';
import type { Task, Category } from '../../types';
import clsx from 'clsx';
import { mockCategories } from '../../data/mock';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const category = mockCategories.find(c => c.id === task.categoryId);

  return (
    <div className="group flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors border-b border-transparent hover:border-[var(--border-color)]">
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className={clsx(
            "w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            task.completed
              ? "bg-primary border-primary text-white"
              : "border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary"
          )}
        >
          {task.completed && <Check size={14} strokeWidth={3} />}
        </button>
        
        <div className="flex flex-col flex-1 min-w-0">
          <span className={clsx(
            "text-sm sm:text-base font-medium truncate transition-colors",
            task.completed ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-800 dark:text-gray-200"
          )}>
            {task.title}
          </span>
          
          {(category || task.priority !== 'low') && (
            <div className="flex items-center gap-2 mt-1">
              {category && (
                <span className={clsx("text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-md", category.color)}>
                  {category.name}
                </span>
              )}
              {task.priority !== 'low' && (
                <span className={clsx(
                  "text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-md",
                  task.priority === 'high' 
                    ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" 
                    : "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                )}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 ml-4">
        {task.dueTime && (
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
            {task.dueTime}
          </span>
        )}
        <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
