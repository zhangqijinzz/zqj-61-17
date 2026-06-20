import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Lock, Sparkles } from "lucide-react"
import { useGameStore } from "@/store/useGameStore"
import { skills } from "@/data/skills"

const categories = [
  { key: "全部", emoji: "🌟" },
  { key: "生活技能", emoji: "🏠" },
  { key: "情感沟通", emoji: "💬" },
  { key: "成长守护", emoji: "🛡️" },
] as const

const categoryMeta: Record<string, { emoji: string; label: string }> = {
  "生活技能": { emoji: "🏠", label: "生活技能" },
  "情感沟通": { emoji: "💬", label: "情感沟通" },
  "成长守护": { emoji: "🛡️", label: "成长守护" },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
}

export default function Skills() {
  const navigate = useNavigate()
  const userProfile = useGameStore((s) => s.userProfile)
  const unlockSkill = useGameStore((s) => s.unlockSkill)
  const [activeTab, setActiveTab] = useState<string>("全部")
  const [confirmSkillId, setConfirmSkillId] = useState<string | null>(null)

  const unlockedSkills = userProfile?.unlockedSkills ?? []

  const filteredSkills = useMemo(() => {
    const list = activeTab === "全部" ? skills : skills.filter((s) => s.category === activeTab)
    const grouped: Record<string, typeof skills> = {}
    for (const skill of list) {
      if (!grouped[skill.category]) grouped[skill.category] = []
      grouped[skill.category].push(skill)
    }
    return grouped
  }, [activeTab])

  const isUnlocked = (id: string) => unlockedSkills.includes(id)

  const prerequisitesMet = (skill: (typeof skills)[0]) =>
    skill.prerequisites.every((p) => unlockedSkills.includes(p))

  const handleSkillClick = (skill: (typeof skills)[0]) => {
    if (isUnlocked(skill.id)) {
      navigate(`/skills/${skill.id}`)
      return
    }
    if (prerequisitesMet(skill)) {
      setConfirmSkillId(skill.id)
      return
    }
    showToast()
  }

  const showToast = () => {
    const el = document.createElement("div")
    el.className =
      "fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-adventure-blue text-white font-body px-6 py-3 rounded-xl shadow-adventure-lg text-sm"
    el.textContent = "需要先解锁前置技能"
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 2000)
  }

  const handleConfirmUnlock = () => {
    if (!confirmSkillId) return
    unlockSkill(confirmSkillId)
    setConfirmSkillId(null)
    navigate(`/skills/${confirmSkillId}`)
  }

  return (
    <div className="min-h-screen bg-adventure-cream pb-8">
      <div className="bg-gradient-to-b from-adventure-blue to-adventure-blue-light rounded-b-3xl p-6 pb-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="font-display text-3xl text-white mb-2">🌳 笨拙技能树</h1>
          <p className="font-body text-white/70 text-sm">
            那些"妈妈默认技能"，爸爸也能学会！
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`shrink-0 px-4 py-2 rounded-xl font-body text-sm transition-all duration-200 ${
                activeTab === cat.key
                  ? "bg-adventure-orange text-white shadow-adventure"
                  : "bg-white text-adventure-blue border border-adventure-blue/10"
              }`}
            >
              {cat.emoji} {cat.key}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="max-w-lg mx-auto px-4 mt-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={activeTab}
      >
        {Object.entries(filteredSkills).map(([category, catSkills]) => {
          const meta = categoryMeta[category]
          return (
            <div key={category} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{meta?.emoji}</span>
                <h2 className="font-display text-xl text-adventure-blue">
                  {meta?.label ?? category}
                </h2>
                <div className="flex-1 h-px bg-adventure-blue/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {catSkills.map((skill) => {
                  const unlocked = isUnlocked(skill.id)
                  const met = prerequisitesMet(skill)
                  const prerequisiteNames = skill.prerequisites
                    .map((p) => skills.find((s) => s.id === p)?.name)
                    .filter(Boolean)

                  return (
                    <motion.div
                      key={skill.id}
                      variants={staggerItem}
                      onClick={() => handleSkillClick(skill)}
                      className={`rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        unlocked
                          ? "bg-white border-2 border-adventure-teal shadow-md hover:shadow-card-hover hover:-translate-y-0.5"
                          : "bg-gray-100 border-2 border-gray-300 opacity-70 hover:opacity-90"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{skill.emoji}</span>
                        {unlocked ? (
                          <Sparkles className="w-4 h-4 text-adventure-teal" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <h3
                        className={`font-display text-sm mb-1 ${
                          unlocked ? "text-adventure-blue" : "text-gray-400"
                        }`}
                      >
                        {skill.name}
                      </h3>
                      {!unlocked && prerequisiteNames.length > 0 && (
                        <p className="font-body text-xs text-gray-400">
                          需要先解锁: {prerequisiteNames.join("、")}
                        </p>
                      )}
                      {unlocked && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-adventure-teal font-body">✨ 已解锁</span>
                          <ChevronRight className="w-3 h-3 text-adventure-teal" />
                        </div>
                      )}
                      {!unlocked && met && (
                        <div className="mt-1">
                          <span className="text-xs text-adventure-orange font-body">
                            🔓 可解锁
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </motion.div>

      <div className="max-w-lg mx-auto px-4 mt-4">
        <button
          onClick={() => navigate("/skills/badges")}
          className="btn-adventure w-full"
        >
          🏅 查看成就徽章
        </button>
      </div>

      <AnimatePresence>
        {confirmSkillId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setConfirmSkillId(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-adventure-lg p-6 mx-4 max-w-sm w-full shadow-adventure-lg"
            >
              <h3 className="font-display text-xl text-adventure-blue mb-2">🔓 解锁技能</h3>
              <p className="font-body text-sm text-adventure-blue/70 mb-4">
                确定要解锁「{skills.find((s) => s.id === confirmSkillId)?.name}」吗？
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmSkillId(null)}
                  className="btn-ghost flex-1"
                >
                  再想想
                </button>
                <button
                  onClick={handleConfirmUnlock}
                  className="btn-adventure flex-1"
                >
                  确定解锁
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
