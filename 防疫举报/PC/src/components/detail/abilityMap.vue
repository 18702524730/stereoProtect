<template>
  <div class="ability-map" v-show="show">
  	<div class="mask"></div>
  	<div :class="[resultState ? 'goodBg' : 'badBg'  ,'bgContnet']">
  		<div class="bgContnetIn">
				<div id="myChart"></div>
				<div class="resultContent">
					<h2 class="resultTit">{{resultState ? '恭喜，重点培育' : '培育'}}</h2>
					<h4 class="des">{{resultState ? '您的企业达到了重点培育标准' : tips}}</h4>
					<p class="res" v-show="!resultState">评估结果不准确？您还可以咨询专家或填写更详细的销售收入、研发费用、知识产权数量再次评估</p>
				</div>
				<a-icon type="close" class="close" @click="hide" />
			</div>
		</div>
  </div>
</template>

<script>
export default {
	props: {
		show: Boolean,
		saleResult: Number,
		researchCostResult: Number,
		intellectualPropertyResult: Number,
	},
  data () {
    return {
    	resultState: false,
			chartData: [],
			tips: '您的企业达到了重点培育标准',
    }
  },
  mounted() {
  	// this.init();
  },
  methods: {
  	init() {
  		// [70, 90, 90]
			this.chartData[0] = this.saleResult == 0 ?  70 : 90;
			this.chartData[1] = this.researchCostResult == 0 ? 70 : 90;
			this.chartData[2] = this.intellectualPropertyResult == 1 ? 90 : 70;
			let goodArr = this.chartData.filter(item => {
				return item > 70;
			})
			console.log(this.chartData)
			setTimeout(() => {
				this.drawLine(this.chartData);
			}, 300)
			if (goodArr.length > 2) {
				this.resultState = true
			} else {
				this.resultState = false
				if (goodArr.length === 0) {
					this.tips = '希望您的企业在销售、知识产权、研发费用方面加强布局'
					return;
				}
				if(this.saleResult == 0 && this.researchCostResult == 0){
					this.tips = '希望您的企业在销售、研发费用方面加强布局'
					return
				}
				if(this.saleResult == 0 && this.intellectualPropertyResult == 0){
					this.tips = '希望您的企业在销售、知识产权方面加强布局'
					return
				}
				if(this.intellectualPropertyResult == 0 && this.researchCostResult == 0){
					this.tips = '希望您的企业在研发费用、知识产权方面加强布局'
					return
				}
				if (this.saleResult == 0) {
					this.tips = '希望您的企业在销售方面加强布局'
					return
				}
				if (this.researchCostResult == 0) {
					this.tips = '希望您的企业在研发方面加强布局'
					return
				}
				if (this.intellectualPropertyResult == 0) {
					this.tips = '希望您的企业在知识产权方面加强布局'
					return
				}
			}
  	},
  	hide() {
  		this.$emit('update:show', false);
  	},
    drawLine(data){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: ''
        },
        radar: [
          {
            indicator: [
              { text: '销售收入增长率', max: 100 },
              { text: '研发费\n用比例', max: 100 },
              { text: '知识产权', max: 100 }
            ],
            center: ['50%', '55%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
							fontSize: '13px',
							width: '40px',
              formatter:'{value}',
              textStyle: {
                color:'#00D2FF'
							}
            },
            splitArea: {
              areaStyle: {
                color: ['rgba(0, 210, 255, .35)',
                'rgba(0, 210, 255, .25)', 'rgba(0,210,255,0.15)',
                'rgba(0,210,255,0.05)'],
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0,210,255,0.5)',
                type: 'dashed'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(0,210,255,0.5)',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '雷达图',
            type: 'radar',
            itemStyle: {
              emphasis: {
								// color: 各异,
								width: 1,
                lineStyle: {
                  width:1,
                  color: '#00D2FF'
                }
              }
            },
            data: [
              {
                value: data,
								symbol: 'circle',
								symbolSize: 5,
								symbolColor: '#00D2FF',
								color: "#00D2FF",
                lineStyle: {
									normal: {
										type: 'solid',
										width: 1,
										color: '#00D2FF'
									}
								},
								itemStyle: {
									normal: {
										color: "#00D2FF"
									}
								},
                areaStyle: {
                  normal: {
                    color: 'rgba(0,210,255,0.4)'
                  }
                }
              }
            ]
          }
        ]
      });
    }
  },
 	watch: {
 		show() {
 			if (this.show) {
 				this.init();
 			}
 		}
 	}
}
</script>

<style lang="scss">
	.ability-map {
		.mask{position: fixed;top:0; left:0; bottom: 0; right: 0;background:rgba(0,0,0,0.5);}
		.bgContnet{
			position: fixed;top:50%; left:50%; width: 450px; height: 470px; transform: translate(-50%, -50%);border-radius:8px;
			.bgContnetIn{
				position: relative;width: 450px;height:100%;text-align: center;padding-top: 50px;
				#myChart{height: 280px;width: 450px;}
				.resultContent{
					h2{height:32px;color: #fff;font-size:23px;font-weight:700;margin-top: 15px;margin-bottom: 0;}
					h4{height:18px;margin-top: 3px;font-size:13px;line-height: 18px;color: #A3C5FF;}
					.res{width: 300px;color: #A3C5FF;font-size:12px;line-height: 17px;margin: 0 auto;}
				}
				.close{position: absolute; top:7px; right:7px; width: 40px;height: 40px;padding: 13px; font-size: 14px;color: #fff;cursor: pointer;}
			}
			&.goodBg{background: url('~assets/img/detail/goodRes.jpg') no-repeat;background-size: 100% 101%;}
			&.badBg{background: url('~assets/img/detail/badRes.jpg') no-repeat;background-size: 100% 101%;}
		}
	}
</style>
