<template>
    <div
        class="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-[400px] h-[540px] flex flex-col"
       >
        <div class="flex flex-col grow bg-white">
            <div class="md:shrink-0" :style="getContentStyles()">
                <img class="h-48 w-full object-cover" :src="image" :alt="imageAlt">
            </div>
            <div class="p-8 flex flex-col grow" v-auto-animate>
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Question {{ question.id }} ({{ question.categoryKey }})
                </div>
                <p class="mt-2 text-slate-500 ">{{ question.text }}</p>
                <div v-if="state == 'asking'" class="mt-4 grow">
                    <div v-for="(alternative, index) in question.options" :key="index" class="mt-2">
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio text-indigo-600" :value="index"
                                v-model="selectedAnswer" :name="'question-' + question.id">
                            <span class="ml-2">{{ alternative }}</span>
                        </label>
                    </div>
                </div>
                <div v-else-if="question.correctIndex == selectedAnswer" class="mt-2 grow">
                    <span class="text-slate-500">
                        <div class="text-green-900"><span class="text-3xl">😎</span><span class="pl-4 text-2xl font-bold">Richtige Antwort</span></div>
                        <div class="pt-4">{{ question.options[question.correctIndex] }}</div>
                    </span>
                </div>
                <div v-else class="mt-2 grow">
                    <span class="text-slate-500">
                        <div class="text-red-800"><span class="text-3xl">⚠</span><span class="pl-4 text-2xl font-bold">Falsche Antwort</span></div>
                        <div class="pt-4">Die richtige Antwort ist: {{ question.options[question.correctIndex] }}</div>
                    </span>
                </div>
                <div v-if="state == 'asking'" class="mt-4" >
                    <button @click="submitAnswer" :disabled="selectedAnswer === null">
                        Abschicken
                    </button>
                </div>
                <div v-else class="mt-4" >
                    <button @click="submitDone" >
                        Nächste Frage
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, defineProps, defineEmits, type CSSProperties } from 'vue'
import type { Question, CategoryKey } from '~/common/Types';
import { vAutoAnimate } from '@formkit/auto-animate'


export type AnswerSubmission = {
    question: Question
    selectedAnswer: number
}

type State = "asking" | "answered"

const state = ref<State>("asking")

const { question, contentOpacity = 1 } = defineProps<{
    question: Question,
    contentOpacity?: number,
}>()

const emit = defineEmits<{
    (e: 'answer-submitted', submission: AnswerSubmission): void
}>()

const pictures: Record<CategoryKey, string> = {
    history: 'https://picsum.photos/id/410/400/300',
    art: 'https://picsum.photos/id/904/400/300',
    science: 'https://picsum.photos/id/998/400/300',
    sports: 'https://picsum.photos/id/904/400/300',
    geography: 'https://picsum.photos/id/507/400/300',
    celebreties: 'https://picsum.photos/id/665/400/300',
}

const selectedAnswer = ref<number | null>(null)
const image = ref(pictures[question.categoryKey])
const imageAlt = ref(question.categoryKey + " Image")

const submitAnswer = () => {
    if (selectedAnswer.value !== null) {
        state.value = "answered"
    }
}

const getContentStyles = (): CSSProperties => {
    return {
        "opacity": contentOpacity,
        "transition": "all 200ms ease-in-out"
    }    
}

const submitDone = () => {
    if (selectedAnswer.value !== null) {
        setTimeout(() => {
            state.value = "asking"
        }, 500)
        emit('answer-submitted', {
            question: toRaw(question),
            selectedAnswer: selectedAnswer.value
        })
        selectedAnswer.value = null
    }
}



</script>