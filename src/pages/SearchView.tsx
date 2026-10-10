import { useState, useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from '../components/tasks/TaskItem';

export default function SearchView() {
  const [query, setQuery] = useState('');
  const { tasks, toggleTask } = useTaskStore();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(lowerQuery) || 
      (t.description && t.description.toLowerCase().includes(lowerQuery))
    );
  }, [query, tasks]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-color)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input 
            type="text" 
            placeholder="Search tasks, descriptions, or tags..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none shadow-sm"
            autoFocus
          />
        </div>

        {query.trim() && (
          <div className="mb-4 text-sm font-medium text-gray-500">
            Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </div>
        )}

        <div className="card">
          {!query.trim() ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <SearchIcon size={48} className="mb-4 opacity-20" />
              <p className="font-medium">Type above to start searching</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <p className="font-medium text-lg">No matches found</p>
              <p className="text-sm mt-1">Try adjusting your keywords.</p>
            </div>
          ) : (
            results.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
