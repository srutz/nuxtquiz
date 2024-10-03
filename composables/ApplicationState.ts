import { defineStore } from "pinia";

export type QuizState = "STOPPED" | "STARTED" | "FINISHED";

export const useApplicationState = defineStore('application', () => {
    const quizState = ref<QuizState>("STOPPED")
    const correctAnswers = ref(0)

    function setQuizState(newState: QuizState) {
        quizState.value = newState
        if (newState === "STARTED") {
            correctAnswers.value = 0
        }
    }
    function addCorrectAnswer() {
        correctAnswers.value++
    }
    return { quizState, setQuizState, correctAnswers, addCorrectAnswer }
})
