<template>
    <PageContent>
        <Transition name="bounce">
            <div v-if="show" className="uppercase font-bold select-none" :style="styles">Nuxtquiz</div>
        </Transition>
        <div>A quiz written using Vue.js & Nuxt</div>
    </PageContent>
</template>
<script setup lang="ts">


const show = ref(false)
const styles = ref({
    fontSize: "15vw",
})

onMounted(() => {
    setTimeout(() => {
        show.value = true
    }, 150)
})


</script>
