<template>
    <div className="h-12 bg-white border-b border-gray-200 flex items-center gap-2 px-3">
        <Icon name="material-symbols:help" size="1.5rem"/>
        <div class="font-bold">NuxtQuiz</div>
        <div class="w-16"></div>
        <template v-for="item in items" :key="item.id"">
            <a 
                @click="handleItemClick(item)"
                class="cursor-pointer px-2 py-1 rounded-md">{{ item.name }}</a> 
        </template>
    </div>
</template>

<script setup lang="ts">

const store = useApplicationState()
const { quizState } = storeToRefs(store)

const items = [
    { id: "main", link: '/', name: 'Home',  },
    { id: "quiz", link: '/quiz', name: 'Quiz' },
    { id: "about", link: '/about', name: 'About' }
] as const


const handleItemClick = (item: typeof items[number]) => {
    navigateTo(item.link)
}

</script>