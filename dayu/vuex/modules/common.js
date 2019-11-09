import *as types from '../types';

 const state = {
	cardList: [],
	actInfo: null,
	isRefreshMinie: false, //是否刷新我的页面
	storeInfo: null,
	scanObj: null, //扫码对象
 }

 const getters = {
	c_cardList: state => state.cardList,
	c_actInfo: state => state.actInfo,
	c_isRefreshMinie: state => state.isRefreshMinie,
	c_storeInfo: state => state.storeInfo,
	c_scanObj: state => state.scanObj
 }

 const mutations  = {
 	[types.CARD_ARR_LIST](state, arr) {
 		state.cardList = arr
 	},
	[types.SAVE_ACT_INFO](state, obj) {
		state.actInfo = obj
	},
	[types.REFRESH_MINE_DATA](state, status) {
		state.isRefreshMinie = status
	},
	[types.STORE_DETAIL_INFO](state, obj) {
		state.storeInfo = obj
	},
	[types.TO_SCAN_CODE](state, obj) {
		state.scanObj = obj
	}
 }

 const actions = {
 	c_getCardArrList({commit}, arr) {
 		commit(types.CARD_ARR_LIST, arr)
 	},
	c_toSaveActInfo({commit}, obj) {
		commit(types.SAVE_ACT_INFO, obj)
	},
	c_toRefreshMine({commit}, status) {
		commit(types.REFRESH_MINE_DATA, status)
	},
	c_toSaveStoreInfo({commit}, obj) {
		commit(types.STORE_DETAIL_INFO, obj)
	},
	c_toSaveScanObj({commit}, obj) {
		commit(types.TO_SCAN_CODE, obj)
	}
 }

 export default {
	state,
    actions,
    getters,
    mutations
}