<template>
	<!-- 页尾 -->
	<footer class="fac_footer">
		<div class="container clearfix">
			<div class="link">
				<span>友情链接：</span>
				<a href="https://ipp.alibabagroup.com/index.htm" target="_blank">阿里巴巴知识产权保护平台</a>
				<a href="http://sbj.saic.gov.cn/" target="_blank">商标局</a>
				<a href="http://www.sipo.gov.cn/" target="_blank">专利局</a>
				<a href="http://www.ncac.gov.cn/" target="_blank">版权局</a>
				<a href="http://www.cac315.net/" target="_blank">中国防伪网</a>
				<a href="http://samr.saic.gov.cn/" target="_blank">国家质量监督检测检疫总局</a>
				<a href="http://www.chinatt315.org.cn/" target="_blank">产品质量申诉处理中心</a>
			</div>
			<div class="footer_bot clearfix">
				<div class="fl caasa">
					<a class="fl"><img src="~assets/img/header_footer/caasa1.png" alt=""></a>
					<p>中国产学研合作促进会反侵权假冒创新战略联盟 <a class="link" href="https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E5%8F%8D%E4%BE%B5%E6%9D%83%E5%81%87%E5%86%92%E5%88%9B%E6%96%B0%E6%88%98%E7%95%A5%E8%81%94%E7%9B%9F?sefr=ps" target="_blank">联盟简介</a></p>
					<p>Anti-Infringement and Anti-Counterfeit Innovation Strategic Alliance</p>
				</div>
				<div class="fr sebe">
					<a href="#" class="fl"><img src="~assets/img/header_footer/sebe.png" alt=""></a>
					<p>杭州拾贝知识产权服务有限公司为中国产学研合作促进会反侵权假冒创新战略联盟理事长单位</p>
					<p><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" target="_blank" class="link">浙ICP备15042618号</a> | <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402003197" target="_blank" class="link">浙公网安备 33010402003197号</a> © 2019 拾贝公司 All Rights Reserved</p>
				</div>
			</div>
		</div>

	</footer>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
	},
	mounted () {}
}
</script>

<style lang="scss">
/* 底部样式 */
.fac_footer{
	position: relative;color: #999;background: #222;padding: 20px 0 0;
	&::after{content: '';height: 1px;width: 100%;background: #333;position: absolute;bottom: 82px;right: 0px}
	h3{font-size: 14px;line-height: 30px;padding-bottom: 10px;
		span{padding-left: 10px;color:#666;}
	}
	.link{
		font-size: 14px;
		padding: 0 0 20px;
		>span{color: #999;line-height: 30px;}
		a{text-decoration: none;color: #666;padding-right: 30px;position: relative;line-height: 30px;
			&::after{content: '';height: 14px;width: 1px;background: #666;position: absolute;top: 3px;right: 15px}
			&:last-child::after{height: 0;}
			&:hover {color: #3DB1FA;}
		}
	}
	.footer_bot{
		padding: 20px 0 20px;
		.link {
			color: #999; font-size: 12px;
			&:hover { color: #3DB1FA;}
		}
		.caasa{
			height: 40px;
			p{padding-left: 80px;font-size: 12px;}
		}
		.sebe{
			height: 40px;
			p{padding-left: 84px;font-size: 12px;}
		}
	}
}
.fac_footer .container { width: 1200px; margin: 0 auto; overflow: hidden; }
</style>
