import { NavLink } from 'react-router-dom';
import { 
  Calendar, Inbox, CheckCircle2, Star, 
  FolderKanban, Tags, Focus, Archive, Trash2, Settings,
  Clock, Home
} from 'lucide-react';
import clsx from 'clsx';
import { useTaskStore } from '../../store/useTaskStore';

export default function Sidebar() {
  const { tasks } = useTaskStore();
  
  const todayCount = tasks.filter(t => !t.completed).length;
  const upcomingCount = tasks.filter(t => !t.completed && t.dueDate).length;
  const allCount = tasks.length;

  const navSections = [
    {
      title: 'MY TASKS',
      items: [
        { name: 'Today', path: '/', icon: Home, count: todayCount },
        { name: 'Upcoming', path: '/upcoming', icon: Clock, count: upcomingCount },
        { name: 'All Tasks', path: '/all', icon: Inbox, count: allCount },
        { name: 'Completed', path: '/completed', icon: CheckCircle2 },
        { name: 'Important', path: '/important', icon: Star },
      ]
    },
    {
      title: 'PRODUCTIVITY',
      items: [
        { name: 'Calendar', path: '/calendar', icon: Calendar },
        { name: 'Projects', path: '/projects', icon: FolderKanban },
        { name: 'Tags', path: '/tags', icon: Tags },
        { name: 'Focus', path: '/focus', icon: Focus },
      ]
    },
    {
      title: 'OTHER',
      items: [
        { name: 'Archive', path: '/archive', icon: Archive },
        { name: 'Trash', path: '/trash', icon: Trash2 },
      ]
    }
  ];

  return (
    <aside className="w-64 h-full bg-[var(--surface-color)] border-r border-[var(--border-color)] flex flex-col pt-6 pb-4">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
          <CheckCircle2 size={20} />
        </div>
        <h1 className="text-xl font-bold">MyTasks</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2 px-2 tracking-wider">
              {section.title}
            </h2>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => clsx(
                    "flex items-center justify-between px-2 py-2 rounded-lg transition-colors group",
                    isActive 
                      ? "bg-blue-50 dark:bg-blue-900/20 text-primary" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="opacity-70 group-hover:opacity-100" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-700">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>
      
      <div className="px-4 mt-auto pt-4 border-t border-[var(--border-color)]">
        <NavLink
          to="/settings"
          className={({ isActive }) => clsx(
            "flex items-center gap-3 px-2 py-2 rounded-lg transition-colors group",
            isActive 
              ? "bg-blue-50 dark:bg-blue-900/20 text-primary" 
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <Settings size={18} />
          <span className="font-medium text-sm">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
