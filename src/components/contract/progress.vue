<template>
	<div>

		<!-- 数据表格 -->
		<el-form :model="formData" style="display: flex;">
			<el-form-item label="年份" style="width: 350px;">
				<el-date-picker v-model="formData.keywords" type="year" value-format='YYYY' placeholder="选择年"
					@change="Primary">
				</el-date-picker>
			</el-form-item>
			<el-form-item style="margin-left: 20px;">
				<el-button type="primary" @click='addrest' :loading='formData.Recherche'>新增</el-button>
			</el-form-item>
		</el-form>
		<div class="bge">
			<el-table :header-cell-style="{background:'#F2F6FC',color:'#000'}" :data="getholidayListresarray" stripe
				border style="width: 100%;height: 100%;">
				<el-table-column prop="time" label="日期" />
				<el-table-column prop="current_progress" label="进度(%)">
					<template #default="scope">
						{{scope.row.current_progress.toFixed(2)}}
					</template>
				</el-table-column>
				<el-table-column prop="progress" label="累计进度(%)">
					<template #default="scope">
						{{scope.row.progress.toFixed(2)}}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="left" fixed="right">
					<template #default="scope">
						<div>
							<el-button @click='Actionedition(scope.row,2)' >编辑</el-button>
							<el-button type="danger" @click='ActionSupprimer(scope.row)' v-if="scope.row.past">删除</el-button>
						</div>

					</template>
				</el-table-column>
				<template v-slot:empty>
					<div>暂无数据</div>
				</template>
			</el-table>

		</div>
		<!--  分页  -->
		<div class="example-pagination-block">
			<el-pagination v-model:currentPage="formData.page" background v-model:page-size="formData.size"
				:page-sizes="[10, 20, 50 ,100]" layout="sizes, prev, pager, next" :total="parseFloat(count)"
				@size-change="sizeGetListData" @current-change="pageGetListData" />
		</div>
		<el-dialog v-if="dialogVisible" v-model="dialogVisible" :title="PUBLICECONTERL.title"
			:before-close="handleClose" width="30%">
			<el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :rules="rules">
				<el-form-item label="日期" prop="projectdate">
					<el-date-picker v-model="ruleForm.projectdate" type="month" value-format='YYYY-MM' placeholder="选择月"
						:disabled="dialogVisible==2">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="当月累计进度" prop="progress">
					<el-input v-model="ruleForm.progress" @input='ontimearrayinput'></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
				</span>
			</template>
		</el-dialog>
	</div>

</template>

<script setup>
	import {
		ref,
		onMounted,
		unref,
		reactive,
		watch
	} from 'vue'
	import {
		setDOM
	} from '@/utils/publice.js'
	import {
		getprojectprogress,
		postprojectprogress,
		putProjectProgress,
		deleteprogress
	} from "@/api/working/contract";
	const props = defineProps({
		projectid: ''
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
		title: ''
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
	let getholidayListres = async () => {
		let getParam = {
			page: formData.value.page,
			size: formData.value.size
		}
		formData.value.keywords ? getParam.year = unref(formData).keywords : '';
		try {
			let res = await getprojectprogress(getParam, props.projectid.id);
			if (res.data.data) {
				let _PlanStartTime = new Date();
				let tanma = new Date(_PlanStartTime.getFullYear() + '-' + _PlanStartTime.getMonth());

				res.data.data.forEach(itmer => {
					itmer.time = itmer.portion_year + '-' + itmer.portion_month;
					let _PlanEndTime = new Date(itmer.time)
					if (tanma.getTime() < _PlanEndTime.getTime()) {
						itmer.past = true;
					}
				})
				count.value = res.data.count;
				getholidayListresarray.value = res.data.data;
			} else {
				count.value = 0;
				getholidayListresarray.value = [];
			}


			formData.value.Recherche = false;
		} catch (e) {
			formData.value.Recherche = false;
			//TODO handle the exception
		}
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
				'此操作会删除当月进度列表，是否确认删除?',
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
		current_progress: '', //当月进度	
		progress: '', //当前月累计进度	
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
	const submitForm = async (formEl) => {
		await formEl.validate(async (valid, fields) => {
			if (valid) {
				try {
					if (dialogVisible.value == 1) {
						let parameter = {
							project_id: props.projectid.id,
							progress: ruleForm.progress,
							portion_year: ruleForm.projectdate.split('-')[0],
							portion_month: ruleForm.projectdate.split('-')[1]
						};
						let res = await postprojectprogress(parameter);
						getholidayListres()
					} else {
						let parameter = {
							progress: ruleForm.progress,
						};
						let res = await putProjectProgress(parameter, ruleForm.id);
						getholidayListres()
					}
					ElMessage({
						message: dialogVisible.value === 1 ? '创建成功' : '修改成功',
						type: 'success',
					})
					dialogVisible.value = false;
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
				console.log('submit!')
			}
		})
	}
	// 搜索参数
	const Primary = () => {
		if (formData.value.Recherche) return;
		formData.value.page = 1;
		formData.value.Recherche = true;
		getholidayListres()
	}
	const addrest = () => {
		PUBLICECONTERL.title = '新增进度列表';
		ruleForm.projectdate = '';
		ruleForm.progress = '';
		dialogVisible.value = 1;
	}
	const ontimearrayinput = (itmer) => {
		setTimeout(ac => {
			ruleForm.progress = ruleForm.progress.replace(/[^\d\.]/g, '');
			ruleForm.progress = ruleForm.progress.replace(/^\./g, '');
			ruleForm.progress = ruleForm.progress.replace(/\.{2,}/g, '.');
			ruleForm.progress = ruleForm.progress.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
			ruleForm.progress = ruleForm.progress.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			if (ruleForm.progress > 100) {
				ruleForm.progress = 100
			}
		})
	}
</script>
<style scoped lang="less">
	.example-pagination-block {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
		padding-bottom: 15px;
	}

	&:deep(.el-table__header) {
		background: #409EFF;
	}

	.bge {
		min-height: calc(100vh - 430px);
		overflow-y: auto;
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
