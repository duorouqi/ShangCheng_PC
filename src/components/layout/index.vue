<template>
    <div class="layout">
        <!-- <div class="headerTop">
            <div class="logo">TimeSheet</div>
        </div> -->
        <div class="bottomContent">
            <!-- <div class="navBox">
                <navBar></navBar>
            </div> -->
            <div class="content">
                <div class="scrollBox">
                    <div class="scrollContent">
                        <router-view></router-view>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import navBar from './navBar'
import breadcrumb from './breadcrumb'

const navList = ref([
    {
        name: '你好',
        url: '/'
    }
])
</script>

<style scoped lang="less">
.layout {
    height: 100%;
	background: #FFF;
}

.headerTop {
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .logo {
        height: 70px;
        width: 200px;
        font-size: 24px;
        text-align: center;
        line-height: 70px;
        color: #ffffff;
        background: rgba(0, 44, 77);
    }

    .right {
        height: 100%;
        box-sizing: border-box;
        padding: 0 24px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 1;

        .userInfo {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #333;

            /deep/ .el-avatar {
                margin-right: 10px;
            }
        }
    }
}

.bottomContent {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    // padding-top: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .navBox {
        height: 100%;
        width: 200px;
        overflow: hidden;
        background: rgba(0, 21, 41);
        color: #ffffff;
    }

    .content {
        overflow: hidden;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        height: 100%;
        background: rgba(240, 242, 245, 1);

        .scrollBox {
            width: 100%;
            // padding: 24px;
            box-sizing: border-box;
            flex: 1;
            overflow-y: auto;
			background: #FFF;

            .scrollContent {
				background: #FFF;
                // padding: 24px;
                // box-sizing: border-box;
                // background: #ffffff;
                // height: 100%;
                // overflow-y: auto;
                // box-shadow: 0 5px 5px #aaa;
            }
        }

    }
}
</style>

