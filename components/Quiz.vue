<template>
    <div class="grow h-1 flex flex-col gap-4 justify-center items-center py-4">
        <div class="self-center">Frage {{ currentIndex + 1 }} von {{ questions.length }}</div>
        <div  class="grow inset-0 relative overflow-y-hidden w-[400px] flex flex-col gap-2" ref="elem">
                <QuizCard v-for="(question, index) in questions" :key="question.id" :question="question"
                    :animation="index == 0 && animationState == 'moveaway' ? 'moveaway' : 'none'"
                    :content-opacity="index == 0 ? 1 : 0" @answer-submitted="submitAnswer" class="absolute"
                    :style="makeCardStyle(index, questions.length)" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, type CSSProperties } from 'vue'
import type { Question } from '~/common/Types';
import { Util } from '~/common/Util'
import type { AnswerSubmission } from '~/components/QuizCard.vue'


const { setQuizState, addCorrectAnswer } = useApplicationState()

const props = defineProps<{
    questions: Question[]
}>();

const questions = shallowRef(props.questions/*.slice(0, 3)*/)

type AnimationState = "moveaway" | "moveup" | "done"
const animationState = ref<AnimationState>("done")

const elem = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

const moveQuestions = () => {
    animationState.value = "moveaway"
    setTimeout(() => {
        const newQuestions = Util.rotateArray([...questions.value], -1)
        questions.value = newQuestions
        currentIndex.value = currentIndex.value + 1
        if (currentIndex.value == questions.value.length) {
            setQuizState("FINISHED")
        }
        animationState.value = "moveup"
        setTimeout(() => {
            animationState.value = "done"
        }, 1)
    }, 300)
}
const submitAnswer = (submission: AnswerSubmission) => {
    if (submission.selectedAnswer == submission.question.correctIndex) {
        addCorrectAnswer()
    }
    moveQuestions()
}

const { windowWidth, windowHeight } = useWindowSize()


const makeCardStyle = (index: number, count: number): CSSProperties => {
    windowWidth.value
    windowHeight.value
    const scaleFactor = 0.95
    const scale = Math.pow(scaleFactor, index)
    const translateY = index * 32
    const availw = elem.value?.clientWidth || -5000
    const x = (availw - 400) / 2

    return {
        transition: "all 250ms ease-in-out",
        left: x + "px",
        opacity: 1 - (index * 0.2),
        zIndex: count - index,
        transform: `translateY(${translateY}px) scale(${scale})`,
        animation: index == 0 && animationState.value == 'moveaway' ? 'moveaway 250ms ease-in-out forwards' : 'none',
    }
}


</script>
