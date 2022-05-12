## 1.防抖函数

- 参数1 `func`  需要防抖的函数
- 参数2 `wait` 间隔多长时间触发算是频繁出发
- 参数3 `immediate` 是否要立即执行
- 参数5 `callback` 执行 `func` 后的回调函数  

```js
const debounce = (func, wait, immediate = false, callback = () => {}) => {
  let timer = null; //定时器
  let immediateInvoked = false; //是否已经被立即调用
  const debounced = (...args) => {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (immediate && !immediateInvoked) {
        try {
          let result = func.apply(this, args);
          callback(null, result);
          resolve(result);
        } catch (error) {
          callback(error);
          reject(error);
        }
        immediateInvoked = true;
      }
      timer = setTimeout(() => {
        try {
          let result = func.apply(this, args);
          callback(null, result);
          resolve(result);
        } catch (error) {
          callback(error);
          reject(error);
        }
        immediateInvoked = false;
      }, wait);
    });
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced;
};
```

## 2.节流函数

```js
const throttle = (func, wait, options = {leading: true, trailing: true, callback: () => {}}) => {
    const {leading, trailing, callback} = options
    let lastExecTime = 0
    let timer = null
    const throttled = (...args) => {
		return new Promise((resolve, reject) => {
         	const currentTime = Date.now()
            if(lastExecTime === 0 && !leading){
               lastExecTime = currentTime
            }
            let nextExecTime = lastExecTime + wait
            if(currentTime >= nextExecTime){
                if(timer){
                   clearTimeout(timer)
                    timer = null
                 }
               try{
                   let result = func.apply(this, args)
                   callback(null, result)
                   resolve(result)
               }catch(error){
                   callback(error)
                   reject(error)
               }
                lastExecTime = currentTime
            }else{
                if(trailing){
                    if(timer){
                       clearTimeout(timer)
                        timer = null
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
                       lastExecTime = Date.now()
                   }, nextExecTime - currentTime)
                }
            }
        })        
    }
   	throttled.cancel = () => {
   		if(timer){
           clearTimeout(timer)
            timer = null
         }
    }
    return throttled
}
```

