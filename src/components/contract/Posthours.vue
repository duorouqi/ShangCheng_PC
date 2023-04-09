<template>
	<div>
		<!-- 数据表格 -->
		<el-form :model="formData" style="display: flex;">
			<el-form-item label="岗位" style="width: 350px;">
				<el-input v-model="formData.keywords" placeholder="请输入搜索内容"></el-input>
			</el-form-item>
			<el-form-item style="margin-left: 20px;">
				<el-button type="primary" icon='search' @click='Primary' :loading='formData.Recherche'>搜索</el-button>
			</el-form-item>
		</el-form>
		<div class="bge" style="max-height: 540px;overflow-y: auto;">
			<el-table :header-cell-style="{background:'#F2F6FC',color:'#000'}" :data="getholidayListresarray" stripe
				@selection-change="handleSelectionChange" ref='reftabe' border style="width: 100%;height: 100%;">
				<el-table-column type="selection" width="55" :selectable="checkboxT" />
				<el-table-column prop="name_cn" label="岗位" />
				<el-table-column prop="man_hour" label="合同工时">
					<template #default="scope">
						<el-input v-model="scope.row.man_hour" placeholder="请填写合同工时" clearable
							@input='ontimearrayinput(scope)' />
					</template>
				</el-table-column>
				<template v-slot:empty>
					<div>暂无数据</div>
				</template>
			</el-table>
		</div>
		<div style="display: flex;justify-content: flex-end;margin-top: 15px;padding-bottom: 15px;">
			<el-button @click="submitForm(1)">取消</el-button>
			<el-button type="primary" @click="submitForm">确认</el-button>
		</div>
	</div>

</template>

