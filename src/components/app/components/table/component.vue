<template>
    <div class="app-table">
        <div class="container">
            <div class="app-table__wrapper dragscroll">
                <table class="app-table__content">
                    <tr>
                        <th v-for="column in columns">
                            {{column}}
                        </th>
                    </tr>
                    <tr v-for="datum in data" @click="openModal(datum.Id)" v-bind:class="['app-table-item', Object.keys(datum).length == 1 ? 'app-table-item--is-empty' : '']">
                        <td
                            v-for="parameter in datum"
                            v-bind:colspan="Object.keys(datum).length == 1 ? columns.length : 1"
                        >{{parameter}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import './dragscroll'

    export default {
        mounted() {
            //перед монтированием, нужно вытащить данные
            this.$store.dispatch('fetchData');
        },
        data: function () {
            return {
                columns: [
                    'ID объекта акта об оказании услуг',
                    'Дата документа',
                    'ID юридического лица',
                    'Наименование юридического лица',
                    'ID заказчика',
                    'Наименование заказчика',
                    'Сумма документа',
                    'Номер акта об оказании услуг',
                    'Номер счета фактуры к данному акту об оказании услуг\n',
                ]
            }
        },
        computed: {
            data(){
                let data = [];
                if(this.$store.state.data.length === 0) {
                    for (let i = 0; i < 10; i++) {
                        data.push({
                            "Id":null
                        });
                    }
                } else {
                    data = this.$store.state.data.map(function (item) {
                        let new_item = {...item};
                        delete new_item["FinanceActLines"];

                        return new_item;
                    });
                }

                return data;
            }
        },
        methods: {
            openModal(doc_id){
                this.$store.commit('openModal', doc_id);
            }
        }

    }
</script>


<style lang="stylus" type="text/stylus" scoped>
    .app-table
        margin-bottom: 20px
        &__wrapper
            overflow-x: auto
            border-radius: 4px
            padding-bottom: 20px
        &__content
            border-radius: 4px
            border: 1px solid #eee
            th
                cursor: move
            th
            td
                white-space: nowrap
                font-size: 12px
                padding: 10px
                border-right: 1px solid #eee
                border-bottom:  1px solid #eee
                &:last-child
                    border-right: none
            tr:last-child
                td
                    border-bottom: none
            tr:hover
                td
                    cursor: pointer
                    background: #fafafa
        &-item
            &--is-empty
                td
                    &:before
                        content: ''
                        display: block
                        height: 12px
                        margin: 3px 0
                        width: 100%
                        background: #bfbfbf
                        animation: blinker 1s linear infinite;
                    @keyframes blinker
                        50%
                            opacity: 0.5;
</style>