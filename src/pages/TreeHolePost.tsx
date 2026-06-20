import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Heart } from "lucide-react"
import { useGameStore } from "@/store/useGameStore"
import CharacterAvatar from "@/components/CharacterAvatar"
import type { Reply } from "@/types"

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

export default function TreeHolePost() {
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const userProfile = useGameStore((s) => s.userProfile)
  const allPosts = useGameStore((s) => s.posts)
  const addReplyToPost = useGameStore((s) => s.addReplyToPost)
  const togglePostLike = useGameStore((s) => s.togglePostLike)

  const post = useMemo(
    () => allPosts.find((p) => p.id === postId),
    [allPosts, postId]
  )

  const [liked, setLiked] = useState(false)
  const [replyContent, setReplyContent] = useState("")

  if (!post) {
    return (
      <div className="min-h-screen bg-adventure-cream flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">🕳️</span>
          <h2 className="font-display text-xl text-adventure-blue mb-2">
            帖子不存在
          </h2>
          <button
            onClick={() => navigate("/tree-hole")}
            className="btn-adventure"
          >
            返回树洞
          </button>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    if (!liked) {
      togglePostLike(post.id)
      setLiked(true)
    }
  }

  const handleReply = () => {
    if (!replyContent.trim() || !userProfile) return
    const reply: Reply = {
      id: `reply-${Date.now()}`,
      authorCharacter: userProfile.characterType,
      authorNickname: userProfile.nickname,
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
    }
    addReplyToPost(post.id, reply)
    setReplyContent("")
  }

  const allReplies = post.replies

  return (
    <div className="min-h-screen bg-adventure-cream pb-8">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <button
            onClick={() => navigate("/tree-hole")}
            className="w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center cursor-pointer hover:shadow-card-hover transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-adventure-blue" />
          </button>
          <h1 className="font-display text-lg text-adventure-blue">
            返回树洞
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card-adventure mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <CharacterAvatar
              characterType={post.authorCharacter}
              size="md"
            />
            <div>
              <span className="font-display text-lg text-adventure-blue block">
                {post.authorNickname}
              </span>
              <span className="font-body text-xs text-adventure-blue/40">
                {getTimeAgo(post.createdAt)}
              </span>
            </div>
          </div>

          <p className="font-body text-adventure-blue/80 leading-relaxed mb-4">
            {post.content}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-adventure-cream px-2 py-0.5 rounded-full text-xs font-body text-adventure-blue/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm cursor-pointer transition-all ${
              liked
                ? "bg-red-50 text-red-400"
                : "bg-adventure-cream text-adventure-blue/50 hover:bg-red-50 hover:text-red-400"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-400" : ""}`} />
            {post.likes}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="section-title text-xl mb-4">
            💬 回复 ({allReplies.length})
          </h2>

          <div className="space-y-3 mb-6">
            {allReplies.map((reply, index) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex gap-3 bg-white rounded-2xl p-4 shadow-card"
              >
                <CharacterAvatar
                  characterType={reply.authorCharacter}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display text-sm text-adventure-blue">
                      {reply.authorNickname}
                    </span>
                    <span className="font-body text-xs text-adventure-blue/40">
                      {getTimeAgo(reply.createdAt)}
                    </span>
                  </div>
                  <p className="font-body text-sm text-adventure-blue/70">
                    {reply.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {userProfile && (
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="写下你的回复..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-200 font-body text-adventure-blue focus:border-adventure-orange focus:outline-none resize-none mb-3 transition-colors"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleReply}
                  disabled={!replyContent.trim()}
                  className="btn-adventure-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  回复
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
