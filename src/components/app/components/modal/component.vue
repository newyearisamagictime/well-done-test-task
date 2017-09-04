<template>
    <div class="app-modal modal fade">
        <div class="app-modal__dialog modal-dialog" role="document">
            <div class="app-modal__content modal-content">
                <div class="app-modal__body modal-body">
                    <button type="button" class="app-modal__close-button close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="app-modal__close-icon">&times;</span>
                    </button>
                    <div class="app-modal__inner">
                        <img src="./no-content.png" class="app-modal__inner-placeholder" v-if="Object.keys(data).length === 0">
                        <div class="app-modal-content-item" v-for="(value, key) in data">
                            <div class="app-modal-content-item__title">{{dic[key]}}</div>
                            <div class="app-modal-content-item__value">{{value}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/js/src/modal'

    export default {
        data: function () {
            return {
                data: {},
                dic: {
                    "FinanceActId":"ID документа, к которому относится строка",
                    "Description":"Содержание услуги",
                    "Qty":"Количество услуг",
                    "Rate":"Тариф",
                    "Amount":"Сумма",
                    "TaxRate":"Ставка НДС",
                    "TaxAmount":"Сумма НДС",
                    "IsDeleted":"Признак неактуальности строки",
                }
            }
        },
        // изменение состояния в случае, если модальное окно закрыылось средставми бутстрапа
        mounted: function () {
            let that = this;
            $(this.$el).on('hide.bs.modal', function () {
                that.$store.commit('closeModal');
            });
        },
        computed: {
            visible(){
                return this.$store.state.modal.visible;
            },
            doc_id(){
                return this.$store.state.modal.doc_id;
            }
        },
        watch: {
            visible: function (value) {
                if(value) {
                    let that = this;
                    $(this.$el).modal('show');
                    this.data = {};

                    // фейковый запрос на получение данных по doc_id
                    setTimeout(function () {
                        that.data = that.$store.getters.getDataByDocId(that.doc_id);
                    }, 1000);
                }
            }
        },
        methods: {
            closeModal(){
                this.$store.commit('closeModal');
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" scoped>
    .app-modal__close-button
        z-index: 10
    .app-modal-content-item
        margin-bottom: 10px
        &:first-child
            margin-top: 5px
        &:last-child
            margin-bottom: 0
        &__title
            font-weight: bold
            color: #333
    .app-modal__inner-placeholder
        animation: blinker 1s linear infinite;
    @keyframes blinker
        50%
            opacity: 0.5;

</style>