// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],
    tailwindcss: {
        config: {
            theme: {
                extend: {
                    fontFamily: {
                        poppins: ["Poppins", "sans-serif"],
                    }
                },
            }
        }
    },
    fonts: {
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
        families: [
            {name: 'Poppins', provider: 'google', global: true},
        ],
        experimental: {
            processCSSVariables: true
        },
        provider: 'google'
    }
})
