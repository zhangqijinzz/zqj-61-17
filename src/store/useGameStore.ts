import { create } from 'zustand'
import { UserProfile, CharacterType, ScenarioResult, Mission, TreeHolePost, Reply, EarnedBadgeRecord, BadgeRarity } from '@/types'
import { treeHolePosts } from '@/data/treeHolePosts'
import { badges, getBadgeById, shouldAwardCommonCollectorBadge, rarityConfig } from '@/data/badges'

const STORAGE_KEY = 'dad-adventure-state'

function getTitleByLevel(level: number): string {
  if (level <= 2) return '初出茅庐的爸爸'
  if (level <= 4) return '渐入佳境的爸爸'
  if (level <= 6) return '得心应手的爸爸'
  return '传说中的超级爸爸'
}

function saveToLocalStorage(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

function loadFromLocalStorage(): GameState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch {
    // ignore
  }
  return null
}

interface GameState {
  userProfile: UserProfile | null
  scenarioResults: ScenarioResult[]
  missions: Mission[]
  posts: TreeHolePost[]
  pendingLegendaryBadge: string | null
}

interface GameActions {
  createProfile: (characterType: CharacterType, nickname: string) => void
  completeScenario: (scenarioId: string, choices: { sceneId: string; optionId: string }[]) => void
  unlockSkill: (skillId: string) => void
  toggleMission: (missionId: string) => void
  addMission: (mission: Mission) => void
  removeMission: (missionId: string) => void
  addPost: (post: TreeHolePost) => void
  addReplyToPost: (postId: string, reply: Reply) => void
  togglePostLike: (postId: string) => void
  resetGame: () => void
  markLegendaryCelebrationShown: () => void
  clearPendingLegendaryBadge: () => void
  migrateBadgeData: () => void
}

type StoreType = GameState & GameActions

function migrateUserProfile(profile: any): UserProfile {
  if (!profile) return profile

  const migrated: UserProfile = {
    ...profile,
    earnedBadgeRecords: profile.earnedBadgeRecords ?? [],
    legendaryCelebrationShown: profile.legendaryCelebrationShown ?? false,
  }

  if (migrated.earnedBadges && migrated.earnedBadgeRecords.length === 0) {
    const baseTime = new Date(profile.createdAt || Date.now()).getTime()
    migrated.earnedBadgeRecords = migrated.earnedBadges.map((badgeId: string, index: number) => ({
      badgeId,
      earnedAt: new Date(baseTime + index * 1000).toISOString(),
    }))
  }

  return migrated
}

const savedState = loadFromLocalStorage()

const migratedState = savedState
  ? {
      ...savedState,
      userProfile: savedState.userProfile ? migrateUserProfile(savedState.userProfile) : null,
    }
  : null

