// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: ["~/assets/css/style.css"],
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
    },

    modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", '@nuxt/icon', '@nuxt/fonts', '@pinia/nuxt'],
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    },
    routeRules: {
        '/': {
            ssr: true
        }
    },
})