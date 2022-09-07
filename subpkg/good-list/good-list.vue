<template>
	<view>
		<van-card v-for="item in goods" :key="item.goods_id" :price="item.goods_price" :title="item.goods_name"
			:thumb="item.goods_small_logo || defaultPic"
			:thumb-link="`/subpkg/goods-detail/goods-detail?id=${item.goods_id}`" />
	</view>
</template>

<script>
	import {
		getGoodsList
	} from '../../API/goodsList.js'
	import toast from '../../utils/toast.js'
	export default {
		data() {
			return {
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				goods: [],
				total: '',
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				isLoading: false
			};
		},
		methods: {
			async GoodsList(cb) {
				this.isLoading = true
				const res = await getGoodsList(this.queryObj)
				this.isLoading = false
				console.log(res)
				this.goods = [...this.goods, ...res.message.goods]
				this.total = res.message.total
				cb && cb()

			}
		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 对象中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.GoodsList()
		},
		onPullDownRefresh() {
			console.log('下拉')
			this.queryObj = {
				// 查询关键词
				query: this.queryObj.query,
				// 商品分类Id
				cid: '',
				// 页码值
				pagenum: '',
				// 每页显示多少条数据
				pagesize: ''
			}
			this.goods = []
			this.total = ''
			this.GoodsList(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return toast('数据加载完毕！')
			if (this.isLoading === true) return
			console.log('触底')
			this.queryObj.pagenum++

			this.GoodsList()

		}
	}
</script>

<style lang="scss">

</style>
