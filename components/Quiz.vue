<template>
    <div class="grow inset-0 relative overflow-y-auto w-full" ref="elem">
        <QuizCard v-for="(question, index) in questions" :key="question.id" :question="question"
            :animation="index == 0 && animationState == 'moveaway' ? 'moveaway' : 'none'"
            :content-opacity="index == 0 ? 1 : 0" @answer-submitted="submitAnswer" class="absolute"
            :style="makeCardStyle(index, questions.length)" />
    </div>
</template>

<script setup lang="ts">

import { ref, type CSSProperties } from 'vue'
import { makeGermanQuestions } from '~/common/Categories'
import type { Question } from '~/common/Types';
import { Util } from '~/common/Util'
import type { AnswerSubmission } from '~/components/QuizCard.vue'


const props = defineProps<{
    questions: Question[]
}>();

const questions = ref(props.questions.slice(0, 6))

type AnimationState = "moveaway" | "moveup" | "done"
const animationState = ref<AnimationState>("done")

const elem = ref<HTMLElement | null>(null)

const moveQuestions = () => {
    animationState.value = "moveaway"
    setTimeout(() => {
        questions.value = Util.rotateArray(questions.value, -1)
        //questions.value = Util.shuffledCopy(questions.value)
        animationState.value = "moveup"
        setTimeout(() => {
            animationState.value = "done"
        }, 1)
    }, 300)
}
const submitAnswer = (submission: AnswerSubmission) => {
    console.log(submission)
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
