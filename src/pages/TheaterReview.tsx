import { useParams, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, Theater } from "lucide-react"
import { scenarios } from "@/data/scenarios"

const tipsMap: Record<string, string> = {
  生理成长:
    "面对孩子的身体变化，保持平静和正面是最重要的。提前学习相关知识，准备好必要的物资，用平常心去面对。记住，你的态度决定了孩子的感受。",
  安全守护:
    "保护孩子安全的同时，也要教会她自我保护。倾听比追问更重要，行动比愤怒更有效。让孩子知道，无论发生什么，你永远是她最坚实的后盾。",
  情感成长:
    "青春期情绪波动是正常的生理和心理变化，不是孩子'不听话'。给她空间，也给她安全感。有时候最好的陪伴就是安静地坐在她身边。",
  情感引导:
    "尊重孩子的隐私和感受，是建立信任的基石。不要急于评判，先试着理解。用开放式的问题引导她思考，而不是直接告诉她答案。",
  学习成长:
    "每个孩子的学习节奏不同，重要的是找到适合她的方法。成绩不是衡量价值的唯一标准，帮助她建立正确的心态和习惯，比短期分数更重要。",
}

export default function TheaterReview() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const choices = (location.state as { choices: { sceneId: string; optionId: string }[] })
    ?.choices ?? []

  const scenario = scenarios.find((s) => s.id === scenarioId)

  if (!scenario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-adventure-cream">
        <p className="font-body text-adventure-blue/60">情景不存在</p>
      </div>
    )
  }

  const totalScenes = scenario.scenes.length
  const recommendedOptions: string[] = []

  choices.forEach((choice) => {
    const scene = scenario.scenes.find((s) => s.id === choice.sceneId)
    if (!scene) return
    const option = scene.options.find((o) => o.id === choice.optionId)
    if (option?.isRecommended) {
      recommendedOptions.push(option.feedback)
    }
  })

  const recommendedCount = recommendedOptions.length
  const totalChoices = choices.length
  const ratio = totalChoices > 0 ? recommendedCount / totalChoices : 0
  const starCount = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1
  const tips = tipsMap[scenario.theme] ?? ""

  return (
    <div className="min-h-screen bg-adventure-cream px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="section-title mb-1 text-2xl">{scenario.title}</h1>
          <p className="font-body text-adventure-blue/60">情景回顾</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-adventure mb-6"
        >
          <h2 className="mb-4 font-display text-lg text-adventure-blue">
            📊 完成总结
          </h2>
          <div className="mb-3 flex items-center justify-between font-body text-sm">
            <span className="text-adventure-blue/60">总场景数</span>
            <span className="text-adventure-blue">{totalScenes}</span>
          </div>
          <div className="mb-3 flex items-center justify-between font-body text-sm">
            <span className="text-adventure-blue/60">推荐选择</span>
            <span className="text-adventure-blue">
              {recommendedCount} / {totalChoices}
            </span>
          </div>
          <div className="flex items-center justify-between font-body text-sm">
            <span className="text-adventure-blue/60">综合评价</span>
            <span className="text-adventure-gold">
              {"⭐".repeat(starCount)}
            </span>
          </div>
        </motion.div>

        {recommendedOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-adventure mb-6"
          >
            <h2 className="mb-4 font-display text-lg text-adventure-blue">
              💡 关键收获
            </h2>
            <ul className="space-y-3">
              {recommendedOptions.map((feedback, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-adventure-teal/30 bg-adventure-teal/5 p-3 font-body text-sm text-adventure-blue"
                >
                  {feedback}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {tips && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-adventure mb-6"
          >
            <h2 className="mb-4 font-display text-lg text-adventure-blue">
              💬 爸爸小贴士
            </h2>
            <p className="font-body text-sm leading-relaxed text-adventure-blue/70">
              {tips}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={() => navigate("/theater")}
            className="btn-ghost flex items-center gap-2"
          >
            <Theater size={16} /> 返回剧场
          </button>
          <button
            onClick={() => navigate("/home")}
            className="btn-adventure flex items-center gap-2"
          >
            <Home size={16} /> 回到主页
          </button>
        </motion.div>
      </div>
    </div>
  )
}
