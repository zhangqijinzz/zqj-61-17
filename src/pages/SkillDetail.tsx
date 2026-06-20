import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, ArrowLeft, Lightbulb } from "lucide-react"
import { useGameStore } from "@/store/useGameStore"
import { skills } from "@/data/skills"

export default function SkillDetail() {
  const { skillId } = useParams<{ skillId: string }>()
  const navigate = useNavigate()
  const userProfile = useGameStore((s) => s.userProfile)
  const unlockSkill = useGameStore((s) => s.unlockSkill)

  const skill = skills.find((s) => s.id === skillId)

  const isUnlocked = userProfile?.unlockedSkills.includes(skillId ?? "") ?? false

  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(0)
  const [viewedSteps, setViewedSteps] = useState<Set<number>>(new Set([0]))
  const [showSuccess, setShowSuccess] = useState(false)

  if (!skill) {
    return (
      <div className="min-h-screen bg-adventure-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-adventure-blue mb-4">技能未找到</p>
          <button onClick={() => navigate("/skills")} className="btn-adventure">
            返回技能树
          </button>
        </div>
      </div>
    )
  }

  const handleToggleStep = (index: number) => {
    if (activeStepIndex === index) {
      setActiveStepIndex(null)
    } else {
      setActiveStepIndex(index)
      setViewedSteps((prev) => new Set(prev).add(index))
    }
  }

  const handleComplete = () => {
    if (!isUnlocked && skillId) {
      unlockSkill(skillId)
    }
    setShowSuccess(true)
    setTimeout(() => {
      navigate("/skills")
    }, 2000)
  }

  const allViewed = viewedSteps.size === skill.steps.length

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
            <h1 className="font-display text-3xl text-white mb-2">
              {skill.emoji} {skill.name}
            </h1>
            <p className="font-body text-white/70 text-sm">{skill.description}</p>
            <div className="mt-3 inline-block bg-adventure-cream border border-adventure-orange/30 rounded-full px-3 py-1">
              <span className="font-body text-sm text-adventure-blue">
                {skill.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4">
        <div className="card-adventure !p-4 mb-6">
          <div className="flex items-center justify-center gap-2">
            {skill.steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  viewedSteps.has(index)
                    ? "bg-adventure-teal scale-110"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-center font-body text-xs text-adventure-blue/50 mt-2">
            学习进度 {viewedSteps.size}/{skill.steps.length}
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-3">
        {skill.steps.map((step, index) => {
          const isActive = activeStepIndex === index

          return (
            <div
              key={index}
              className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                isActive
                  ? "bg-white border-adventure-teal shadow-card"
                  : "bg-white border-gray-100"
              }`}
            >
              <button
                onClick={() => handleToggleStep(index)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-sm ${
                    viewedSteps.has(index)
                      ? "bg-adventure-teal text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="font-display text-adventure-blue flex-1">
                  {step.title}
                </span>
                {isActive ? (
                  <ChevronUp className="w-5 h-5 text-adventure-teal shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-300 shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <p className="font-body text-sm text-adventure-blue/80 leading-relaxed mb-3">
                        {step.content}
                      </p>
                      <div className="bg-adventure-gold/10 rounded-lg p-3 flex gap-2">
                        <Lightbulb className="w-5 h-5 text-adventure-gold shrink-0 mt-0.5" />
                        <p className="font-body text-sm text-adventure-blue/70 leading-relaxed">
                          {step.tip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6">
        {isUnlocked ? (
          <div className="card-adventure !p-4 text-center">
            <span className="font-display text-lg text-adventure-teal">已掌握 ✅</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            disabled={!allViewed}
            className={`w-full py-3 rounded-adventure font-display text-lg transition-all duration-200 ${
              allViewed
                ? "bg-gradient-to-b from-adventure-orange to-adventure-orange-dark text-white shadow-adventure hover:shadow-adventure-lg hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allViewed ? "完成学习" : "请先查看所有步骤"}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-adventure-lg p-8 mx-4 text-center shadow-adventure-lg"
            >
              <p className="text-6xl mb-4">🎉</p>
              <h3 className="font-display text-2xl text-adventure-blue mb-2">
                技能解锁成功！
              </h3>
              <p className="font-body text-sm text-adventure-blue/60">
                正在返回技能树...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
