
export type CategoryKey = "history" | "geography" | "art" | "celebreties" | "sports" | "science"

export type Category = {
    key: CategoryKey
    displayName: string
}

export type Question = {
    id: number
    text: string
    categoryKey: CategoryKey
    options: string[]
    correctIndex: number
}

