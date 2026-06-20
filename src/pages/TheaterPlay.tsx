import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { scenarios } from "@/data/scenarios"
import { useGameStore } from "@/store/useGameStore"
import type { Option } from "@/types"

export default function TheaterPlay() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const navigate = useNavigate()
  const completeScenario = useGameStore((s) => s.completeScenario)

  const scenario = scenarios.find((s) => s.id === scenarioId)

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [choices, setChoices] = useState<{ sceneId: string; optionId: string }[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  if (!scenario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-adventure-cream">
        <p className="font-body text-adventure-blue/60">情景不存在</p>
      </div>
    )
  }

  const currentScene = scenario.scenes[currentSceneIndex]

  function handleOptionClick(option: Option) {
    setSelectedOption(option)
    setShowFeedback(true)
    setChoices((prev) => [
      ...prev,
      { sceneId: currentScene.id, optionId: option.id },
    ])
  }

  function handleContinue() {
    if (!selectedOption) return

    if (selectedOption.nextSceneId === null) {
      completeScenario(scenario.id, choices)
      navigate(`/theater/${scenario.id}/review`, { state: { choices } })
      return
    }

    const nextIndex = scenario.scenes.findIndex(
      (s) => s.id === selectedOption.nextSceneId
    )
    if (nextIndex !== -1) {
      setShowFeedback(false)
      setSelectedOption(null)
      setCurrentSceneIndex(nextIndex)
    }
  }

  return (
    <div className="min-h-screen bg-adventure-cream px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="section-title text-xl">{scenario.title}</h1>
          <div className="mt-3 flex items-center gap-2">
            {scenario.scenes.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all ${
                  i <= currentSceneIndex
                    ? "bg-adventure-orange"
                    : "bg-adventure-blue/20"
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 rounded-adventure-lg border-l-4 border-adventure-orange bg-white/80 p-6 backdrop-blur">
              <span className="mb-2 inline-block rounded-full bg-adventure-pink/20 px-3 py-0.5 text-xs font-body text-adventure-pink">
                {currentScene.backgroundEmotion}
              </span>
              <p className="font-body leading-relaxed text-adventure-blue">
                {currentScene.narration}
              </p>
            </div>

            {!showFeedback && (
              <div className="space-y-3">
                {currentScene.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className="w-full rounded-xl border-2 border-gray-200 p-4 text-left font-body transition-all hover:border-adventure-orange"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}

            {showFeedback && selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-4 rounded-xl border-2 border-adventure-orange bg-adventure-orange/5 p-4 font-body text-adventure-blue">
                  {selectedOption.text}
                </div>

                <div
                  className={`mb-4 rounded-xl border p-4 font-body ${
                    selectedOption.isRecommended
                      ? "border-adventure-teal bg-adventure-teal/10"
                      : "border-adventure-gold bg-adventure-gold/10"
                  }`}
                >
                  <p className="mb-1 text-sm font-display">
                    {selectedOption.isRecommended
                      ? "🌟 推荐做法"
                      : "⚠️ 可以改进"}
                  </p>
                  <p className="mb-2 text-sm text-adventure-blue/70">
                    {selectedOption.consequence}
                  </p>
                  <p className="text-sm text-adventure-blue">
                    {selectedOption.feedback}
                  </p>
                </div>

                <button
                  onClick={handleContinue}
                  className="btn-adventure flex items-center gap-2"
                >
                  继续 <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
