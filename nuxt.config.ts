// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    css: ["~/assets/css/style.css"],
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
    },

    modules: ["@nuxtjs/tailwindcss", '@pinia/nuxt', '@nuxt/fonts', '@nuxt/icon'],
    routeRules: {
        '/': {
            ssr: true
        }
    },
})