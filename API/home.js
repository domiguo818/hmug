import fly from '@/utils/rquest.js'
// console.log(fly.get('/home/swiperdata'))
export function getBanners () {
	return fly.get('/home/swiperdata')
}
/**
 * 获取分类数据
 * */
export const getNavList = () => {
	return fly.get('/home/catitems')
}
// 获取楼层
export const getFloors = () => fly.get('/home/floordata')