import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import clsx from 'clsx';

export default function FocusTimerView() {
  const { tasks } = useTaskStore();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [selectedTaskId, setSelectedTaskId] = useState('');

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Could play a sound here
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'work' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-color)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* Mode Switcher */}
        <div className="flex items-center gap-2 mb-12 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full">
          <button
            onClick={() => switchMode('work')}
            className={clsx(
              "flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all",
              mode === 'work' ? "bg-white dark:bg-gray-700 shadow-sm text-primary" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            <Briefcase size={18} />
            Work
          </button>
          <button
            onClick={() => switchMode('break')}
            className={clsx(
              "flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all",
              mode === 'break' ? "bg-white dark:bg-gray-700 shadow-sm text-green-600" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            <Coffee size={18} />
            Break
          </button>
        </div>

        {/* Timer Circle */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center mb-12">
          {/* Progress Ring Background */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              className="stroke-gray-200 dark:stroke-gray-800 fill-none"
              strokeWidth="8"
            />
            {/* Progress Ring */}
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              className={clsx(
                "fill-none transition-all duration-1000 ease-linear",
                mode === 'work' ? "stroke-primary" : "stroke-green-500"
              )}
              strokeWidth="8"
              strokeDasharray="300%"
              strokeDashoffset={`${300 - (300 * progress) / 100}%`}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="text-center z-10">
            <div className="text-7xl sm:text-8xl font-bold font-mono tracking-tighter mb-4 text-gray-900 dark:text-white">
              {formatTime(timeLeft)}
            </div>
            <p className="text-lg font-medium text-gray-500">
              {mode === 'work' ? 'Stay focused.' : 'Take a breather.'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mb-12">
          <button 
            onClick={toggleTimer}
            className={clsx(
              "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg shadow-current/20 hover:scale-105 active:scale-95 transition-all",
              mode === 'work' ? "bg-primary" : "bg-green-500"
            )}
          >
            {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          
          <button 
            onClick={resetTimer}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw size={22} />
          </button>
        </div>

        {/* Task Selector */}
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-gray-500 mb-2 text-center">
            What are you working on?
          </label>
          <select 
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800/50 border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">Select a task...</option>
            {tasks.filter(t => !t.completed).map(task => (
              <option key={task.id} value={task.id}>{task.title}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
