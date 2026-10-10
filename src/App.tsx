import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import CalendarView from './pages/CalendarView';
import ProjectsView from './pages/ProjectsView';
import TaskListView from './pages/TaskListView';
import FocusTimerView from './pages/FocusTimerView';
import SearchView from './pages/SearchView';
import TagsCategoriesView from './pages/TagsCategoriesView';
import { useTaskStore } from './store/useTaskStore';
import { Calendar, Clock, Inbox, CheckCircle2, Star, FolderKanban, Tags, Focus, Archive, Trash2, Settings } from 'lucide-react';

function App() {
  const { fetchData, isLoading } = useTaskStore();

  // Theme initialization
  useEffect(() => {
    // Check for dark mode preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upcoming" element={<TaskListView title="Upcoming" description="Tasks with upcoming due dates." filterFn={(t) => !t.completed && !!t.dueDate} />} />
          <Route path="all" element={<TaskListView title="All Tasks" description="Everything you need to do." filterFn={() => true} />} />
          <Route path="completed" element={<TaskListView title="Completed" description="Your finished tasks." filterFn={(t) => t.completed} />} />
          <Route path="important" element={<TaskListView title="Important" description="Tasks marked as high priority." filterFn={(t) => t.priority === 'high'} />} />
          
          <Route path="calendar" element={<CalendarView />} />
          <Route path="projects" element={<ProjectsView />} />
          <Route path="tags" element={<TagsCategoriesView />} />
          <Route path="focus" element={<FocusTimerView />} />
          <Route path="search" element={<SearchView />} />
          
          <Route path="archive" element={<PlaceholderPage title="Archive" icon={<Archive size={32} />} />} />
          <Route path="trash" element={<PlaceholderPage title="Trash" icon={<Trash2 size={32} />} />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" icon={<Settings size={32} />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
