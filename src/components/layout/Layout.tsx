import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import AddTaskModal from '../tasks/AddTaskModal';
import { useModalStore } from '../../store/useModalStore';

export default function Layout() {
  const { isAddTaskOpen, closeAddTask } = useModalStore();

  return (
    <div className="flex h-screen bg-[var(--bg-color)] text-[var(--text-color)] overflow-hidden">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <div className="md:hidden">
        <BottomNav />
      </div>
      
      {/* Global Modals */}
      <AddTaskModal isOpen={isAddTaskOpen} onClose={closeAddTask} />
    </div>
  );
}
