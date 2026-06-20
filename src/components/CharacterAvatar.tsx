import { CharacterType } from "@/types";

const characterConfig: Record<
  CharacterType,
  { gradient: string; emoji: string }
> = {
  knight: { gradient: "from-amber-400 to-orange-600", emoji: "🛡️" },
  warrior: { gradient: "from-red-400 to-rose-600", emoji: "⚔️" },
  guardian: { gradient: "from-blue-400 to-indigo-600", emoji: "🌟" },
  ranger: { gradient: "from-green-400 to-emerald-600", emoji: "🏹" },
};

const sizeMap = {
  sm: "w-10 h-10 text-lg",
  md: "w-16 h-16 text-2xl",
  lg: "w-24 h-24 text-4xl",
};

interface CharacterAvatarProps {
  characterType: CharacterType;
  size?: "sm" | "md" | "lg";
}

export default function CharacterAvatar({
  characterType,
  size = "md",
}: CharacterAvatarProps) {
  const { gradient, emoji } = characterConfig[characterType];

  return (
    <div
      className={`${sizeMap[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center border-2 border-white shadow-lg ${
        size === "lg" ? "animate-float" : ""
      }`}
    >
      <span>{emoji}</span>
    </div>
  );
}
