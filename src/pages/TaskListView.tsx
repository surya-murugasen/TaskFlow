import { useTaskStore } from '../store/useTaskStore';
import TaskItem from '../components/tasks/TaskItem';

interface TaskListViewProps {
  title: string;
  description: string;
  filterFn: (task: any) => boolean;
}

export default function TaskListView({ title, description, filterFn }: TaskListViewProps) {
  const { tasks, toggleTask } = useTaskStore();
  const filteredTasks = tasks.filter(filterFn);

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-color)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>

        <div className="card">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <p className="font-medium text-lg">No tasks found</p>
              <p className="text-sm mt-1">Add some tasks to see them here.</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
