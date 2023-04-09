<!-- eslint-disable vue/no-v-model-argument -->
<!-- eslint-disable no-mixed-spaces-and-tabs -->
<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<div id="title" style="height: 40px; width: auto; background-color: #fbfbfb; ">
		<img id="icon" src="../../img/搜索.png">
		<span style="font-weight:100;font-size: 14px;">竞品户型缩略图查询</span>
	</div>
	<div class="box">
		<div id="box-conet">
			<div class="tops">
				<el-form style="display: flex; margin-top: 5px;">
					<el-form-item label="项目地点" style="margin-right: 15px;margin-left: 15px;">
						<el-input v-model="formData.xmdd" placeholder="" @blur="blur"/>
						<!-- <el-select v-model="formData.dw" placeholder=" " clearable filterable multiple @change="changes">
							<el-option v-for="(item,index) in publicer.location"  :key="index" :label="item.name"
								:value="item.id" />
						</el-select> -->
					</el-form-item>
					<el-form-item label="开发商名称" style="margin-right: 15px;">
						<el-input v-model="formData.kfsmc" placeholder="" @blur="blur" />
						<!-- <el-select v-model="formData.cs" placeholder=" " clearable filterable multiple @change="changes">
					  <el-option v-for="(item,index) in publicer.layers" :key="index" :label="item.name"
								:value="item.id" />
						</el-select> -->
					</el-form-item>
					<el-form-item label="均价" style="margin-right: 15px;">
						<el-input v-model="formData.jj" placeholder="" @blur="blur" />
						<!-- <el-select v-model="formData.tx" placeholder=" " clearable filterable multiple @change="changes">
					  <el-option v-for="(item,index) in publicer.jacketed" :key="index" :label="item.name"
								:value="item.id" />
						</el-select> -->
					</el-form-item>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
					<el-form-item label="所在项目" style="margin-right: 15px;">
						<el-input v-model="formData.szxm" placeholder="" @blur="blur"/>
						<!-- <el-select v-model="formData.szxm" placeholder=" " clearable filterable multiple @change="changes">
					  <el-option v-for="(item,index) in publicer.szxmlist" :key="index" :label="item.mainTable.xmmc"
								:value="item.mainTable.id" />
						</el-select> -->
					</el-form-item>
					<el-form-item label="面积段" style="margin-right: 15px;">
						<el-select v-model="formData.mjd" placeholder=" " clearable filterable multiple @change="changes">
							<el-option v-for="(item,index) in publicer.screen" :key="index" :label="item.name"
								:value="item.id" />
						</el-select>
					</el-form-item>
				</el-form>
				<div style="display: flex;flex-wrap: wrap;  width: auto; height: auto;" class="box-content">
					 <div v-for="(itmer,index) in publicer.result" :key="index" @click="submit(itmer.mainTable.id)" style="margin: 10px 1.5vw; border-radius: 4px;overflow: hidden;border: 1px solid #ebebeb; width: 30%; height: auto;"><!--margin-left: 10px;margin-bottom: 10px;padding-bottom: 15px; -->
						 <div><img :src="itmer.mainTable?itmer.mainTable.cftpurl:''" /></div>
						
						<div style="margin: 15px 0;">
							<h3 style="font-weight: 600;margin-left: 1vw;font-size: 1.5vw;">{{itmer.mainTable?itmer.mainTable.hxbh:''}}</h3>
							<div style="display: flex;">
								<div style="margin-left: 1vw;">
									<div style="white-space: nowrap;width: 70px;font-size: 1vw;">定位:</div>
								</div>
								<div>
									<p style="margin-left: 15px;font-size: 1vw;">{{itmer.mainTable?itmer.mainTable.dw:''}}</p>
								</div>
							</div>
							<div style="display: flex;">
								<div style="margin-left: 1vw;">
									<div style="white-space: nowrap;width: 70px;font-size: 1vw;">面积段:</div>
								</div>
								<div>
									<p style="margin-left: 15px;font-size: 1vw;">{{itmer.mainTable?itmer.mainTable.mjd:''}}</p>
								</div>
							</div>
							<div style="display: flex;">
								<div style="margin-left: 1vw;">
									<div style="white-space: nowrap;width: 70px;font-size: 1vw;">套型:</div>
								</div>
								<div>
									<el-tooltip class="item" effect="dark" :content="itmer.mainTable?itmer.mainTable.taoxing:''" placement="right">
									  <p style="margin-left: 15px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width: 21vw;font-size: 1vw;">{{itmer.mainTable?itmer.mainTable.taoxing:''}}</p>    
									</el-tooltip>
								</div>
							</div>
							<div style="display: flex;">
								<div style="margin-left: 1vw;">
									<div style="white-space: nowrap;width: 70px;font-size: 1vw;">所在项目:</div>
								</div>
								<div>
									<el-tooltip class="item" effect="dark" :content="itmer.mainTable?itmer.mainTable.szxm:''" placement="right">
									  <p style="margin-left: 15px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width: 21vw;font-size: 1vw;">{{itmer.mainTable?itmer.mainTable.szxm:''}}</p>    
									</el-tooltip>
								</div>
							</div>
							<!-- <div style="display: flex;">
								<div style="margin-left: 15px;">
									<div style="white-space: nowrap;width: 70px;">详细页</div>
								</div>
								<div>
									  <p style="cursor:pointer;" class="cloryty">{{itmer.mainTable?itmer.mainTable.jrxxy:''}}</p>    
								</div>
							</div> -->
							
 
						</div>

					</div>
				</div>
				<!--  分页  -->
				<div class="example-pagination-block" style="margin-left: 10px;">
					<el-pagination v-model:currentPage="formData.page" background v-model:page-size="formData.size"
						:page-sizes="[9, 18, 27 ,36,45,54,63,72,81]" layout="sizes, prev, pager, next" :total="parseFloat(count)"
						@size-change="sizeGetListData" @current-change="pageGetListData" />
				</div>
			</div>
		</div>
		<!-- 数据表格 -->
	</div>

