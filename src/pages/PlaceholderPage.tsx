interface PlaceholderPageProps {
  title: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({ title, icon }: PlaceholderPageProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-8 text-center bg-[var(--bg-color)]">
      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-2xl flex items-center justify-center mb-6">
        {icon || <div className="text-2xl font-bold">{title.charAt(0)}</div>}
      </div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        This section is currently under development. You'll be able to manage your {title.toLowerCase()} here soon!
      </p>
    </div>
  );
}
