<template>
    <PageContent>

        <Title>Quiz {{ quizState }}</Title>

        <template v-if="quizState === 'STOPPED'">
            <div class="flex flex-col gap-2">
                <button @click="setQuizState('STARTED')" class="uppercase">Starte Quiz</button>
            </div>
        </template>
        <template v-if="quizState === 'STARTED'">
            <ClientOnly>
                <KeepAlive>
                    <Quiz :questions="questions"></Quiz>
                </KeepAlive>
            </ClientOnly>
        </template>
        <template v-if="quizState === 'FINISHED'">
            <div class="flex flex-col gap-4 items-center justify-center">
                <div class="border-b border-gray-500 text-3xl">Dein Quiz-Ergebnis</div>
                <div class="">
                    <span class="text-5xl">{{ correctAnswers }}</span><span class="text-4xl"> / {{ questionCount }}</span>
                </div>

                <div>Du hast {{ correctAnswers}} von {{ questionCount }} Fragen richtig beantwortet. Das sind
                    {{  Math.round((correctAnswers / questionCount) * 100) }}% der Fragen.
                </div>

                <button @click="setQuizState('STARTED')" class="uppercase">Neues Quiz starten</button>
            </div>
        </template>

    </PageContent>
</template>

<script setup lang="ts">
import { makeGermanQuestions } from '~/common/Categories';


const questions = makeGermanQuestions()
const questionCount = ref(questions.length)
const { quizState, correctAnswers } = toRefs(useApplicationState())
const { setQuizState } = useApplicationState()


</script>
