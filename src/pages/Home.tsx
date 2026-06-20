import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useGameStore } from "@/store/useGameStore"
import { scenarios } from "@/data/scenarios"
import { skills } from "@/data/skills"
import CharacterAvatar from "@/components/CharacterAvatar"
import DifficultyBadge from "@/components/DifficultyBadge"
import ProgressBar from "@/components/ProgressBar"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Home() {
  const navigate = useNavigate()
  const userProfile = useGameStore((s) => s.userProfile)
  const missions = useGameStore((s) => s.missions)

  useEffect(() => {
    if (!userProfile) {
      navigate("/")
    }
  }, [userProfile, navigate])

  const scenarioProgress = useMemo(
    () =>
      userProfile
        ? Math.round(
            (userProfile.completedScenarios.length / scenarios.length) * 100
          )
        : 0,
    [userProfile]
  )

  const skillProgress = useMemo(
    () =>
      userProfile
        ? Math.round(
            (userProfile.unlockedSkills.length / skills.length) * 100
          )
        : 0,
    [userProfile]
  )

  const missionProgress = useMemo(
    () =>
      Math.round(
        (missions.filter((m) => m.completed).length /
          Math.max(missions.length, 1)) *
          100
      ),
    [missions]
  )

  const dailyScenario = useMemo(() => {
    if (!userProfile) return null
    const incomplete = scenarios.filter(
      (s) => !userProfile.completedScenarios.includes(s.id)
    )
    if (incomplete.length === 0) return null
    return incomplete[Math.floor(Math.random() * incomplete.length)]
  }, [userProfile])

  const dailySkill = useMemo(() => {
    if (!userProfile) return null
    const eligible = skills.filter(
      (s) =>
        !userProfile.unlockedSkills.includes(s.id) &&
        s.prerequisites.every((p) => userProfile.unlockedSkills.includes(p))
    )
    if (eligible.length === 0) return null
    return eligible[Math.floor(Math.random() * eligible.length)]
  }, [userProfile])

  if (!userProfile) return null

  return (
    <div className="min-h-screen bg-adventure-cream pb-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={staggerItem}>
          <div className="bg-gradient-to-b from-adventure-blue to-adventure-blue-light rounded-b-3xl p-8">
            <div className="max-w-lg mx-auto flex items-center gap-4">
              <CharacterAvatar characterType={userProfile.characterType} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-display text-2xl truncate">
                    {userProfile.nickname}
                  </span>
                  <span className="bg-adventure-gold text-adventure-blue px-3 py-1 rounded-full font-display text-sm shrink-0">
                    Lv.{userProfile.level}
                  </span>
                </div>
                <p className="text-white/80 font-body text-sm">
                  {userProfile.title}
                </p>
              </div>
            </div>
            <p className="text-center text-white/70 font-body text-sm mt-6">
              ✨ 每一天的陪伴，都是最珍贵的冒险 ✨
            </p>
          </div>
        </motion.section>

        <motion.section variants={staggerItem} className="max-w-lg mx-auto px-4 mt-6">
          <h2 className="section-title mb-4">冒险进度</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="card-adventure !p-4 flex flex-col items-center">
              <span className="font-body text-xs text-adventure-blue/60 mb-2">
                情景完成
              </span>
              <ProgressBar value={scenarioProgress} label="情景" />
              <span className="font-display text-sm text-adventure-orange mt-1">
                {scenarioProgress}%
              </span>
            </div>
            <div className="card-adventure !p-4 flex flex-col items-center">
              <span className="font-body text-xs text-adventure-blue/60 mb-2">
                技能解锁
              </span>
              <ProgressBar value={skillProgress} label="技能" />
              <span className="font-display text-sm text-adventure-orange mt-1">
                {skillProgress}%
              </span>
            </div>
            <div className="card-adventure !p-4 flex flex-col items-center">
              <span className="font-body text-xs text-adventure-blue/60 mb-2">
                任务完成
              </span>
              <ProgressBar value={missionProgress} label="任务" />
              <span className="font-display text-sm text-adventure-orange mt-1">
                {missionProgress}%
              </span>
            </div>
          </div>
        </motion.section>

        <motion.section variants={staggerItem} className="max-w-lg mx-auto px-4 mt-6">
          <h2 className="section-title mb-4">今日推荐</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="card-adventure flex items-start gap-4">
              <span className="text-3xl shrink-0">
                {dailyScenario?.emoji ?? "🎉"}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg text-adventure-blue mb-1">
                  今日情景挑战
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  {dailyScenario ? (
                    <>
                      <span className="font-body text-sm text-adventure-blue/70 truncate">
                        {dailyScenario.title}
                      </span>
                      <DifficultyBadge difficulty={dailyScenario.difficulty} />
                    </>
                  ) : (
                    <span className="font-body text-sm text-adventure-teal">
                      全部完成！🎉
                    </span>
                  )}
                </div>
                <p className="font-body text-xs text-adventure-blue/50 line-clamp-2">
                  {dailyScenario?.description ?? "你已经完成了所有情景挑战，太厉害了！"}
                </p>
              </div>
              <button
                onClick={() =>
                  dailyScenario
                    ? navigate(`/theater/${dailyScenario.id}`)
                    : undefined
                }
                className="btn-adventure-sm shrink-0"
              >
                {dailyScenario ? "去完成" : "已完成"}
              </button>
            </div>

            <div className="card-adventure flex items-start gap-4">
              <span className="text-3xl shrink-0">
                {dailySkill?.emoji ?? "🎓"}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg text-adventure-blue mb-1">
                  推荐技能学习
                </h3>
                <span className="font-body text-sm text-adventure-blue/70">
                  {dailySkill
                    ? `${dailySkill.name} - ${dailySkill.category}`
                    : "暂无推荐技能"}
                </span>
                <p className="font-body text-xs text-adventure-blue/50 line-clamp-2">
                  {dailySkill?.description ?? "继续完成情景挑战来解锁更多技能吧！"}
                </p>
              </div>
              <button
                onClick={() =>
                  dailySkill
                    ? navigate(`/skills/${dailySkill.id}`)
                    : undefined
                }
                className="btn-adventure-sm shrink-0"
              >
                {dailySkill ? "去学习" : "看看"}
              </button>
            </div>

            <div className="card-adventure flex items-start gap-4">
              <MessageCircle className="w-8 h-8 text-adventure-pink shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg text-adventure-blue mb-1">
                  社区热帖
                </h3>
                <p className="font-body text-sm text-adventure-blue/70">
                  和其他冒险者爸爸交流心得
                </p>
                <p className="font-body text-xs text-adventure-blue/50">
                  分享你的故事，获得温暖与支持
                </p>
              </div>
              <button
                onClick={() => navigate("/tree-hole")}
                className="btn-adventure-sm shrink-0"
              >
                去看看
              </button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
