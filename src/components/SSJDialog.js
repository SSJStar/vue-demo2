// // import SubDialog from './SubDialog.vue'
// import SSJDialog from "@/components/SSJDialog" //弹窗
// import { createApp } from 'vue'
//
// let mountNode
// let createMount = (opts) => {
//     if(mountNode){//确保只存在一个弹框
//         document.body.removeChild(mountNode)
//         mountNode = null
//     }
//     mountNode = document.createElement('div')
//     document.body.appendChild(mountNode)
//     const app = createApp(SSJDialog, {
//         ...opts,
//         modelValue: true,
//         remove() { //传入remove函数，组件内可移除dom 组件内通过props接收
//             app.unmount(mountNode)
//             document.body.removeChild(mountNode)
//         }
//     })
//     return app.mount(mountNode)
// }
// function V3Popup(options = {}) {
//     options.id = options.id || 'v3popup_' + 1 //唯一id 删除组件时用于定位
//     let $inst = createMount(options)
//     return $inst
// }
// V3Popup.install = app => {
//     app.component('v3-popup', SSJDialog)
//     app.config.globalProperties.$subDialog = V3Popup
//     // app.provide('subDialog', V3Popup)
// }
// export default V3Popup
