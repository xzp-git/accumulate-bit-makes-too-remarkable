## 防抖函数

```js
const debounce = (func, wait, immediate = false, callback = () => {}) => {
    let timer = null //定时器
    let immediateInvoked = false //是否已经被立即调用
    const debounced = (...args) => {
        return new Promise((resolve, reject) => {
            if(timer){
               clearTimeout(timer)
               timer = null
            }
            if(immediate && !immediateInvoked){
                 try{
				   let result = func.apply(this, args)
               		callback(null, result)
                     resolve(result)
                 }catch(error){
				   callback(error)
                     reject(error)
                 }
                immediateInvoked = true
            }
            timer = setTimeout(() => {
                try{
				   let result = func.apply(this, args)
               		callback(null, result)
                     resolve(result)
                 }catch(error){
				   callback(error)
                     reject(error)
                 }
                immediateInvoked = false
            }, wait)
        })
    }   
    
    debounced.cancel = () => {
        if(timer){
           clearTimeout(timer)
           timer = null
        }
    }
    return debounced
}
```



