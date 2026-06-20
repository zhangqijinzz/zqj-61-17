import { useState, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Pencil } from "lucide-react"
import { useGameStore } from "@/store/useGameStore"
import CharacterAvatar from "@/components/CharacterAvatar"
import type { TreeHolePost } from "@/types"

const tagFilters = ["全部", "求帮助", "分享", "情绪", "青春期", "生活技能", "安全", "沟通"]

function getTimeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 1) return "刚刚"
  if (diffMins < 60) return `${diffMins}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (diffDays < 30) return `${diffDays}天前`
  return `${Math.floor(diffDays / 30)}个月前`
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function TreeHole() {
  const navigate = useNavigate()
  const userProfile = useGameStore((s) => s.userProfile)
  const posts = useGameStore((s) => s.posts)
  const addPost = useGameStore((s) => s.addPost)

  const [selectedTag, setSelectedTag] = useState("全部")
  const [showModal, setShowModal] = useState(false)
  const [newContent, setNewContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allPosts = useMemo(() => {
    if (selectedTag === "全部") return posts
    return posts.filter((p) => p.tags.includes(selectedTag))
  }, [posts, selectedTag])

  const toggleNewTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = () => {
    if (!newContent.trim() || !userProfile) return
    const post: TreeHolePost = {
      id: `post-${Date.now()}`,
      authorCharacter: userProfile.characterType,
      authorNickname: userProfile.nickname,
      content: newContent.trim(),
      tags: selectedTags.length > 0 ? selectedTags : ["分享"],
      replies: [],
      createdAt: new Date().toISOString(),
      likes: 0,
    }
    addPost(post)
    setNewContent("")
    setSelectedTags([])
    setShowModal(false)
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-adventure-cream flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">🏰</span>
          <h2 className="font-display text-xl text-adventure-blue mb-2">
            请先创建角色
          </h2>
          <p className="font-body text-adventure-blue/60 mb-4">
            冒险者才能进入树洞哦~
          </p>
          <Link to="/" className="btn-adventure">
            去创建角色
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-adventure-cream pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="section-title text-3xl">🕳️ 爸爸匿名树洞</h1>
          <p className="font-body text-adventure-blue/60 mt-1">
            用冒险者身份，说出心里话
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {tagFilters.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-full font-body text-sm cursor-pointer transition-all ${
                selectedTag === tag
                  ? "bg-adventure-orange text-white"
                  : "bg-white text-adventure-blue/60 hover:bg-adventure-orange/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {allPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={staggerItem}
              className="card-adventure cursor-pointer"
              onClick={() => navigate(`/tree-hole/${post.id}`)}
            >
              <div className="flex items-center gap-3 mb-3">
                <CharacterAvatar
                  characterType={post.authorCharacter}
                  size="sm"
                />
                <span className="font-display text-adventure-blue">
                  {post.authorNickname}
                </span>
                <span className="font-body text-xs text-adventure-blue/40 ml-auto">
                  {getTimeAgo(post.createdAt)}
                </span>
              </div>
              <p className="font-body text-adventure-blue/80 line-clamp-3 mb-3">
                {post.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-adventure-cream px-2 py-0.5 rounded-full text-xs font-body text-adventure-blue/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm font-body text-adventure-blue/50 shrink-0">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.replies.length}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-24 right-6 btn-adventure rounded-full w-14 h-14 !p-0 flex items-center justify-center shadow-lg z-40"
      >
        <Pencil className="w-6 h-6" />
      </motion.button>

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
                发表新帖
              </h3>

              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="说出你的心里话..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-200 font-body text-adventure-blue focus:border-adventure-orange focus:outline-none resize-none mb-4 transition-colors"
              />

              <div className="mb-6">
                <label className="font-body text-sm text-adventure-blue/70 mb-2 block">
                  选择标签
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagFilters.filter((t) => t !== "全部").map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleNewTag(tag)}
                      className={`px-3 py-1 rounded-full font-body text-sm cursor-pointer transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-adventure-orange text-white"
                          : "bg-adventure-cream text-adventure-blue/60"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-ghost flex-1"
                >
                  取消
                </button>
                <button onClick={handleSubmit} className="btn-adventure flex-1">
                  发表
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
