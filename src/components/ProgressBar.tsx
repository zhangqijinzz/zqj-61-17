import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  label: string;
  color?: string;
}

export default function ProgressBar({
  value,
  label,
  color = "bg-adventure-orange",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-adventure-blue font-body">{label}</span>
        <span className="text-sm text-adventure-blue/60 font-body">
          {clampedValue}%
        </span>
      </div>
      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`${color} rounded-full h-3`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
