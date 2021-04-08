<template>
	<div class="pub_header">
		<div class="nav_top_wrap">
			<div class="logo_box">
				<!-- <img src="~assets/img/icon/red_logo.png" class="logo" alt=""> -->
				<span class="l_name">打击侵权假冒防疫物资线索举报平台</span>
			</div>
			<div class="top_ser">
				官方客服： 010-84109061
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
	},
	data () {
		return {
		}
	},
	mounted () {
	},
	methods: {

	},
	watch: {
	}
}
</script>

<style lang="scss">
	.pub_header {
		height: 52px;background-color: #fff;color: #333;
		.nav_top_wrap {
			width: 1200px; height: 52px;margin: 0 auto;position: relative;
			.logo_box {
				height: 52px;padding-top: 15px;
				//.logo {width: 28px; height: 36px; margin-left: 20px; vertical-align: middle;}
				.l_name {font-size: 16px; height: 22px; line-height: 22px;font-weight: 600;}
			}
			.top_ser {
				height:20px;font-size:14px;margin-top: 16px; position: absolute; right: 0; top:0;color: #666;
			}
		}
	}
</style>
