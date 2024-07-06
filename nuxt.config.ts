// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxt/ui",
    "@nuxt/icon",
    "@sidebase/nuxt-auth",
  ],
  auth: {
    globalAppMiddleware: true,
    baseURL: 'http://localhost:8000/api',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/profile', method: 'get' }
      },
      pages: {
        login: 'auth/login',
      },
      token: {
        signInResponseTokenPointer: '/data/access_token'
      },
      sessionDataType: {}
    },
    enableSessionRefreshPeriodically: 5000,
    enableSessionRefreshOnWindowFocus: true,
    globalMiddlewareOptions: {
      allow404WithoutAuth: true,  // Defines if the 404 page will be accessible while unauthenticated
      addDefaultCallbackUrl: '/' // Where authenticated user will be redirected to by default
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    { src: '~/plugins/vue3-toastify.js', mode: 'client' }
  ],


})