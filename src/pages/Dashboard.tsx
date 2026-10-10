import { useState } from 'react';
import { Search, Bell, Sun, Moon, Plus } from 'lucide-react';
import StatusCard from '../components/dashboard/StatusCard';
import TaskItem from '../components/tasks/TaskItem';
import { useThemeStore } from '../store/useThemeStore';
import { useModalStore } from '../store/useModalStore';
import { useTaskStore } from '../store/useTaskStore';

export default function Dashboard() {
  const { openAddTask } = useModalStore();
  const { tasks, toggleTask } = useTaskStore();
  const { isDark, toggleTheme } = useThemeStore();

  const handleToggleTask = (id: string) => {
    toggleTask(id);
  };

  const todayTasks = tasks.filter(t => !t.completed); // Mock filter for "Today"

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-color)]">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--surface-color)] sticky top-0 z-10">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks, tags, or notes..." 
              className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-all outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 ml-4">
          <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border-color)]">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Surya" alt="User Profile" className="w-full h-full object-cover bg-blue-100" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Good Morning, Zoro {isDark ? '🌙' : '☀️'}</h1>
              <p className="text-gray-500 dark:text-gray-400">Make it happen today.</p>
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-500">Tue, 16 Sep 2026</div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatusCard 
              title="Today" 
              count={5} 
              colorClass="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" 
            />
            <StatusCard 
              title="Upcoming" 
              count={8} 
              colorClass="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
            />
            <StatusCard 
              title="Completed" 
              count={12} 
              colorClass="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400" 
            />
            <StatusCard 
              title="High Priority" 
              count={4} 
              colorClass="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" 
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Task List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Today</h2>
                <button 
                  onClick={openAddTask}
                  className="btn-primary text-sm px-3 py-1.5 rounded-lg hidden sm:flex"
                >
                  <Plus size={16} /> Add Task
                </button>
              </div>
              
              <div className="card">
                {todayTasks.map(task => (
                  <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
                ))}
              </div>
            </div>

            {/* Right Sidebar (Quick Add / Calendar / Tags) */}
            <div className="w-full lg:w-80 space-y-6">
              {/* Quick Add */}
              <div className="card p-4">
                <h3 className="font-bold mb-3">Quick Add</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="What do you want to do?" 
                    className="input-field pr-12 text-sm"
                  />
                  <button 
                    onClick={openAddTask}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-hover transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Calendar Widget Placeholder */}
              <div className="card p-4 hidden lg:block">
                <h3 className="font-bold mb-3">Calendar</h3>
                <div className="text-center text-gray-500 py-8 text-sm">
                  Calendar component will go here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
