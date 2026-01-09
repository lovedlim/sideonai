import { ReactNode } from "react";

interface LinkButtonProps {
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
}

export default function LinkButton({
  href,
  onClick,
  icon,
  title,
  subtitle,
  disabled = false,
}: LinkButtonProps) {
  const content = (
    <div
      className={`
        w-full px-6 py-4 rounded-2xl
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-md
        transition-all duration-200
        flex items-center justify-between
        group
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"}
      `}
    >
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        {icon && (
          <div className="flex-shrink-0 text-2xl">{icon}</div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 dark:text-white text-base">
            {title}
          </div>
          {subtitle && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
        →
      </div>
    </div>
  );

  if (disabled) {
    return <div>{content}</div>;
  }

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full">
        {content}
      </button>
    );
  }

  return content;
}
