import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
        modal: {
            visible: false,
            doc_id: null
        }
    },
    mutations: {
        openModal(state, doc_id){
            state.modal.visible = true;
            state.modal.doc_id = doc_id;
        },
        closeModal(state){
            state.modal.visible = false;
        },
        setData(state, data){
            state.data = data;
        },
    },
    getters: {
        getDataByDocId: (state, getters) => (doc_id) => {

            for (let index in state.data){
                if(state.data[index].Id == doc_id) {
                    return state.data[index].FinanceActLines;
                }
            }

            return false;
        }

    },
    actions: {
        fetchData({ commit }){
            // фейковый запрос на получение данных
            setTimeout(function () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        "Id":"f879f53a-5c58-11e7-80c5-9c8e991e5cb4",//Id Объекта акта об оказании услуг
                        "Date":"2017-06-30T23:59:59",//Дата документа
                        "OrgId":"f12d2c68-1a46-11e5-be74-00155dc6002b",//Id Юридического лица
                        "OrgName":"ООО APS Logistic",//Наименование юридического лица
                        "CustomerId":"8b7d60b0-35e3-11e5-80bc-1cc1de769e18",//Id Заказчика
                        "CustomerName":"ООО Эльдорадо",//Наименование заказчика
                        "TotalAmount":365459.31,//Сумма документа
                        "FinanceNumber":"APS000000033",//Номер акта об оказании услуг
                        "FinanceTaxNumber":"APS000000156",//Номер счета фактуры к данному акту об оказании услуг,
                        "FinanceActLines": {
                            "FinanceActId":"f879f53a-5c58-11e7-80c5-9c8e991e5cb4",//Id документа, к которому относится строка
                            "Description":"Автотранспортные услуги - операционная составляющая за период с 16.06.2017 по 30.06.2017 по договору Д-378НАВТ/НЮ от 03.07.2015",//Содержание услуги
                            "Qty":133.0,//Количество услуг
                            "Rate":863.97,//Тариф
                            "Amount":114908.01,//Сумма
                            "TaxRate":18,//Ставка НДС
                            "TaxAmount":20683.44,//Сумма НДС
                            "IsDeleted":false//Признак неактуальности строки
                        }
                    });
                }

                commit('setData', data);
            }, 1000);
        }
    }
});