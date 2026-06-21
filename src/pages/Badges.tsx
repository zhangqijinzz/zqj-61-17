import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Filter, ArrowUpDown } from "lucide-react"
import { useGameStore } from "@/store/useGameStore"
import { badges, rarityConfig } from "@/data/badges"
import type { BadgeRarity } from "@/types"

type FilterOption = "all" | BadgeRarity
type SortOption = "earnedAt" | "rarity"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
}

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "common", label: "普通" },
  { value: "rare", label: "稀有" },
  { value: "legendary", label: "传说" },
]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "earnedAt", label: "获得时间" },
  { value: "rarity", label: "稀有度" },
]

export default function Badges() {
  const navigate = useNavigate()
  const userProfile = useGameStore((s) => s.userProfile)
  const earnedBadgeIds = userProfile?.earnedBadges ?? []
  const earnedBadgeRecords = userProfile?.earnedBadgeRecords ?? []

  const [filter, setFilter] = useState<FilterOption>("all")
  const [sort, setSort] = useState<SortOption>("earnedAt")
  const [sortAscending, setSortAscending] = useState(false)

  const badgeRecordsMap = useMemo(() => {
    const map = new Map<string, string>()
    earnedBadgeRecords.forEach((record) => {
      map.set(record.badgeId, record.earnedAt)
    })
    return map
  }, [earnedBadgeRecords])

  const allBadgesWithData = useMemo(() => {
    return badges.map((badge) => ({
      ...badge,
      earned: earnedBadgeIds.includes(badge.id),
      earnedAt: badgeRecordsMap.get(badge.id) || null,
    }))
  }, [earnedBadgeIds, badgeRecordsMap])

  const filteredAndSortedBadges = useMemo(() => {
    let result = [...allBadgesWithData]

    if (filter !== "all") {
      result = result.filter((b) => b.rarity === filter)
    }

    result.sort((a, b) => {
      if (sort === "rarity") {
        const orderA = rarityConfig[a.rarity].order
        const orderB = rarityConfig[b.rarity].order
        return sortAscending ? orderA - orderB : orderB - orderA
      } else {
        const dateA = a.earnedAt ? new Date(a.earnedAt).getTime() : 0
        const dateB = b.earnedAt ? new Date(b.earnedAt).getTime() : 0
        return sortAscending ? dateA - dateB : dateB - dateA
      }
    })

    return result
  }, [allBadgesWithData, filter, sort, sortAscending])

  const stats = useMemo(() => {
    const total = badges.length
    const earned = earnedBadgeIds.length

    const byRarity = {
      common: { total: 0, earned: 0 },
      rare: { total: 0, earned: 0 },
      legendary: { total: 0, earned: 0 },
    }

    badges.forEach((badge) => {
      byRarity[badge.rarity].total++
      if (earnedBadgeIds.includes(badge.id)) {
        byRarity[badge.rarity].earned++
      }
    })

    return { total, earned, byRarity }
  }, [earnedBadgeIds])

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending)
  }

  const getBadgeBgClass = (badge: typeof filteredAndSortedBadges[0]) => {
    if (!badge.earned) {
      return "bg-gray-200"
    }
    return rarityConfig[badge.rarity].bgClass
  }

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
            <h1 className="font-display text-3xl text-white mb-2">🏅 成就徽章墙</h1>
            <p className="font-body text-white/70 text-sm mb-4">
              每一枚徽章，都是成长的见证
            </p>
            <div className="inline-block bg-white/10 rounded-full px-4 py-1">
              <span className="font-body text-white text-sm">
                已获得 {stats.earned} / {stats.total} 枚徽章
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            {(Object.keys(stats.byRarity) as BadgeRarity[]).map((rarity) => {
              const stat = stats.byRarity[rarity]
              const config = rarityConfig[rarity]
              return (
                <div key={rarity} className="text-center">
                  <div
                    className={`w-12 h-12 mx-auto rounded-full ${config.bgClass} flex items-center justify-center mb-1`}
                  >
                    <span className="text-white font-bold text-sm">
                      {stat.earned}/{stat.total}
                    </span>
                  </div>
                  <span className={`text-xs ${config.className}`}>
                    {config.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-adventure-blue" />
            <div className="flex gap-1">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === option.value
                      ? "bg-adventure-blue text-white"
                      : "bg-white text-adventure-blue/70 hover:bg-adventure-blue/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-adventure-blue" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-2 py-1 rounded-lg text-xs bg-white text-adventure-blue border-none focus:ring-2 focus:ring-adventure-blue/30"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-1 rounded-lg bg-white text-adventure-blue hover:bg-adventure-blue/10 transition-colors"
              title={sortAscending ? "升序" : "降序"}
            >
              <span className="text-sm font-bold">
                {sortAscending ? "↑" : "↓"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="max-w-lg mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={`${filter}-${sort}-${sortAscending}`}
      >
        <div className="grid grid-cols-3 gap-4">
          {filteredAndSortedBadges.map((badge) => (
            <motion.div
              key={badge.id}
              variants={staggerItem}
              className="flex flex-col items-center"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 relative ${
                  getBadgeBgClass(badge)
                } ${
                  badge.earned
                    ? "shadow-lg"
                    : "opacity-50 grayscale"
                }`}
              >
                {badge.earned ? (
                  <span className="text-3xl">{badge.emoji}</span>
                ) : (
                  <span className="text-2xl">🔒</span>
                )}
                {badge.earned && (
                  <div
                    className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white ${
                      rarityConfig[badge.rarity].bgClass
                    }`}
                  >
                    {rarityConfig[badge.rarity].label}
                  </div>
                )}
              </div>
              <span
                className={`font-body text-xs text-center leading-tight ${
                  badge.earned ? "text-adventure-blue" : "text-gray-400"
                }`}
              >
                {badge.name}
              </span>
              {badge.earned && badge.earnedAt && (
                <span className="font-body text-[10px] text-gray-400 mt-1">
                  {new Date(badge.earnedAt).toLocaleDateString("zh-CN")}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {filteredAndSortedBadges.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-gray-400 font-body">暂无该分类的徽章</p>
          </div>
        )}
      </motion.div>

      <div className="max-w-lg mx-auto px-4 mt-8">
        <button
          onClick={() => navigate("/skills")}
          className="btn-ghost w-full"
        >
          🌳 返回技能树
        </button>
      </div>
    </div>
  )
}
