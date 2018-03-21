module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vuetifyjs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,600|Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/notosanstc.css' }
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  modules: [
    '@nuxtjs/axios'
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /**
   * axoios setting
   */
  axios: {
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    }
  },
  /*
  ** Vue-router setting
  */
  router: {
    base: '/'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify'],
    extractCSS: true,
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