<script setup>
	import {
		ref,
		onMounted,
		unref,
		reactive,
		watch,
		nextTick
	} from 'vue'
	import {
		setDOM
	} from '@/utils/publice.js'
	import {
		getprojectprogress,
		postprojectprogress,
		putProjectProgress,
		deleteprogress,
		getcollectionformatlist
	} from "@/api/working/contract";
	const props = defineProps({
		arraylist: ''
	})
	//表单相应参数
	const formData = ref({
		Recherche: false, //搜索限制
		addrest: false, //创建限制
		page: 1, //分页
		size: 10, //分页大小
		keywords: '', //节假日名称
		address: '' //地区
	})
	let PUBLICECONTERL = reactive({
		content: '',
		title: '',
		rowlist: []
	})
	let getholidayListresarray = ref([]);
	//请求登记数量
	let count = ref(null)
	//页面加载时
	onMounted(() => {
		//获取数据
		getholidayListres()
		setDOM()
	})
	const reftabe = ref(null);
	let getholidayListres = async () => {
		getholidayListresarray.value = props.arraylist;
		getholidayListresarray.value.forEach(itmer => {
			if (itmer.ischoice) {
				nextTick(() => {
					reftabe.value.toggleRowSelection(itmer, true)
				})
			}
		})
		formData.value.Recherche = false;
	}
	//分页请求列表接口
	let pageGetListData = (page) => {
		formData.value.page = page
		getholidayListres()
	}
	let sizeGetListData = (size) => {
		formData.value.size = size
		getholidayListres()
	}

	// 操作表格
	let Actionedition = async (itmer, type) => {
		ruleForm.projectdate = itmer.time;
		if (itmer.time.split('-')[1].length == 1) {
			ruleForm.projectdate = itmer.time.split('-')[0] + '-0' + itmer.time.split('-')[1]
		}
		ruleForm.progress = itmer.progress;
		ruleForm.id = itmer.id;
		dialogVisible.value = type;
		if (type == 2) {
			PUBLICECONTERL.title = '编辑进度列表';
		} else {
			PUBLICECONTERL.title = '合同工时详情'
		}
	}
	let ActionSupprimer = (itmer) => {
		ElMessageBox.confirm(
				'此操作会删除进度列表，是否确认删除?',
				'提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(async () => {
				try {
					await deleteprogress(itmer.id);
					getholidayListres()
					ElMessage({
						message: '删除成功',
						type: 'success',
					})
				} catch (e) {
					//TODO handle the exception
				}
			})
			.catch(() => {

			})
	}
	const dialogVisible = ref(false) //修改弹出框
	const handleClose = () => {
		dialogVisible.value = false
	}
	const ruleForm = reactive({
		projectdate: '', //项目日期
		current_progress: '', //进度	
		progress: '', //累计进度	
		name: '', //名称
		manhour: [],
		id: '',
		address: '', //省
		options: []
	})
	const rules = reactive({
		projectdate: [{
			type: 'date',
			required: true,
			message: '请选择日期',
			trigger: 'change'
		}],
		progress: [{
			required: true,
			message: '请输入',
			trigger: 'blur'
		}, ],
	})
	const ruleFormRef = ref(null)

	const emits = defineEmits(['submitForm'])
	const submitForm = (e) => {
		if (typeof e == 'number') {
			emits('updatehours', 1);
			return; //关闭弹窗
		}
		PUBLICECONTERL.rowlist.forEach(itmer => {
			if (!itmer.project_id) {
				itmer.post_id = itmer.id;
				itmer.action = 1;
			}
		})
		emits('updatehours', PUBLICECONTERL.rowlist)
	}
	// 搜索参数
	const Primary = async () => {
		if (formData.value.Recherche) return;
		try {
			let res = await getcollectionformatlist({
				keywords: formData.value.keywords
			})
			// getholidayListresarray.value = res.data
			let listarray = []
			res.data.forEach((itmer, index) => {
				getholidayListresarray.value.some(ginseng => {
					if (itmer.id == ginseng.post_id || itmer.post_id == ginseng.id || itmer.id ==
						ginseng.id || itmer.post_id == ginseng.post_id) {
						res.data.splice(index, 1);
						listarray.push(ginseng);
						return ginseng;
					}
				})
			});
			getholidayListresarray.value = [...listarray, ...res.data];
			getholidayListresarray.value.forEach(ginseng => {
				if (ginseng.ischoice) {
					nextTick(() => {
						reftabe.value.toggleRowSelection(ginseng, true)
					})
				}
			});
		} catch (e) {
			getholidayListresarray.value = props.arraylist;
			//TODO handle the exception
		}
	}
	const addrest = () => {
		PUBLICECONTERL.title = '新增进度列表';
		ruleForm.projectdate = '';
		ruleForm.progress = '';
		dialogVisible.value = 1;
	}
	const ontimearrayinput = (itmer) => {
		setTimeout(ac => {
			getholidayListresarray.value[itmer.$index].man_hour = getholidayListresarray.value[itmer.$index]
				.man_hour.replace(/[^\d\.]/g, '');
			getholidayListresarray.value[itmer.$index].man_hour = getholidayListresarray.value[itmer.$index]
				.man_hour.replace(/^\./g, '');
			getholidayListresarray.value[itmer.$index].man_hour = getholidayListresarray.value[itmer.$index]
				.man_hour.replace(/\.{2,}/g, '.');
			getholidayListresarray.value[itmer.$index].man_hour = getholidayListresarray.value[itmer.$index]
				.man_hour.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
			getholidayListresarray.value[itmer.$index].man_hour = getholidayListresarray.value[itmer.$index]
				.man_hour.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			// if (getholidayListresarray.value[itmer.$index].man_hour > 100) {
			// 	getholidayListresarray.value[itmer.$index].man_hour = 100
			// }
		})
	}
	let checkboxT = (row, index) => {
		return true;
		// if (row.status === '已提交审核') {
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
	let handleSelectionChange = (row, index) => {
		row.forEach(itmers => {
			getholidayListresarray.value.some(ginseng => {
				if (ginseng.name_cn == itmers.name_cn) {
					ginseng.ischoice = true;
					return ginseng
				}
			});
		})
		PUBLICECONTERL.rowlist = row;
	}
</script>
<style scoped lang="less">
	.example-pagination-block {
		display: flex;
		justify-content: flex-end;
		margin-top: 30px;
	}

	&:deep(.el-table__header) {
		background: #409EFF;
	}

	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	::-webkit-scrollbar {
		width: 7px;
		height: 7px;
		background-color: #f5f5f5;
	}

	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		background-color: #f5f5f5;
	}

	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
		background-color: #c8c8c8;
	}
</style>
