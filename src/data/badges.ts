import type { Badge, BadgeRarity } from "../types"
import { skills } from "./skills"

export const rarityConfig: Record<BadgeRarity, { label: string; className: string; bgClass: string; order: number }> = {
  common: {
    label: "普通",
    className: "text-adventure-teal",
    bgClass: "bg-gradient-to-br from-adventure-teal to-adventure-teal-light",
    order: 1,
  },
  rare: {
    label: "稀有",
    className: "text-adventure-purple",
    bgClass: "bg-gradient-to-br from-adventure-purple to-adventure-purple-light",
    order: 2,
  },
  legendary: {
    label: "传说",
    className: "text-adventure-orange",
    bgClass: "bg-gradient-to-br from-adventure-gold to-adventure-orange",
    order: 3,
  },
}

function calculateSkillRarity(skill: typeof skills[0]): BadgeRarity {
  const prereqCount = skill.prerequisites.length
  
  let prereqDepth = 0
  const visited = new Set<string>()
  
  function getDepth(skillId: string, depth: number): number {
    if (visited.has(skillId)) return depth
    visited.add(skillId)
    
    const s = skills.find((sk) => sk.id === skillId)
    if (!s || s.prerequisites.length === 0) return depth
    
    return Math.max(...s.prerequisites.map((p) => getDepth(p, depth + 1)))
  }
  
  if (prereqCount > 0) {
    prereqDepth = Math.max(...skill.prerequisites.map((p) => getDepth(p, 1)))
  }
  
  const totalComplexity = prereqCount + prereqDepth + (skill.steps.length >= 4 ? 1 : 0)
  
  if (totalComplexity >= 3) return "legendary"
  if (totalComplexity >= 1) return "rare"
  return "common"
}

const skillBadges: Badge[] = skills.map((skill) => ({
  id: `${skill.id}-badge`,
  skillId: skill.id,
  name: skill.name,
  emoji: skill.emoji,
  description: `已掌握「${skill.name}」技能`,
  rarity: calculateSkillRarity(skill),
  category: skill.category,
}))

const collectorBadges: Badge[] = [
  {
    id: "collector-common-all",
    skillId: null,
    name: "集齐普通",
    emoji: "🎖️",
    description: "获得全部普通级徽章，展现扎实的基础功底！",
    rarity: "rare",
    category: "收藏家",
  },
]

export const badges: Badge[] = [...skillBadges, ...collectorBadges]

export function getBadgeById(id: string): Badge | undefined {
  return badges.find((b) => b.id === id)
}

export function getBadgesByRarity(rarity: BadgeRarity): Badge[] {
  return badges.filter((b) => b.rarity === rarity)
}

export function getCommonBadges(): Badge[] {
  return badges.filter((b) => b.rarity === "common")
}

export function isCollectorBadge(badgeId: string): boolean {
  return collectorBadges.some((b) => b.id === badgeId)
}

export function shouldAwardCommonCollectorBadge(earnedBadgeIds: string[]): boolean {
  const commonBadges = getCommonBadges().filter((b) => !isCollectorBadge(b.id))
  const commonBadgeIds = commonBadges.map((b) => b.id)
  return commonBadgeIds.every((id) => earnedBadgeIds.includes(id))
}
