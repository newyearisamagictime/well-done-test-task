<template>
    <div class="app-table">
        <div class="app-table__inner container">
            <div class="app-table__wrapper dragscroll">
                <table class="app-table__content">
                    <thead class="app-table__header">
                        <tr class="app-table__header-inner">
                            <th v-for="column in columns" class="app-table__header-item">
                                {{column}}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="app-table__body">
                        <tr v-for="datum in data" @click="openModal(datum.Id)" v-bind:class="['app-table-item', Object.keys(datum).length == 1 ? 'app-table-item--is-empty' : '']">
                            <td
                                class="app-table-item__column"
                                v-for="parameter in datum"
                                v-bind:colspan="Object.keys(datum).length == 1 ? columns.length : 1"
                            >{{parameter}}</td>
                        </tr>
                    </tbody>
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
            .app-table__header-item
                cursor: move
            .app-table__header-item
            .app-table-item__column
                white-space: nowrap
                font-size: 12px
                padding: 10px
                border-right: 1px solid #eee
                border-bottom:  1px solid #eee
                &:last-child
                    border-right: none
            .app-table-item:last-child
                .app-table-item__column
                    border-bottom: none
            .app-table-item:hover
                .app-table-item__column
                    cursor: pointer
                    background: #fafafa
        &-item
            &--is-empty
                .app-table-item__column
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