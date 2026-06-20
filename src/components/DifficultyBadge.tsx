interface DifficultyBadgeProps {
  difficulty: "easy" | "medium" | "hard";
}

const difficultyConfig = {
  easy: { className: "bg-adventure-teal/20 text-adventure-teal", label: "简单" },
  medium: { className: "bg-adventure-orange/20 text-adventure-orange", label: "中等" },
  hard: { className: "bg-red-500/20 text-red-500", label: "困难" },
};

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const { className, label } = difficultyConfig[difficulty];

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
