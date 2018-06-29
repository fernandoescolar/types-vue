export default {
    input: 'lib/types-vue.js',
    output: {
        name: 'VueTypescript',
        file: 'lib/types-vue.umd.js',
        format: 'umd',
        globals: {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-class-component': 'VueClassComponent'
        }
    },
    plugins: [
        { "process.env.NODE_ENV" : "production" }
    ],
    external: [
        'vue', 'vuex', 'vue-class-component'
    ]
}