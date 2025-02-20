import localforage from 'localforage'

// Create separate storage instances for different data types
const userStorage = localforage.createInstance({
  name: 'offnet-user'
})

const contentStorage = localforage.createInstance({
  name: 'offnet-content'
})

const progressStorage = localforage.createInstance({
  name: 'offnet-progress'
})

export interface UserData {
  id: string
  name: string
  preferences: {
    darkMode: boolean
    fontSize: 'small' | 'medium' | 'large'
  }
}

export interface LearningProgress {
  userId: string
  moduleId: string
  completedLessons: string[]
  quizScores: Record<string, number>
  lastAccessed: number
}

export interface ContentModule {
  id: string
  title: string
  description: string
  lessons: {
    id: string
    title: string
    content: string
  }[]
}

class StorageService {
  // User data methods
  async saveUser(userData: UserData): Promise<void> {
    await userStorage.setItem(userData.id, userData)
  }

  async getUser(userId: string): Promise<UserData | null> {
    return await userStorage.getItem(userId)
  }

  // Learning progress methods
  async saveProgress(progress: LearningProgress): Promise<void> {
    const key = `${progress.userId}-${progress.moduleId}`
    await progressStorage.setItem(key, progress)
  }

  async getProgress(userId: string, moduleId: string): Promise<LearningProgress | null> {
    const key = `${userId}-${moduleId}`
    return await progressStorage.getItem(key)
  }

  async getAllProgress(userId: string): Promise<LearningProgress[]> {
    const progress: LearningProgress[] = []
    await progressStorage.iterate((value: LearningProgress) => {
      if (value.userId === userId) {
        progress.push(value)
      }
    })
    return progress
  }

  // Content methods
  async saveModule(module: ContentModule): Promise<void> {
    await contentStorage.setItem(module.id, module)
  }

  async getModule(moduleId: string): Promise<ContentModule | null> {
    return await contentStorage.getItem(moduleId)
  }

  async getAllModules(): Promise<ContentModule[]> {
    const modules: ContentModule[] = []
    await contentStorage.iterate((value: ContentModule) => {
      modules.push(value)
    })
    return modules
  }

  // Storage management
  async clearAllData(): Promise<void> {
    await Promise.all([
      userStorage.clear(),
      contentStorage.clear(),
      progressStorage.clear()
    ])
  }

  async getStorageInfo(): Promise<{
    userSize: number
    contentSize: number
    progressSize: number
  }> {
    // This is a simple implementation that counts the number of items
    const [userSize, contentSize, progressSize] = await Promise.all([
      userStorage.length(),
      contentStorage.length(),
      progressStorage.length()
    ])

    return {
      userSize,
      contentSize,
      progressSize
    }
  }
}

export const storageService = new StorageService() 