import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore } from "@/store/useGameStore"
import { getBadgeById } from "@/data/badges"

export default function LegendaryCelebration() {
  const pendingLegendaryBadge = useGameStore((s) => s.pendingLegendaryBadge)
  const markLegendaryCelebrationShown = useGameStore((s) => s.markLegendaryCelebrationShown)
  const clearPendingLegendaryBadge = useGameStore((s) => s.clearPendingLegendaryBadge)

  const [visible, setVisible] = useState(false)
  const [badge, setBadge] = useState<ReturnType<typeof getBadgeById>>(undefined)

  useEffect(() => {
    if (pendingLegendaryBadge) {
      const badgeData = getBadgeById(pendingLegendaryBadge)
      setBadge(badgeData)
      setVisible(true)
    }
  }, [pendingLegendaryBadge])

  const handleClose = () => {
    setVisible(false)
    markLegendaryCelebrationShown()
    clearPendingLegendaryBadge()
  }

  const badgeInfo = badge || {
    name: "传说徽章",
    emoji: "🏆",
    description: "恭喜获得传说级徽章！",
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: "50%",
                  y: "100vh",
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: `${20 + Math.random() * 60}%`,
                  y: `${-10 - Math.random() * 20}%`,
                  scale: 1,
                  opacity: [0, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                  times: [0, 0.5, 1],
                }}
                className="absolute text-4xl"
              >
                {["✨", "🌟", "⭐", "💫", "🎉", "🎊"][i % 6]}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            className="relative z-10 text-center px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-adventure-gold via-yellow-300 to-adventure-gold rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-adventure-gold to-adventure-orange flex items-center justify-center shadow-2xl border-4 border-yellow-200">
                <span className="text-7xl">{badgeInfo.emoji}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <motion.div
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-yellow-200 via-adventure-gold to-yellow-200 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
              >
                🎉 传说成就达成！🎉
              </motion.div>

              <h2 className="text-3xl font-display text-white mb-2">
                {badgeInfo.name}
              </h2>

              <p className="text-white/80 font-body text-lg mb-8 max-w-sm mx-auto">
                {badgeInfo.description}
              </p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-adventure-gold to-adventure-orange rounded-full mb-6">
                  <span className="text-white font-bold text-lg">⭐ 传说级徽章 ⭐</span>
                </div>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="px-8 py-3 bg-white text-adventure-blue font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                太棒了！
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
