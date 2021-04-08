<template>
	<div class="select_input" @click.stop="showListFn">
		<a-checkbox
			:indeterminate="indeterminate"
			@change="onCheckAllChange"
			:checked="checkAll"
		>
		{{ title }}
		</a-checkbox>
		<div class="option_list" v-show="showList">
			<a-checkbox-group :options="options" v-model="checkedList" @change="onChange" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '新认定且符合申报'
		},
		options: {  //总列表选项
			type: Array,
			default: []
		},
		checkedList: {  //选择的选项
			type: Array,
			default: []
		},
		checkAll: {
			type: Boolean,
			default: false
		},
		showList: {
			type: Boolean,
			default: false
		},
		indeterminate {  //全选效果
			type: Boolean,
			default: true
		}
	},
  data () {
    return {

    }
  },
  mounted() {

  },
  methods: {
		// 全选
		onCheckAllChange (e) {
			this.newListShow = true;
			Object.assign(this, {
				checkedList: e.target.checked ? plainOptions : [],
				indeterminate: false,
				checkAll: e.target.checked,
			})
		},
		// 单个变化
		onChange () {

		},
		showListFn () {
			this.$emit('showList')
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
