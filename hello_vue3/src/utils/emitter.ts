import mitt from "mitt";

// 调用mitt得到emitter，绑定事件，触发事件
const emitter = mitt()

// emitter.on('abc',(value)=>{
//     console.log('abc事件被触发',value)
//   })
//   emitter.on('xyz',(value)=>{
//     console.log('xyz事件被触发',value)
//   })

//   setInterval(() => {
//     // 触发事件
//     emitter.emit('abc',666)
//     emitter.emit('xyz',777)
//   }, 1000);

//   setTimeout(() => {
//     // 清理事件
//     emitter.all.clear()
//   }, 3000); 

// 暴露emitter
export default emitter