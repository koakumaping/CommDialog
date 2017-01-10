## ju-dialog
### 用法 ###
1. 在html中引入`cDialog.js`和`cDialog.css`  
2. 调用函数

一共有三种模式  
分别对应不同的显示方式  

#### dialog
显示`title`跟`content`, 没有按钮  
```javascript
    new cDialog('dialog', {
        title: 'Hello',
        content: 'Are you sure to continue?',
    });
```

#### alert
显示`title`跟`content`, 只有`confirm`按钮  

```javascript
    new cDialog('alert', {
        title: 'Hello',
        content: 'Are you sure to continue?',
        onConfirm: function () {
            new cDialog('alert')
        }
    })
```

#### confirm
显示`title`, `content`, `confirm`以及`cannel`按钮  
```javascript
    new cDialog('confirm', {
        title: 'Hello',
        content: 'Are you sure to continue?',
    });
```


### 设置
`title`: 标题,可以为空  
`content`: 主体内容,可以为空  
`opacity`: 遮罩层透明度,默认为`0.2`  
`confirmButton`: 确定按钮文字,默认为`Okay`, 英文会全部呈现为大写  
`cancelButton`: 取消按钮文字,默认为`Close`, 英文会全部呈现为大写  
`theme`: 主题,默认为`white`,暂时只有一个主题,后续会增加  
`animation`: 弹窗动画效果, 默认为`zoom`,暂时只有一个动画效果,后续会增加  
`container`: 弹窗插入的主体,默认为`body`  
`backgroundClose`: 点击遮罩层关闭弹窗,默认为`false`  
`backgroundCloseAnimation`: 点击遮罩层关闭弹窗时的提示动画,`backgroundClose`为`false`的时候出现,默认为`shark`,暂时只有一个动画效果,后续会增加  
`autoClose`: 自动关闭时间,默认为`0`,单位`ms`  

### 回调
`onConfirm`: 点击`confirm`按钮后触发  
`onCancel`: 点击`cannel`按钮后触发  
