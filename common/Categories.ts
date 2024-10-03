import type { Category } from "./Types";
import GermanQuestions from "~/assets/data/quiz.json"

export const GermanCategories = [
    { key: "history", displayName: "Geschichte" },
    { key: "geography", displayName: "Länder und Städte" },
    { key: "art", displayName: "Musik und Kunst" },
    { key: "celebreties", displayName: "Prominente und Stars" },
    { key: "sports", displayName: "Sport" },
    { key: "science", displayName: "Wissenschaft" },
] as const

type GermanCategoryKey = typeof GermanCategories[number]["displayName"];


type GermanQuestion = {
    "frage": string
    "kategorie": GermanCategoryKey
    "antworten": string[]
    "richtigeAntwort": number
}
type GermanQuestionsFile = {
    "quizfragen": GermanQuestion[]
}



export function makeGermanQuestions() {
    const source = GermanQuestions as GermanQuestionsFile
    return source.quizfragen.map((q, i) => ({
        id: i + 1,
        text: q.frage,
        categoryKey: GermanCategories.find(gc => q.kategorie == gc.displayName)!.key,
        options: q.antworten,
        correctIndex: q.richtigeAntwort
    }))
}
