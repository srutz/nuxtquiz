import { defineStore } from "pinia";

export type QuizState = "STOPPED" | "RUNNING" | "FINISHED";

export const useApplicationState = defineStore('application', () => {
    const quizState = ref<QuizState>("STOPPED");

    function setQuizState(newState: QuizState) {
        quizState.value = newState;
    }
    return { quizState, setQuizState }
})
