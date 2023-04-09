<template>
	<div>
		<el-calendar ref="calendar" v-model="calendarValue">
			<template #header="{ date }">
				<div style="width: 100%;display: flex;justify-content: center;">
					<span style="cursor: pointer;margin-right: 10px;" @click="selectDate('prev-month')"> &lt;&lt;
					</span>
					<span>{{ date }}</span>
					<span style="cursor: pointer;margin-left: 10px;" @click="selectDate('next-month')"> &gt;&gt; </span>
				</div>
			</template>
			<template #dateCell="{ data }">
				<p :class="{isSelected:getDATE(new Date())==data.day,is_statutory:is_statutory_holiday.includes(data.day)||isDay(data.day)}"
					style="padding: 8px;">
					<span :class="{isDaydate:isDaydate(data.day)&&!is_statutory_holiday.includes(data.day)&&!isDay(data.day),
			  is_statutory:!isDaydate(data.day)
			  }">
						{{ data.day.split('-').slice(1).join('-')}}
					</span>
					<span v-if="is_statutory_holiday.includes(data.day)" style="color: #FE6C6C;">
						<span>{{is_statutory_name[is_statutory_holiday.indexOf(data.day)]}}</span>
						(法定节假日)
					</span>
					<span v-if="isDay(data.day)&&!is_statutory_holiday.includes(data.day)" style="color: #FE6C6C;">(休息日)
					</span>
				</p>
			</template>
		</el-calendar>
		<el-dialog v-model="dialogVisible" title="工时" width="50%" :before-close="handleClose">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
				<el-form-item label="项目名称" prop="projectvalue">
					<el-select class="m-2" placeholder="请选择项目名称" v-model="ruleForm.projectvalue" style="width: 350px;"
						@change='onprojectvalue'>
						<el-option v-for="(item,index) in options.projectoptions" :key="index" :label="item.project_no"
							:value="item.project_post" />
					</el-select>
				</el-form-item>
				<el-form-item label="任务类型" prop="optionsType">
					<el-cascader v-model="ruleForm.optionsType" :options="options.optionsType" style="width: 350px;"
						placeholder="请选择任务类型" :show-all-levels='false'
						:props="{ checkStrictly: true,children:'children',label:'name',value:'id' }">
					</el-cascader>
				</el-form-item>
				<el-form-item label="中心" prop="Centre">
					<el-cascader v-model="ruleForm.Centre" :options="options.optionsType" placeholder="请选择中心"
						style="width: 350px;" :show-all-levels='false'
						:props="{ checkStrictly: true,children:'centers',label:'name',value:'id' }">
					</el-cascader>
				</el-form-item>
				<el-form-item label="日期">
					{{ruleForm.Datetime?ruleForm.Datetime.Complet:''}}
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
		getcollectionformatList
	} from "@/api/calendar";
	import {
		getDATE
	} from '@/utils/date.js'
	import {
		getfilterproject,
		getfiltertask
	} from "@/api/working/travail.js";
	import {
		setDOM
	} from '@/utils/publice.js'

	//页面加载时
	onMounted(() => {
		//获取数据
		getcollectionformatListfun()
		setDOM()
	})
	let is_statutory_holiday = reactive([]); //是否是法定节假日
	let is_statutory_name = reactive([]); //是否是法定节假日
	let getcollectionformatListfun = async () => {
		try {
			let res = await getcollectionformatList();
			res.data.forEach(itmer => {
				is_statutory_holiday.push(itmer.holiday);
				is_statutory_name.push(itmer.name)
			});
			let res2 = await getfilterproject();
			options.projectoptions.push(...res2.data);
		} catch (e) {
			//TODO handle the exception
		}
	}
	const onprojectvalue = async (value) => {
		try {
			let res = await getfiltertask({
				project_post: value
			});
			options.optionsType.push(...res.data);
			beforeUpdate();
		} catch (e) {
			//TODO handle the exception
		}
	}
	let isDay = (date) => { //是否是休息日
		let time = new Date(date);
		if (time.getDay() % 7 === 6 || time.getDay() % 6 === 0) {
			return true;
		} else {
			return false;
		}
	}
	//是否是过期日期
	let isDaydate = (date) => { //是否是过去的日期
		let time = new Date(date);
		let getMonthbook = new Date().getMonth() + 1;
		if ((time.getMonth() + 1) < getMonthbook || new Date().getFullYear() > time.getFullYear()) {
			return false;
		} else {
			return true;
		}
	}

	const calendar = ref();
	const calendarValue = ref(new Date())

	let initialization = false; // 点击上个月或者下个月的日期还让他等于这个月
	let nextmonth = 0;
	const selectDate = (val) => { //关闭工时弹窗
		initialization = true;
		if (val === 'next-month') {
			nextmonth = nextmonth + 1;
		} else {
			nextmonth = nextmonth - 1;
		}
		calendar.value.selectDate(val)
	}

	let dialogVisible = ref(false); // 工时弹窗变量
	const handleClose = () => {
		dialogVisible.value = false
	}
	const ruleFormRef = ref(null)
	const submitForm = async (formEl) => {
		await formEl.validate(async (valid, fields) => {
			if (valid) {
				try {
					let parameter = {
						name: ruleForm.name, // 任务名称
						serial_number: ruleForm.serial_number,
						business_type: ruleForm.business_type,
						is_add_center: ruleForm.is_add_center,
						project_type: ruleForm.project_type,
						is_used_all_post: ruleForm.is_used_all_post
					}
					// ruleForm.id?parameter.id =ruleForm.id:'';
					// if(typeof ruleForm.pid==='number'){
					// 	parameter.pid =ruleForm.pid;
					// }else{
					// 	parameter.pid = Object.values(ruleForm.pid)[Object.values(ruleForm.pid).length -
					// 1];
					// }
					// if (dialogVisible.value === 1) {
					// 	await posttask(parameter);
					// } else {
					// 	await PUTtask(parameter);
					// }
					// getholidayListres();
					// ElMessage({
					// 	message: dialogVisible.value === 1 ? '创建成功' : '修改成功',
					// 	type: 'success',
					// })
					dialogVisible.value = false;
				} catch (e) {
					//TODO handle the exception
				}
				console.log('submit!')
			}
		})
	}

	let options = reactive({
		projectoptions: [],
		optionsType: []
	}); //项目类型，任务类型
	// 工时弹窗自定义规则校验
	const ruleForm = reactive({
		projectvalue: '', //项目名称
		optionsType: '', //任务类型
		Centre: '', //中心
		Datetime: {}, //日期
		type: [],
	})

	const rules = reactive({
		name: [{
				required: true,
				message: 'Please input Activity name',
				trigger: 'blur'
			},
			{
				min: 3,
				max: 5,
				message: 'Length should be 3 to 5',
				trigger: 'blur'
			},
		],
		projectvalue: [{
			required: true,
			message: '请选择项目名称',
			trigger: 'change'
		}],
		optionsType: [{
			required: true,
			message: '请选择任务类型',
			trigger: 'change'
		}],
		Centre: [{
			required: true,
			message: '请选择中心',
			trigger: 'change'
		}]
	})

	watch(calendarValue, (newValue, oldValue) => { // 监听点击日期弹出弹窗
		if (initialization) {
			initialization = false;
			return false;
		};
		let getMonth = newValue.getMonth() + 1; // 当前被点击的额日期
		let getDate = newValue.getDate();
		// 本月日期
		let getMonthbook = new Date().getMonth() + 1;
		if (getMonthbook > getMonth) {
			initialization = true;
			// ElMessageBox.alert(
			// 	'该日期已经过期',
			// 	'警告!!!', {
			// 		confirmButtonText: '确定',
			// 		type: 'warning',
			// 	}
			// )
			calendarValue.value = oldValue;
			return false;
		}
		let isdialogVisible = true;
		// || isDay(newValue)
		if (is_statutory_holiday.includes(getDATE(newValue)) ){ // 判断是否为节假日或者休息日
			let title = isDay(newValue) ? '不可选择休息日为工时' : '不可选择法定节假日为工时'
			// ElMessageBox.alert(
			// 	title,
			// 	'警告!!!', {
			// 		confirmButtonText: '确定',
			// 		type: 'warning',
			// 	}
			// )
			isdialogVisible = false;
		}
		if (isdialogVisible) {
			// dialogVisible.value = true;
			ruleForm.Datetime.Format = getDATE(newValue);
			ruleForm.Datetime.Complet = newValue.getFullYear() + ' 年 ' + getMonth + ' 月 ' + getDate + ' 日';
			// ruleForm.Datetime
		}
		initialization = true;
		calendarValue.value = oldValue;
	})
</script>
<style scoped lang="less">
	.is_statutory {
		color: #A8ABB2 !important;
	}

	.isSelected {
		background: #FCF8E3;
		height: inherit;
	}

	&:deep(.prev) {
		background: #fff !important;

		.el-calendar-day {
			padding: 0;
		}
	}

	&:deep(.next) {
		background: #fff !important;

		.el-calendar-day {
			padding: 0;
		}
	}

	&:deep(.current) {
		background: #fff !important;

		.el-calendar-day {
			padding: 0;
		}
	}

	.isDaydate {
		color: #000;
	}
</style>
