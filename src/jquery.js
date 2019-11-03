window.$ = window.jQuery = function (selectorORArray) {
    let elements
    if (typeof selectorORArray === 'string') {
        elements = document.querySelectorAll(selectorORArray)
    } else if (selectorORArray instanceof Array) {
        elements = selectorORArray
    }
    // 创建api对象,他的原型为jQuery.prototype
    let api = Object.create(jQuery.prototype)
    this.Object.assign(api, {
        elements: elements,
        oldApi: selectorORArray.oldApi
    })
    // 返回api,方便链式操作
    return api
}

//下面的写法,由于每个jQuery对象都会创建相同功能的函数,很浪费内存,所以可以将函数写到原型上
jQuery.prototype = {
    constructor: jQuery,
    jQuery: true,
    // 1.遍历DOM对象
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
    },
    //2.为DOM对象增加类
    addClass(className) {
        // 闭包,因为本函数用到了外面函数的变量elements,elements不会被回收
        // for (let i = 0; i < elements.length; i++) {
        //     elements[i].classList.add(className)
        // }
        this.each((node) => {
            node.classList.add(className)
        })
        return this // api
    },
    //3.找到含有该选择器的所有DOM对象
    // 比如: jQuery('.test).find('.child')
    // 此时操作的是.text .child的DOM元素的集合,所以要把elements值修改为集合的值
    find(selector) {
        let array = []
        array.oldApi = this
        this.each((node) => {
            array.push(...node.querySelectorAll(selector))
        })
        return jQuery(array)
    },
    //4.回到上一个jQuery对象
    end() {
        if (this.oldApi) {
            return this.oldApi
        } else {
            return this
        }
    },
    parent() {
        let array = []
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },
    children() {
        let array = []
        this.each((node) => {
            array.push(...node.children)
        })
        return jQuery(array)
    },
}




// window.jQuery = function (selectorORArray) {
//     let elements
//     if (typeof selectorORArray === 'string') {
//         elements = document.querySelectorAll(selectorORArray)
//     } else if (selectorORArray instanceof Array) {
//         elements = selectorORArray
//     }
//     // 返回api,方便链式操作
//     return {
//         // 1.遍历DOM对象
//         each(fn) {
//             for (let i = 0; i < elements.length; i++) {
//                 fn.call(null, elements[i], i)
//             }
//         },
//         //2.为DOM对象增加类
//         addClass(className) {
//             // 闭包,因为本函数用到了外面函数的变量elements,elements不会被回收
//             // for (let i = 0; i < elements.length; i++) {
//             //     elements[i].classList.add(className)
//             // }
//             this.each((node) => {
//                 node.classList.add(className)
//             })
//             return this // api
//         },
//         //3.找到含有该选择器的所有DOM对象
//         // 比如: jQuery('.test).find('.child')
//         // 此时操作的是.text .child的DOM元素的集合,所以要把elements值修改为集合的值
//         find(selector) {
//             let array = []
//             array.oldApi = this
//             this.each((node) => {
//                 array.push(...node.querySelectorAll(selector))
//             })
//             return jQuery(array)
//         },
//         //4.回到上一个jQuery对象
//         end() {
//             if (this.oldApi) {
//                 return this.oldApi
//             } else {
//                 return this
//             }
//         },
//         parent() {
//             let array = []
//             this.each((node) => {
//                 if (array.indexOf(node.parentNode) === -1) {
//                     array.push(node.parentNode)
//                 }
//             })
//             return jQuery(array)
//         },
//         children() {
//             let array = []
//             this.each((node) => {
//                 array.push(...node.children)
//             })
//             return jQuery(array)
//         },
//         oldApi: selectorORArray.oldApi
//     }
// }

