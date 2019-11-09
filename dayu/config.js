
// const host = "https://dayu.ulvjia.com"
const host = "https://dayu.ulvjia.com"
// const host = "https://dayu.api.ulvjia.com"

const config = {
	host,
	defaultTitle: '大渔',
	defaultUrl: '../../static/defaultUrl.jpg',
	login: `${host}/app/login`, //登陆
	getPhone: `${host}/app/phone`, //获取手机号
	getUserTel: `${host}/app/phone`, //手机号获取
	vipCard: `${host}/app/vipcards`, //会员卡
	storeList: `${host}/app/goods/list`, //产品列表
	storeDetail: `${host}/app/goods/details`, //商品详情
	activiList: `${host}/app/activity/list`, //活动列表
	buyStore: `${host}/app/goods/buy`, //购买商品
	buyRecord: `${host}/app/goods/buy/list`, //购买记录
	buyDetail: `${host}/app/goods/buy/details`, //购买详情
	couponCode: `${host}/app/coupon/code`, //券的二维码
	mineActivityList: `${host}/app/activity/my`, //我的活动列表
	cardCode: `${host}/app/vip/code`, //会员卡二维码
	fishCount: `${host}/app/vip/details`, //更新钓鱼次数
	actDetail: `${host}/app/activity/details`, //活动详情
	activityPay: `${host}/app/activity/apply`, //报名支付
	actApplyDetail: `${host}/app/activity/apply/details`, //活动报名详情
	photoList: `${host}/app/picture/list`, //活动照片列表
	saveUpload: `${host}/app/picture/save`, //保存上传照片
	buyCard: `${host}/app/vip/buy`, //购买会员卡
	checkPower: `${host}/app/ticket/valid`, //验证权益
}

module.exports = config

