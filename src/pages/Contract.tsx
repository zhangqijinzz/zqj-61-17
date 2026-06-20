import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2 } from "lucide-react"
import { useGameStore } from "@/store/useGameStore"
import { defaultMissions } from "@/data/missions"
import type { Mission } from "@/types"

const emojiOptions = ["🎯", "🎨", "🏃‍♂️", "🎵", "📝", "🧹", "🌻", "🤗"]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
}

export default function Contract() {
  const navigate = useNavigate()
  const missions = useGameStore((s) => s.missions)
  const toggleMission = useGameStore((s) => s.toggleMission)
  const addMission = useGameStore((s) => s.addMission)
  const removeMission = useGameStore((s) => s.removeMission)

  const [showModal, setShowModal] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newEmoji, setNewEmoji] = useState("🎯")

  useEffect(() => {
    if (missions.length === 0) {
      defaultMissions.forEach((m) => addMission(m))
    }
  }, [])

  const completedCount = missions.filter((m) => m.completed).length
  const totalCount = missions.length
  const allCompleted = totalCount > 0 && completedCount === totalCount
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleSubmit = () => {
    if (!newTitle.trim()) return
    const mission: Mission = {
      id: `mission-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      completed: false,
      weekStart: new Date().toISOString().split("T")[0],
      emoji: newEmoji,
    }
    addMission(mission)
    setNewTitle("")
    setNewDesc("")
    setNewEmoji("🎯")
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-adventure-cream pb-8">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="section-title text-3xl">📜 父女任务契约</h1>
          <p className="font-body text-adventure-blue/60 mt-1">
            每周一个小目标，让陪伴更有仪式感
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card-adventure mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-adventure-blue">
              本周完成 {completedCount} / {totalCount} 项
            </span>
            <span className="font-display text-adventure-orange text-sm">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-adventure-teal to-adventure-teal/70 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {allCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-adventure mb-6 text-center bg-gradient-to-b from-adventure-gold/20 to-adventure-orange/10 border-2 border-adventure-gold"
            >
              <span className="text-4xl block mb-2">🎉</span>
              <h3 className="font-display text-xl text-adventure-blue mb-2">
                恭喜！本周任务全部完成！
              </h3>
              <p className="font-body text-adventure-blue/60 mb-4">
                你和女儿的契约全部兑现，太棒了！
              </p>
              <button
                onClick={() => navigate("/contract/mini-game/puzzle")}
                className="btn-adventure"
              >
                🎮 解锁双人小游戏!
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <AnimatePresence>
            {missions.map((mission) => (
              <motion.div
                key={mission.id}
                variants={staggerItem}
                exit="exit"
                layout
                className={`bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 transition-opacity ${
                  mission.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleMission(mission.id)}
                    className={`w-6 h-6 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all cursor-pointer ${
                      mission.completed
                        ? "bg-adventure-teal border-adventure-teal"
                        : "border-amber-300 bg-white"
                    }`}
                  >
                    {mission.completed && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{mission.emoji}</span>
                      <h3
                        className={`font-display text-adventure-blue ${
                          mission.completed ? "line-through" : ""
                        }`}
                      >
                        {mission.title}
                      </h3>
                    </div>
                    <p className="font-body text-sm text-adventure-blue/60 mt-1">
                      {mission.description}
                    </p>
                  </div>
                  <button
                    onClick={() => removeMission(mission.id)}
                    className="text-red-400 hover:text-red-500 shrink-0 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <button
            onClick={() => setShowModal(true)}
            className="btn-adventure w-full"
          >
            <Plus className="w-5 h-5" />
            添加新契约
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-xl text-adventure-blue mb-4">
                添加新契约
              </h3>

              <div className="mb-4">
                <label className="font-body text-sm text-adventure-blue/70 mb-1 block">
                  选择图标
                </label>
                <div className="flex flex-wrap gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewEmoji(emoji)}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center cursor-pointer transition-all ${
                        newEmoji === emoji
                          ? "bg-adventure-orange/20 border-2 border-adventure-orange scale-110"
                          : "bg-amber-50 border-2 border-transparent"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="font-body text-sm text-adventure-blue/70 mb-1 block">
                  契约标题
                </label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例如：一起做手工"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-200 font-body text-adventure-blue focus:border-adventure-orange focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="font-body text-sm text-adventure-blue/70 mb-1 block">
                  契约描述
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="描述一下这个契约的内容..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-200 font-body text-adventure-blue focus:border-adventure-orange focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-ghost flex-1"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-adventure flex-1"
                >
                  确认添加
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
