import { useEffect, useState } from 'react';
import { Folder, MoreVertical, Plus } from 'lucide-react';

interface Project {
  name: string;
  modified: string;
}

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-color)] p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">My Projects</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your local workspaces.</p>
          </div>
          <button className="btn-primary text-sm px-3 py-1.5 rounded-lg">
            <Plus size={16} /> New Project
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div key={project.name} className="card p-4 flex items-center justify-between hover:border-primary transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-xl flex items-center justify-center">
                    <Folder size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{project.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(project.modified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
