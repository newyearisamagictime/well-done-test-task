<template>
    <div class="app">
        <div class="app__header"><app-header></app-header></div>
        <div class="app__content"><app-table></app-table></div>
        <div class="app__footer"><app-footer></app-footer></div>
        <app-modal></app-modal>
    </div>
</template>

<script>
    import header from './components/header/component.vue'
    import footer from './components/footer/component.vue'
    import table from './components/table/component.vue'
    import modal from './components/modal/component.vue'

    export default{
        components: {
            'app-header' : header,
            'app-footer' : footer,
            'app-table' : table,
            'app-modal' : modal,
        }
    }
</script>

<style src="./reset.styl"></style>
<style src="./fonts.styl"></style>
<style lang="stylus" type="text/stylus" scoped>
    .app
        background: #fff
        min-height: 100%
        display: flex
        flex-direction: column
        justify-content: space-between
        &__content
            flex-grow 1
</style>

