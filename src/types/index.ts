export type CharacterType = "knight" | "warrior" | "guardian" | "ranger"

export interface UserProfile {
  id: string
  characterType: CharacterType
  nickname: string
  level: number
  title: string
  createdAt: string
  completedScenarios: string[]
  unlockedSkills: string[]
  completedMissions: string[]
  earnedBadges: string[]
}

export interface Scenario {
  id: string
  title: string
  description: string
  ageRange: string
  theme: string
  difficulty: "easy" | "medium" | "hard"
  emoji: string
  scenes: Scene[]
}

export interface Scene {
  id: string
  narration: string
  backgroundEmotion: string
  options: Option[]
}

export interface Option {
  id: string
  text: string
  consequence: string
  feedback: string
  nextSceneId: string | null
  isRecommended: boolean
}

export interface Skill {
  id: string
  name: string
  description: string
  emoji: string
  category: string
  prerequisites: string[]
  steps: SkillStep[]
}

export interface SkillStep {
  title: string
  content: string
  tip: string
}

export interface Mission {
  id: string
  title: string
  description: string
  completed: boolean
  weekStart: string
  emoji: string
}

export interface TreeHolePost {
  id: string
  authorCharacter: CharacterType
  authorNickname: string
  content: string
  tags: string[]
  replies: Reply[]
  createdAt: string
  likes: number
}

export interface Reply {
  id: string
  authorCharacter: CharacterType
  authorNickname: string
  content: string
  createdAt: string
}

export interface ScenarioResult {
  scenarioId: string
  choices: { sceneId: string; optionId: string }[]
  completedAt: string
}
