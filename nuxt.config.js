import pkg from './package.json';
import axios from 'axios';

export default {
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/repository'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // Set the baseURL to JSONPlaceholder API
    baseURL: 'https://jsonplaceholder.typicode.com/'
  },
  generate: {
    routes: function () {
      return axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        return res.data.map((post) => {
          return {
            route: '/post/' + post.id,
            payload: post
          }
        });
      });
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            // eslintt 6 issue https://github.com/webpack-contrib/eslint-loader/issues/271
            formatter: require('eslint/lib/cli-engine/formatters/stylish')
          }
        });
      }
    }
  }
};
