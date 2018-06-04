<template>
	<div id="app" class="c-container">
		<transition :name="transitionName">
			<router-view class="child-view"></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	data () {
		return {
			transitionName: ''
		}
	},
	created () {
		//...
	},
	watch: {
		'$route' (to, from) {
			const toDepth = to.path.split('/').length
			const fromDepth = from.path.split('/').length
			this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		}
	}
}
</script>

<style lang="less">
.child-view {
	position: absolute;
	transition: all .3s;
}
.slide-left-enter,
.slide-right-leave-active {
	opacity: 0;
	transform: translate(10%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
	opacity: 0;
	transform: translate(-10%, 0);
}
</style>
