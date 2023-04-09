<template>
	<div class="navBar">
		<el-menu active-text-color="#409EFF" background-color="#304156" text-color="#BFCBD1"
			class="el-menu-vertical-demo" :default-active="defaultActive" @open="handleOpen" @close="handleClose"
			router>
			<el-menu-item index="/calendar/calendar">
				<el-icon>
					<setting />
				</el-icon>
				<span>首页</span>
			</el-menu-item>
			<el-sub-menu index="2">
				<template #title>
					<el-icon>
						<setting />
					</el-icon>
					<span>系统管理</span>
				</template>
				<el-menu-item index="/working/parameter">
					<span>参数管理</span>
				</el-menu-item>
				<el-menu-item index="/working/Dictionnaire">
					<span>字典配置管理</span>
				</el-menu-item>
			</el-sub-menu>
		</el-menu>
	</div>
</template>

<script setup>
	import {
		ref,
		watch
	} from "vue";
	import {
		useRouter
	} from 'vue-router';
	let router = useRouter()

	let defaultActive = ref('')
	watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
		// console.log('watch',newValue);
		// defaultActive.value = newValue
	}, {
		immediate: true
	})

	const handleOpen = (key, keyPath) => {
		console.log(key, keyPath)
	}
	const handleClose = (key, keyPath) => {
		console.log(key, keyPath)
	}
</script>

<style scoped lang="less">
	// &:deep(.el-menu-item){
	// 	background:#1f2d3d;
	// }
	// &:deep(.el-menu-item):hover{
	// 	background: rgb(38,52,69);
	// }
	.navBar {
		height: 100%;
		width: 220px;
		overflow-y: auto;

		/deep/ .el-sub-menu .el-sub-menu__icon-arrow {
			left: 160px;
			right: initial;
		}
	}
</style>
