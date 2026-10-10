import { NavLink } from 'react-router-dom';
import { Home, Calendar, Focus, Search, User, Plus } from 'lucide-react';
import clsx from 'clsx';
import { useModalStore } from '../../store/useModalStore';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Calendar', path: '/calendar', icon: Calendar },
  { name: 'Focus', path: '/focus', icon: Focus },
  { name: 'Search', path: '/search', icon: Search },
  { name: 'Profile', path: '/settings', icon: User },
];

export default function BottomNav() {
  const { openAddTask } = useModalStore();

  return (
    <>
      {/* Floating Action Button for Mobile */}
      <button 
        onClick={openAddTask}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all z-50 md:hidden"
        aria-label="Add Task"
      >
        <Plus size={28} />
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-[var(--surface-color)] border-t border-[var(--border-color)] flex items-center justify-around px-2 z-40 pb-safe">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive 
                ? "text-primary" 
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            <item.icon size={22} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