export const useGameStore = create<StoreType>()((set, get) => ({
  userProfile: migratedState?.userProfile ?? null,
  scenarioResults: migratedState?.scenarioResults ?? [],
  missions: migratedState?.missions ?? [],
  posts: migratedState?.posts ?? treeHolePosts,
  pendingLegendaryBadge: null,

  createProfile: (characterType, nickname) => {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      characterType,
      nickname,
      level: 1,
      title: '初出茅庐的爸爸',
      createdAt: new Date().toISOString(),
      completedScenarios: [],
      unlockedSkills: [],
      completedMissions: [],
      earnedBadges: [],
      earnedBadgeRecords: [],
      legendaryCelebrationShown: false,
    }
    set({ userProfile: profile })
    saveToLocalStorage(get())
  },

  completeScenario: (scenarioId, choices) => {
    const state = get()
    if (!state.userProfile) return

    const result: ScenarioResult = {
      scenarioId,
      choices,
      completedAt: new Date().toISOString(),
    }

    const newLevel = state.userProfile.level + 1
    const newTitle = getTitleByLevel(newLevel)

    set({
      scenarioResults: [...state.scenarioResults, result],
      userProfile: {
        ...state.userProfile,
        level: newLevel,
        title: newTitle,
        completedScenarios: [...state.userProfile.completedScenarios, scenarioId],
      },
    })
    saveToLocalStorage(get())
  },

  unlockSkill: (skillId) => {
    const state = get()
    if (!state.userProfile) return

    const badgeId = `${skillId}-badge`
    const badge = getBadgeById(badgeId)
    const now = new Date().toISOString()

    const newEarnedBadges = [...state.userProfile.earnedBadges, badgeId]
    const newEarnedBadgeRecords: EarnedBadgeRecord[] = [
      ...state.userProfile.earnedBadgeRecords,
      { badgeId, earnedAt: now },
    ]

    let pendingLegendaryBadge: string | null = null
    const legendaryCelebrationShown = state.userProfile.legendaryCelebrationShown

    if (badge?.rarity === "legendary" && !legendaryCelebrationShown) {
      pendingLegendaryBadge = badgeId
    }

    if (shouldAwardCommonCollectorBadge(newEarnedBadges) && !newEarnedBadges.includes("collector-common-all")) {
      newEarnedBadges.push("collector-common-all")
      newEarnedBadgeRecords.push({
        badgeId: "collector-common-all",
        earnedAt: now,
      })

      const collectorBadge = getBadgeById("collector-common-all")
      if (collectorBadge?.rarity === "legendary" && !legendaryCelebrationShown && !pendingLegendaryBadge) {
        pendingLegendaryBadge = "collector-common-all"
      }
    }

    const newLevel = state.userProfile.level + 1
    const newTitle = getTitleByLevel(newLevel)

    set({
      userProfile: {
        ...state.userProfile,
        level: newLevel,
        title: newTitle,
        unlockedSkills: [...state.userProfile.unlockedSkills, skillId],
        earnedBadges: newEarnedBadges,
        earnedBadgeRecords: newEarnedBadgeRecords,
      },
      pendingLegendaryBadge,
    })
    saveToLocalStorage(get())
  },

  toggleMission: (missionId) => {
    const state = get()
    const mission = state.missions.find((m) => m.id === missionId)
    if (!mission) return

    const willBeCompleted = !mission.completed
    let newCompletedMissions = [...(state.userProfile?.completedMissions ?? [])]

    if (willBeCompleted) {
      if (!newCompletedMissions.includes(missionId)) {
        newCompletedMissions.push(missionId)
      }
    } else {
      newCompletedMissions = newCompletedMissions.filter((id) => id !== missionId)
    }

    let newProfile = state.userProfile
    if (state.userProfile) {
      newProfile = {
        ...state.userProfile,
        completedMissions: newCompletedMissions,
      }
    }

    set({
      missions: state.missions.map((m) =>
        m.id === missionId ? { ...m, completed: !m.completed } : m
      ),
      userProfile: newProfile,
    })
    saveToLocalStorage(get())
  },

  addMission: (mission) => {
    const state = get()
    set({ missions: [...state.missions, mission] })
    saveToLocalStorage(get())
  },

  removeMission: (missionId) => {
    const state = get()

    let newProfile = state.userProfile
    if (state.userProfile) {
      newProfile = {
        ...state.userProfile,
        completedMissions: state.userProfile.completedMissions.filter(
          (id) => id !== missionId
        ),
      }
    }

    set({
      missions: state.missions.filter((m) => m.id !== missionId),
      userProfile: newProfile,
    })
    saveToLocalStorage(get())
  },

  addPost: (post) => {
    const state = get()
    set({ posts: [post, ...state.posts] })
    saveToLocalStorage(get())
  },

  addReplyToPost: (postId, reply) => {
    const state = get()
    set({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
      ),
    })
    saveToLocalStorage(get())
  },

  togglePostLike: (postId) => {
    const state = get()
    set({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      ),
    })
    saveToLocalStorage(get())
  },

  resetGame: () => {
    set({
      userProfile: null,
      scenarioResults: [],
      missions: [],
      posts: treeHolePosts,
      pendingLegendaryBadge: null,
    })
    localStorage.removeItem(STORAGE_KEY)
  },

  markLegendaryCelebrationShown: () => {
    const state = get()
    if (!state.userProfile) return

    set({
      userProfile: {
        ...state.userProfile,
        legendaryCelebrationShown: true,
      },
    })
    saveToLocalStorage(get())
  },

  clearPendingLegendaryBadge: () => {
    set({ pendingLegendaryBadge: null })
  },

  migrateBadgeData: () => {
    const state = get()
    if (!state.userProfile) return

    const migratedProfile = migrateUserProfile(state.userProfile)

    if (shouldAwardCommonCollectorBadge(migratedProfile.earnedBadges) && !migratedProfile.earnedBadges.includes("collector-common-all")) {
      const now = new Date().toISOString()
      migratedProfile.earnedBadges.push("collector-common-all")
      migratedProfile.earnedBadgeRecords.push({
        badgeId: "collector-common-all",
        earnedAt: now,
      })
    }

    set({ userProfile: migratedProfile })
    saveToLocalStorage(get())
  },
}))