</template>

<script setup>
	import md5 from 'js-md5';
	import {
		ref,
		onMounted
	} from 'vue'

	import {
		getjpk,
		getszxm,
		getjpktotal
	} from "@/api/public";
	//表单相应参数
	const publicer  = ref({
		szxmlist:[],
	
		screen: [{
				id: '',
				name: '全选'
			},{
				id: 0,
				name: '90m²'
			},
			{
				id: 1,
				name: '90-100m²'
			},
			{
				id: 2,
				name: '100-120m²'
			},
			{
				id: 3,
				name: '120-130m²'
			},
			{
				id: 4,
				name: '130-140m²'
			},
			{
				id: 5,
				name: '140-150m²'
			},
			{
				id: 6,
				name: '150-160m²'
			},
			{
				id: 7,
				name: '160m²以上'
			}
		],
		location: [{
				id: '',
				name: '全选'
			},{
				id: 0,
				name: 'A标'
			},
			{
				id: 1,
				name: 'B标'
			},
			{
				id: 2,
				name: 'C标'
			},
		],
		layers: [{
				id: '',
				name: '全选'
			},{
				id: 0,
				name: '高层'
			},
			{
				id: 1,
				name: '小高层'
			},
			{
				id: 2,
				name: '多层'
			},
		],
		jacketed: [{
				id: '',
				name: '全选'
			},{
				id: 0,
				name: '2室2厅1卫'
			},
			{
				id: 1,
				name: '2室2厅2卫'
			},
			{
				id: 2,
				name: '3室2厅2卫'
			},
			{
				id: 3,
				name: '3室2厅3卫'
			},
			{
				id: 4,
				name: '4室2厅2卫'
			},
			{
				id: 5,
				name: '4室2厅3卫'
			},
			{
				id: 6,
				name: '4室2厅4卫'
			},
		]
	})

	const formData = ref({
		id:"",
		xmdd:"",
		kfsmc:"",
		jj:"",
		min:"",
		max:"",
		szxm:"",
		mjd:"",
		page: 1, //分页
		size: 9 //分页大小
	})
	var url = window.location.href ; 
	formData.value.id = url.split("=")[1];
	
	let count = ref(null)

	//页面加载时
	let setTime =  () => {
		const time = new Date();
		const Y = time.getFullYear()
		const M = (time.getMonth() + 1).toString().padStart(2, '0')
		const D = time.getDate().toString().padStart(2, '0')
		const h = time.getHours().toString().padStart(2, '0')
		const m = time.getMinutes().toString().padStart(2, '0')
		const s = time.getSeconds().toString().padStart(2, '0')
		return `${Y}${M}${D}${h}${m}${s}`
	}
	
	onMounted(() => {
		//获取数据
		getjpklist()
		gettotal()
		getSzxm()
	})

	
	//获取列表
	let getjpklist = async () => {
		try {
			// let cs="",dw='',tx='',mjd='',szxm='';
			let mjd='';
			// if(formData.value.cs){
			// 	if (formData.value.cs.length == 1) {
			// 		cs = formData.value.cs[0]
			// 	} else {
			// 		formData.value.cs.forEach((ac, index) => {
			// 			if (formData.value.cs.length - 1 === index) {
			// 				cs = cs + ',' + ac
			// 			} else {
			// 				if (index === 0) {
			// 					cs = ac
			// 				} else {
			// 					cs = cs + ',' + ac
			// 				}
				
			// 			}
			// 		})
			// 	}
			// }
			// if(formData.value.dw){
			// 	if (formData.value.dw.length == 1) {
			// 		dw = formData.value.dw[0]
			// 	} else {
			// 		formData.value.dw.forEach((ac, index) => {
			// 			if (formData.value.dw.length - 1 === index) {
			// 				dw = dw + ',' + ac
			// 			} else {
			// 				if (index === 0) {
			// 					dw = ac
			// 				} else {
			// 					dw = dw + ',' + ac
			// 				}
				
			// 			}
			// 		})
			// 	}
			// }
			// if(formData.value.tx){
			// 	if (formData.value.tx.length == 1) {
			// 		tx = formData.value.tx[0]
			// 	} else {
			// 		formData.value.tx.forEach((ac, index) => {
			// 			if (formData.value.tx.length - 1 === index) {
			// 				tx = tx + ',' + ac
			// 			} else {
			// 				if (index === 0) {
			// 					tx = ac
			// 				} else {
			// 					tx = tx + ',' + ac
			// 				}
				
			// 			}
			// 		})
			// 	}
			// }
			if(formData.value.mjd){
				if (formData.value.mjd.length == 1) {
					mjd = formData.value.mjd[0]
				} else {
					formData.value.mjd.forEach((ac, index) => {
						if (formData.value.mjd.length - 1 === index) {
							mjd = mjd + ',' + ac
						} else {
							if (index === 0) {
								mjd = ac
							} else {
								mjd = mjd + ',' + ac
							}
				
						}
					})
				}
			}
			// if(formData.value.szxm){
			// 	if (formData.value.szxm.length == 1) {
			// 		mjd = formData.value.szxm[0]
			// 	} else {
			// 		formData.value.szxm.forEach((ac, index) => {
			// 			if (formData.value.szxm.length - 1 === index) {
			// 				szxm = szxm + ',' + ac
			// 			} else {
			// 				if (index === 0) {
			// 					szxm = ac
			// 				} else {
			// 					szxm = szxm + ',' + ac
			// 				}
				
			// 			}
			// 		})
			// 	}
			// }
			let res = await getjpk(JSON.stringify({
				"operationinfo": {
					"operator": formData.value.id
				},
				"mainTable": {
					"xmdd":formData.value.xmdd,
					"kfsmingche":formData.value.kfsmc,
					"mjd":mjd,
					"szxm":formData.value.szxm,
					"tjsh":1,
					"zxz":formData.value.min,
					"zdz":formData.value.max
				},
				"pageInfo": {
					// "pageNo": formData.value.page,
					"pageNo": 1,
					// "pageSize": formData.value.size
					"pageSize": 999999999
				},
				"header": {
					"systemid": "jpk",
					"currentDateTime": setTime(),
					"Md5": md5("jpk"+123+setTime())
				}
			})); 
			// if(res.result){
			// 	publicer.value.result = eval("(" +  res.result + ")")
			// }
			let data = [];
			let newdata = [];
			let enddata = [];
			let pageLen = 0;
			let pageSize = 0;
			if(res.result){
				data = eval("(" +  res.result + ")")
				for(let i=data.length-1;i>=0;i--){
					newdata.push(data[i]);
				}
			}	
			if(formData.value.page != 1){
				pageLen = (formData.value.size * formData.value.page) - formData.value.size;
			}
			if(data.length >= formData.value.page * formData.value.size){
				pageSize = (formData.value.page * formData.value.size)-1;
			}else{
				pageSize = data.length-1;
			}
			for(let j=pageLen;j<=pageSize;j++){
				enddata.push(newdata[j]);
			}
			publicer.value.result=enddata;
			} catch (e) {
				console.log(e)
				//TODO handle the exception
			}
			
	}

	
	let getSzxm = async () => {
		try {
			let szxm = await getszxm(JSON.stringify({
				"operationinfo":{
					"operator":"1"
					},
					"mainTable":{},
					"pageInfo":{
						"pageNo":"1",
						"pageSize":"1000"
					},
					"header":{
						"systemid":"getProject",
						"currentDateTime":setTime(),
						"Md5":md5("getProject"+123+setTime())
					}
			})); 
			if(szxm.result){
				// publicer.value.result = eval("(" +  szxm.result + ")")
				publicer.value.szxmlist = eval("(" +  szxm.result + ")")
			}
		} catch (e) {
				console.log(e)
				//TODO handle the exception
		}
		
	}

	
	
	let gettotal = async () => {
		try {
			// let cs="",dw='',tx='',mjd='',szxm='';
			let mjd='';
			// if(formData.value.cs){
			// 	if (formData.value.cs.length == 1) {
			// 		cs = formData.value.cs[0]
			// 	} else {
			// 		formData.value.cs.forEach((ac, index) => {
			// 			if (formData.value.cs.length - 1 === index) {
			// 				cs = cs + ',' + ac
			// 			} else {
			// 				if (index === 0) {
			// 					cs = ac
			// 				} else {
			// 					cs = cs + ',' + ac
			// 				}
				
			// 			}
			// 		})
			// 	}
			// }
			// if(formData.value.dw){
			// 	if (formData.value.dw.length == 1) {
			// 		dw = formData.value.dw[0]
			// 	} else {
			// 		formData.value.dw.forEach((ac, index) => {
			// 			if (formData.value.dw.length - 1 === index) {
			// 				dw = dw + ',' + ac
			// 			} else {
			// 				if (index === 0) {
			// 					dw = ac
			// 				} else {
			// 					dw = dw + ',' + ac
			// 				}
				
			// 			}
			// 		})
			// 	}
			// }
			// if(formData.value.tx){
			// 	if (formData.value.tx.length == 1) {
			// 		tx = formData.value.tx[0]
			// 	} else {
			// 		formData.value.tx.forEach((ac, index) => {
			// 			if (formData.value.tx.length - 1 === index) {
			// 				tx = tx + ',' + ac
			// 			} else {
			// 				if (index === 0) {
			// 					tx = ac
			// 				} else {
			// 					tx = tx + ',' + ac
			// 				}
				
			// 			}
			// 		})
			// 	}
			// }
			if(formData.value.mjd){
				if (formData.value.mjd.length == 1) {
					mjd = formData.value.mjd[0]
				} else {
					formData.value.mjd.forEach((ac, index) => {
						if (formData.value.mjd.length - 1 === index) {
							mjd = mjd + ',' + ac
						} else {
							if (index === 0) {
								mjd = ac
							} else {
								mjd = mjd + ',' + ac
							}
				
						}
					})
				}
			}
			// if(formData.value.szxm){
			// 	if (formData.value.szxm.length == 1) {
			// 		mjd = formData.value.szxm[0]
			// 	} else {
			// 		formData.value.szxm.forEach((ac, index) => {
			// 			if (formData.value.szxm.length - 1 === index) {
			// 				szxm = szxm + ',' + ac
			// 			} else {
			// 				if (index === 0) {
			// 					szxm = ac
			// 				} else {
			// 					szxm = szxm + ',' + ac
			// 				}
				
			// 			}
			// 		})
			// 	}
			// }
			let jpktotal = await getjpktotal(JSON.stringify({
				"operationinfo":{
					"operator":formData.value.id
				},
				"mainTable":{
					"xmdd":formData.value.xmdd,
					"kfsmingche":formData.value.kfsmc,
					"jj":formData.value.jj,
					"mjd":mjd,
					"szxm":formData.value.szxm,
					"tjsh":1
				},
				"header":{
					"systemid":"jpkTotal",
					"currentDateTime":setTime(),
					"Md5":md5("jpkTotal"+"123"+setTime())
				}
			})); 
		
				count.value = eval("(" +  jpktotal.result + ")").pageCount
			} catch (e) {
				console.log(e)
				//TODO handle the exception
			}
			
	}
	//获取列表
	let changes = async () => {
		getjpklist(),
		gettotal()
	}
	let blur = async () => {
		getjpklist(),
		gettotal()
	}
	//分页请求列表接口
	let pageGetListData = (page) => {
		formData.value.page = page
		getjpklist()
	}
	let sizeGetListData = (size) => {
		formData.value.size = size
		getjpklist()
	}
	let submit = (id) =>{
		let url = "https://oa.siud.com/spa/cube/index.html#/main/cube/card?type=0&modeId=4921&formId=-692&billid="+id
		window.open(url);
	}


</script>
<style scoped lang="less">
.box {
		// display: flex;

		// justify-content: center;
	}

	#title{
		line-height:40px;
		#icon{
			margin-top: 4px;
			margin-left: 12px;
			width: 30px;
			height: 30px;
		}
		span{
			margin-left: 10px;
			
		}
	}
	
	


	#box-conet {
		width: auto;

	}

	// @media screen and (min-width: 1441px) {
	// 	#box-conet {
	// 		width: 1000px;
	// 		width: auto;
	// 		border: 1px solid blue;
	// 	}
	// }

	.box-content {
		img {
			margin: 0 0;
			width: 100%;
			height: 16vw;
		}
	}


	.tops {
		//  border: 1px solid #dfdfdf;
		font-size: 12px;
	}

	.location {
		position: relative;

		.location-box {
			position: absolute;
			top: 36px;
			box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
			border-radius: 4px;
			padding: 5px 16px;
			background: var(--el-bg-color-overlay);
			border: 1px solid var(--el-border-color-light);
			width: 300px;
		}
	}

	.el-form-item {
		align-items: center;
	}
	.cloryty:hover{
		color: rgb(64, 158, 255);
	}


	
</style>
