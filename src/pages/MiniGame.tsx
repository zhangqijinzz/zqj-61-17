import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, RotateCcw } from "lucide-react"

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const emojis = ["🌟", "🌙", "⭐", "🦋", "🌸", "🎀"]

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function createCards(): Card[] {
  const pairs = [...emojis, ...emojis]
  const shuffled = shuffleArray(pairs)
  return shuffled.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }))
}

export default function MiniGame() {
  const navigate = useNavigate()
  const [cards, setCards] = useState<Card[]>(createCards)
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState(0)
  const [isChecking, setIsChecking] = useState(false)

  const isComplete = matchedPairs === emojis.length

  const handleCardClick = useCallback(
    (index: number) => {
      if (isChecking) return
      if (cards[index].isFlipped || cards[index].isMatched) return
      if (flippedIndices.length >= 2) return

      const newCards = [...cards]
      newCards[index] = { ...newCards[index], isFlipped: true }
      setCards(newCards)

      const newFlipped = [...flippedIndices, index]
      setFlippedIndices(newFlipped)

      if (newFlipped.length === 2) {
        setMoves((prev) => prev + 1)
        setIsChecking(true)

        const [first, second] = newFlipped
        if (newCards[first].emoji === newCards[second].emoji) {
          const matched = newCards.map((card, i) =>
            i === first || i === second
              ? { ...card, isMatched: true }
              : card
          )
          setTimeout(() => {
            setCards(matched)
            setMatchedPairs((prev) => prev + 1)
            setFlippedIndices([])
            setIsChecking(false)
          }, 500)
        } else {
          setTimeout(() => {
            const reset = newCards.map((card, i) =>
              i === first || i === second
                ? { ...card, isFlipped: false }
                : card
            )
            setCards(reset)
            setFlippedIndices([])
            setIsChecking(false)
          }, 1000)
        }
      }
    },
    [cards, flippedIndices, isChecking]
  )

  const handleReset = () => {
    setCards(createCards())
    setFlippedIndices([])
    setMatchedPairs(0)
    setMoves(0)
    setIsChecking(false)
  }

  return (
    <div className="min-h-screen bg-adventure-cream pb-8">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <button
            onClick={() => navigate("/contract")}
            className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center cursor-pointer hover:shadow-card-hover transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-adventure-blue" />
          </button>
          <div>
            <h1 className="section-title text-2xl">🎮 记忆翻牌</h1>
            <p className="font-body text-sm text-adventure-blue/60">
              找到所有配对，挑战你的记忆力！
            </p>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-adventure-blue">
              步数: {moves}
            </span>
            <span className="font-display text-adventure-orange">
              配对: {matchedPairs}/{emojis.length}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="btn-ghost !px-3 !py-1.5 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            重来
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="aspect-square cursor-pointer"
              onClick={() => handleCardClick(index)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-full h-full" style={{ perspective: 600 }}>
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-adventure-blue to-adventure-blue-light flex items-center justify-center shadow-card"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-3xl">❓</span>
                  </div>
                  <div
                    className={`absolute inset-0 rounded-xl flex items-center justify-center border-2 ${
                      card.isMatched
                        ? "bg-adventure-teal/20 border-adventure-teal"
                        : "bg-white border-adventure-orange"
                    }`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <span className="text-3xl">{card.emoji}</span>
                    {card.isMatched && (
                      <span className="absolute top-1 right-1 text-adventure-teal text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="card-adventure mt-6 text-center bg-gradient-to-b from-adventure-gold/20 to-adventure-orange/10 border-2 border-adventure-gold"
            >
              <span className="text-5xl block mb-3">🎉</span>
              <h3 className="font-display text-2xl text-adventure-blue mb-2">
                恭喜通关!
              </h3>
              <p className="font-body text-adventure-blue/70 mb-4">
                你用了 {moves} 步完成了所有配对！
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={handleReset} className="btn-adventure">
                  <RotateCcw className="w-4 h-4" />
                  再来一次
                </button>
                <button
                  onClick={() => navigate("/contract")}
                  className="btn-ghost"
                >
                  返回契约
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
