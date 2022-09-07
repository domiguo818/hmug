import fly from '@/utils/rquest.js'

/**
 * 获取商品列表数据
 * */
export const getGoodsList = (data) => {
	return fly.get(
		'/goods/search', data
	)
}
