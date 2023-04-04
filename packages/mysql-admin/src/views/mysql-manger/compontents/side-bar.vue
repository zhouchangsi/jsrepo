<script>
import { barData } from "./side-bar-config.js";
export default {
    name: "sideBar",
    data() {
        return {
            state: {
                isCollapsed: true,
                curRouterPath: "/mysql-manager/home",
            },
            barData: barData,
        };
    },
    methods: {
        collapse: function () {
            this.state.isCollapsed = !this.state.isCollapsed;
            let sideBar = this.$refs.sideBar;
            let folder = document.querySelector(".icon.folder");
            let label = document.querySelector(".item > i");

            let sideBarWidth = 45;
            let btnFolderAngle = 0;
            if (this.state.isCollapsed) {
                sideBarWidth = 240;
                btnFolderAngle = 0;
                label.style.display = "normal";
            } else {
                sideBarWidth = 45;
                btnFolderAngle = 180;
                label.style.display = "hidden";
            }
            sideBar.style.width = `${sideBarWidth}px`;
            this.routateBtnFolder(folder, btnFolderAngle);
        },
        routateBtnFolder: function (dom, angle) {
            let keyFrames = [{}, { transform: `rotateZ(${angle}deg)` }];
            let option = {
                duration: 300,
                ease: "ease-in-out",
                fill: "forwards",
            };
            dom.animate(keyFrames, option);
        },
        handleMenuClick: function (path) {
            if (path !== this.state.curRouterPath) {
                this.$router.push(path);
                this.state.curRouterPath = path;
            }
        },
    },
};
</script>

<template>
    <div class="side-bar" ref="sideBar">
        <!--      barData-->
        <!--      handleMenuClick()-->
        <div
            class="item"
            @click="handleMenuClick(item.path)"
            v-for="item in barData"
            :key="item"
        >
            <el-icon class="icon" size="20px" v-html="item.icon"></el-icon>
            <i>{{ item.label }}</i>
        </div>

        <!--    state.isCollapsed, collapse()-->
        <div class="item" @click="collapse">
            <el-icon class="icon folder" ref="folder" size="20px"
                ><d-arrow-right
            /></el-icon>
            <i>收起菜单</i>
        </div>
    </div>
</template>

<style scoped>
.side-bar {
    width: 240px;
    height: 100%;
    background-color: #34495d;
    transition: 300ms ease-in-out;
    overflow: auto;
}

.side-bar > .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    cursor: pointer;
    transition: 100ms ease-in-out;
    color: white;
}

.side-bar > .item:hover {
    transition: 100ms ease-in-out;
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.1);
}

.side-bar > .item > .icon {
    position: absolute;
    left: 10px;
}

.side-bar > .item > i {
    position: relative;
    left: 50px;
}
</style>
