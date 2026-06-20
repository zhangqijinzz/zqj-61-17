import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useGameStore } from "@/store/useGameStore"
import { skills } from "@/data/skills"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
}

export default function Badges() {
  const navigate = useNavigate()
  const userProfile = useGameStore((s) => s.userProfile)
  const earnedBadges = userProfile?.earnedBadges ?? []

  const allBadges = useMemo(
    () =>
      skills.map((skill) => ({
        id: `${skill.id}-badge`,
        skillId: skill.id,
        name: skill.name,
        emoji: skill.emoji,
        earned: earnedBadges.includes(`${skill.id}-badge`),
      })),
    [earnedBadges]
  )

  const earnedCount = allBadges.filter((b) => b.earned).length

  return (
    <div className="min-h-screen bg-adventure-cream pb-8">
      <div className="bg-gradient-to-b from-adventure-blue to-adventure-blue-light rounded-b-3xl p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/skills")}
            className="flex items-center gap-1 text-white/70 font-body text-sm mb-4 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回技能树
          </button>
          <div className="text-center">
            <h1 className="font-display text-3xl text-white mb-2">🏅 成就徽章墙</h1>
            <p className="font-body text-white/70 text-sm mb-4">
              每一枚徽章，都是成长的见证
            </p>
            <div className="inline-block bg-white/10 rounded-full px-4 py-1">
              <span className="font-body text-white text-sm">
                已获得 {earnedCount} / {allBadges.length} 枚徽章
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="max-w-lg mx-auto px-4 mt-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-3 gap-4">
          {allBadges.map((badge) => (
            <motion.div
              key={badge.id}
              variants={staggerItem}
              className="flex flex-col items-center"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 ${
                  badge.earned
                    ? "bg-gradient-to-br from-adventure-gold to-adventure-orange text-white shadow-lg animate-pulse-glow"
                    : "bg-gray-200 opacity-50 grayscale"
                }`}
              >
                {badge.earned ? (
                  <span className="text-3xl">{badge.emoji}</span>
                ) : (
                  <span className="text-2xl">🔒</span>
                )}
              </div>
              <span
                className={`font-body text-xs text-center leading-tight ${
                  badge.earned ? "text-adventure-blue" : "text-gray-400"
                }`}
              >
                {badge.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="max-w-lg mx-auto px-4 mt-8">
        <button
          onClick={() => navigate("/skills")}
          className="btn-ghost w-full"
        >
          🌳 返回技能树
        </button>
      </div>
    </div>
  )
}
