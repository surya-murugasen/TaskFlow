import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import TaskItem from '../components/tasks/TaskItem';
import { useTaskStore } from '../store/useTaskStore';

export default function CalendarView() {
  const { tasks, toggleTask } = useTaskStore();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 16)); // Sept 16, 2026

  const daysInMonth = 30; // Hardcoded for mockup
  const startingDay = 2; // Tuesday

  const days = Array.from({ length: 35 }).map((_, i) => {
    const dayNumber = i - startingDay + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-color)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Calendar</h1>
            <p className="text-gray-500 dark:text-gray-400">Plan your days ahead.</p>
          </div>
          <button className="btn-primary text-sm px-3 py-1.5 rounded-lg hidden sm:flex">
            <Plus size={16} /> Add Event
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar Grid */}
          <div className="flex-1 card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">September 2026</h2>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs font-semibold text-gray-400 py-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {days.map((day, i) => (
                <div 
                  key={i} 
                  className={`
                    aspect-square flex flex-col items-center justify-center p-1 sm:p-2 rounded-xl text-sm transition-colors cursor-pointer
                    ${!day ? 'invisible' : ''}
                    ${day === 16 ? 'bg-primary text-white font-bold shadow-md' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                  `}
                >
                  {day}
                  {day === 16 && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
                  {day === 18 && <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Schedule List */}
          <div className="w-full lg:w-96 flex flex-col gap-4">
            <h3 className="font-bold text-lg">Schedule for Sep 16</h3>
            <div className="card">
              {tasks.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No tasks for this day!</div>
              ) : (
                tasks.map(task => (
                  <TaskItem key={task.id} task={task} onToggle={toggleTask} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
