## 1.防抖函数

- 参数介绍
  - 参数1 `func`  需要防抖的函数
  - 参数2 `wait` 间隔多长时间触发算是频繁出发
  - 参数3 `immediate` 是否要立即执行
  - 参数5 `callback` 执行 `func` 后的回调函数 
- 函数介绍
  - `debounce()` 返回一个函数 `debounced`
  - 第一次调用 `debounced` 如果 `immediate` 为 `true` 并且没有被立即调用过

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

## 3. call函数实现

```js
Function.prototype.call = function call(context, ...args){
    let targetFn = this
    let ctx = context || window
    let func = Symbol()
    ctx[func] = targetFn
    let result = ctx[func](...args)
    delete ctx[func]
    return result
}
```

## 4. apply函数的实现

```js
Function.prototype.call = function call(context, args){
    let targetFn = this
    let ctx = context || window
    let func = Symbol()
    ctx[func] = targetFn
    let result = ctx[func](...args)
    delete ctx[func]
    return result
}
```

## 5. bind函数的实现

```js
Function.prototype.bind = function bind(context, ...args){
    let targetFn = this
    return function newFn(...newFnArgs){
        if(this instanceof newFn){
        	return new targetFn(...args, ...newFnArgs)
        }
        return targetFn.apply(context, [...args, ...newFnArgs])
    }
}
```

## 6. 寄生组合式继承

```js
function Person1 (obj) {
    this.name = obj.name
    this.age = obj.age
}

Person1.prototype.play = function(){
    console.log('play')
}
let p1 = new Person1({name: "zhangsna", age: 18})

function Person2(obj){
    Person1.call(this, obj)
    this.sex = obj.sex
}
Person2.prototype = Object.create(Person1.prototype)
Person2.prototype.constructor = Person2
Person2.prototype.eat = function(){
    console.log("eat")
}
let p2 = new Person2({name: "lisi", age: 18, sex: "男"})
```

