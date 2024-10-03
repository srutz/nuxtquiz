<template>
    <PageContent>

        <Title>Quiz {{ quizState }}</Title>

        <ClientOnly>
            <KeepAlive>
                <Quiz :questions="questions"></Quiz>
            </KeepAlive>
        </ClientOnly>
    </PageContent>
</template>

<script setup lang="ts">
import { makeGermanQuestions } from '~/common/Categories';

import PageContent from '~/components/PageContent.vue';

const questions = makeGermanQuestions()
const { quizState } = useApplicationState()


</script>
