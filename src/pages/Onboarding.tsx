import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore } from "@/store/useGameStore"
import type { CharacterType } from "@/types"

const characters: { type: CharacterType; emoji: string; name: string; description: string }[] = [
  { type: "knight", emoji: "🛡️", name: "骑士", description: "以守护之名，为女儿撑起一片天" },
  { type: "warrior", emoji: "⚔️", name: "勇士", description: "不畏艰难，勇往直前" },
  { type: "guardian", emoji: "🌟", name: "守护者", description: "默默守护，温暖如光" },
  { type: "ranger", emoji: "🏹", name: "游侠", description: "灵活应变，独自闯天涯" },
]

const floatingEmojis = ["⭐", "🌙", "🌟", "✨", "⭐", "🌙", "🌟", "✨"]

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
}

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null)
  const [nickname, setNickname] = useState("")
  const [direction, setDirection] = useState(1)
  const navigate = useNavigate()
  const createProfile = useGameStore((s) => s.createProfile)

  const goNext = () => {
    setDirection(1)
    setStep((prev) => prev + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setStep((prev) => prev - 1)
  }

  const handleStart = () => {
    if (!selectedCharacter || !nickname.trim()) return
    createProfile(selectedCharacter, nickname.trim())
    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-adventure-cream relative overflow-hidden flex items-center justify-center">
      {floatingEmojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-2xl animate-float opacity-30 pointer-events-none select-none"
          style={{
            top: `${10 + (i * 12) % 80}%`,
            left: `${5 + (i * 14) % 90}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2.5 + (i % 3)}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      <div className="w-full max-w-lg px-6 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="welcome"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-8xl mb-6">🏰</span>
              <h1 className="font-display text-4xl text-adventure-blue mb-4">
                欢迎来到育儿大冒险
              </h1>
              <p className="font-body text-lg text-adventure-blue/70 mb-12">
                每一位独自前行的爸爸，都是最勇敢的冒险者
              </p>
              <button onClick={goNext} className="btn-adventure text-lg px-10 py-4">
                开始旅程
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="character"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <h2 className="section-title text-center mb-8">选择你的冒险者职业</h2>
              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                {characters.map((char) => (
                  <button
                    key={char.type}
                    onClick={() => setSelectedCharacter(char.type)}
                    className={`card-adventure flex flex-col items-center text-center p-5 transition-all duration-200 cursor-pointer ${
                      selectedCharacter === char.type
                        ? "ring-2 ring-adventure-orange scale-105 shadow-card-hover"
                        : "hover:shadow-card-hover"
                    }`}
                  >
                    <span className="text-5xl mb-3">{char.emoji}</span>
                    <span className="font-display text-xl text-adventure-blue mb-1">
                      {char.name}
                    </span>
                    <span className="font-body text-sm text-adventure-blue/60">
                      {char.description}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={goBack} className="btn-ghost">
                  返回
                </button>
                <button
                  onClick={goNext}
                  disabled={!selectedCharacter}
                  className="btn-adventure disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  下一步
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="nickname"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-6xl mb-6">
                {characters.find((c) => c.type === selectedCharacter)?.emoji}
              </span>
              <h2 className="section-title mb-2">给自己取一个冒险者名字</h2>
              <p className="font-body text-adventure-blue/60 mb-8">
                这个名字将伴随你的冒险旅程
              </p>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="给自己取一个冒险者名字"
                maxLength={12}
                className="w-full max-w-sm px-5 py-3 rounded-adventure border-2 border-adventure-blue/10
                           bg-white text-center font-display text-xl text-adventure-blue
                           focus:outline-none focus:border-adventure-orange focus:ring-2 focus:ring-adventure-orange/30
                           placeholder:text-adventure-blue/30 transition-all duration-200 mb-8"
              />
              <div className="flex gap-4">
                <button onClick={goBack} className="btn-ghost">
                  返回
                </button>
                <button
                  onClick={handleStart}
                  disabled={!nickname.trim()}
                  className="btn-adventure disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  开始冒险
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
