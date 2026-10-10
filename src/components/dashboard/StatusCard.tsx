import clsx from 'clsx';

interface StatusCardProps {
  title: string;
  count: number;
  colorClass: string;
  onClick?: () => void;
}

export default function StatusCard({ title, count, colorClass, onClick }: StatusCardProps) {
  return (
    <div 
      onClick={onClick}
      className={clsx(
        "card p-4 flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md",
        colorClass
      )}
    >
      <span className="text-3xl font-bold">{count}</span>
      <span className="text-sm font-medium mt-2">{title}</span>
    </div>
  );
}
