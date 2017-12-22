/**
 * author:无情小寒
 * DateTime:2017-05-20
 */

// 样式表
const cssString = 'html{font-size:100px;}*{padding:0 margin:0;}.Chef_opacity{display:block;background:rgba(0,0,0,0.4);position:fixed;top:0;z-index:99;}.Chef_alert{position:fixed;top:100px;background:white;border-top:3px solid #FF6636;width:260px;padding-bottom:5px;left:50%;margin-left:-130px;z-index:100;font-family:Microsoft YaHei;}.Chef_alert > h2{width:90%;margin:10px auto;margin-bottom:0;font-size:18px;}.Chef_alert > p{width:90%;margin:0 auto;padding:25px 0;border-bottom:1px solid #d8d8d8;}.Chef_alert > div{width:90%;height:60px;margin:0 auto;font-size:0;text-align: center;}.Chef_alert > div > button{width:50%;height:100%;border:0 outline:0;font-size:18px;color:#FE651F;background:white;font-family:Microsoft YaHei;cursor:pointer;}.Chef_X{float:right;font-size:13px;color:grey;cursor:pointer;font-weight:normal;}'

/**
 * 自定义弹窗
 * @param {} cssStyle 0|1 0:comFirmMsg,1:alertMsg
 * @param {} comFirmMsg 确定||取消
 * @param {} alertMsg 确定
 * @param {} openLoding open loading
 */
var messagePromptBox = {
    // 创建样式表
    cssStyle: () => {
        let doc = document;
        let style = doc.createElement('style');
        style.setAttribute('type', 'text/css');
        if (style.styleSheet) { // IE
            style.styleSheet.cssText = cssString;
        } else { // w3c
            let cssText = doc.createTextNode(cssString);
            style.appendChild(cssText);
        }
        let heads = doc.getElementsByTagName('head');
        if (heads.length) {
            heads[0].appendChild(style);
        } else {
            doc.documentElement.appendChild(style);
        }
    },
    /**
     * @param {} isComfirm 控制单双提示
     * @param {} tips 提示信息
     * @param {} btnMsgOk 确定 || 是
     * @param {} btnMsgNo 取消 || 否
     * @param {} funcSuccess 成功事件
     * @param {} funcError 取消事件
     */
    comFirmMsg: (isComfirm, tips, btnMsgOk, btnMsgNo, funcSuccess, funcError) => {
        // 选择加载样式
        messagePromptBox.cssStyle(cssString);
        // 容器
        let tipWinObj = document.createElement('DIV')
        tipWinObj.id = 'MsgBox'
        tipWinObj.style.cssText = 'background-color: #fff;position:fixed;z-index:9999;width:3rem;height:auto;overflow:hidden;background-color:white  border:solid 1px #231234;top:50%;left:50%;margin-top:-30%;margin-left:-1.5rem;border-radius: 5px;transition: all .2s 0s ease-in-out;transform: scale(.8)  opacity:0;'
        let clearDiv = document.createElement('DIV')
        clearDiv.style.cssText = 'clear:both;'
            // 文本
        let contentDiv = document.createElement('DIV')
        contentDiv.style.cssText = 'background-color:#efefef;height:auto;overflow:hidden;line-height:.24rem;padding:.1rem;text-align:center margin:.1rem 0;font-size:.16rem;'
        let btnDiv = document.createElement('DIV')
        btnDiv.style.cssText = 'display: -webkit-flex;-webkit-flex-flow: row;-webkit-align-items: stretch;-webkit-justify-content: space-between;-ms-justify-content: space-between;justify-content: space-between;display: -ms-flex;-ms-flex-flow: row wrap;-ms-align-items: stretch;display: flex;flex-flow: row;align-items: stretch;'
        contentDiv.innerHTML = tips;
        if (isComfirm === 0) {
            // 左按钮
            let okBtn = document.createElement('BUTTON');
            okBtn.style.cssText = 'width: 50%;cursor: pointer;border: 0;border-top: 1px solid #d2cfcf;background: none;display: inline-block;font-size: .16rem;height: .4rem;line-height: .4rem;';
            okBtn.innerHTML = btnMsgOk;
            // 右按钮
            let noBtn = document.createElement('BUTTON');
            noBtn.style.cssText = 'width: 50%;cursor: pointer;border: 0;border-top: 1px solid #d2cfcf;border-right: 1px solid #d2cfcf;background: none;display: inline-block;font-size: .16rem;height: .4rem;line-height:.4rem;';
            noBtn.innerHTML = btnMsgNo;
            btnDiv.appendChild(noBtn);
            btnDiv.appendChild(okBtn);
            // 添加到容器
            tipWinObj.appendChild(contentDiv);
            tipWinObj.appendChild(btnDiv);
            // 获取当前页面的第一个body节点对象,
            let body = document.getElementsByTagName('BODY')[0];
            body.appendChild(tipWinObj);
            // 背景DIV
            let bgObj = document.createElement('DIV');
            bgObj.style.cssText = 'position:fixed;z-index: 9997;top: 0px;left: 0px;background: #000000;filter: alpha(Opacity=30);-moz-opacity:0.30;opacity:0.30;width:100%;height:100%;';
            body.appendChild(bgObj);
            // 开启动画
            messagePromptBox.openLoding(tipWinObj);
            // comFirmMsg: (isComfirm, tips, btnMsgOk, btnMsgNo, funcSuccess, funcError) => {
            okBtn.onclick = () => {
                funcSuccess && funcSuccess();
                body.removeChild(tipWinObj);
                body.removeChild(bgObj);
            }
            noBtn.onclick = () => {
                funcError && funcError();
                body.removeChild(tipWinObj);
                body.removeChild(bgObj);
            }
        } else {
            // 确定按钮
            let okBtn = document.createElement('BUTTON')
            okBtn.style.cssText = 'width: 100%;cursor: pointer;border: 0;border-top: 1px solid #000;background: none ;display: inline-block;font-size: .16rem;height: .4rem;line-height:.4rem;text-align: center;'
            okBtn.innerHTML = btnMsgOk
                // 添加到容器
            tipWinObj.appendChild(contentDiv)
            tipWinObj.appendChild(okBtn)
                // 获取当前页面的第一个body节点对象,
            let body = document.getElementsByTagName('BODY')[0]
            body.appendChild(tipWinObj)
                // 背景DIV
            let bgObj = document.createElement('DIV')
            bgObj.style.cssText = 'position:fixed;z-index: 9997;top: 0px;left: 0px;background: #000000;filter: alpha(Opacity=30);-moz-opacity:0.30;opacity:0.30;'
            bgObj.style.width = '100%'
            bgObj.style.height = '100%'
            body.appendChild(bgObj)
                // 开启动画
            messagePromptBox.openLoding(tipWinObj)
            okBtn.onclick = () => {
                funcSuccess && funcSuccess();
                body.removeChild(tipWinObj)
                body.removeChild(bgObj)
            }
        }
    },

    /**
     * 弹出输入框
     * @param {} isComfirm 控制单双提示
     * @param {} tips 提示信息
     * @param {} btnMsgOk 确定 || 是
     * @param {} btnMsgNo 取消 || 否
     * @param {} funcSuccess 成功事件
     * @param {} funcError 取消事件
     */
    confirmInput: (tips,placeHolder, btnMsgOk, btnMsgNo, funcSuccess, funcError,funcReturn) => {
        // 选择加载样式
        messagePromptBox.cssStyle(cssString);
        // 容器
        let tipWinObj = document.createElement('DIV')
        tipWinObj.id = 'MsgBox'
        tipWinObj.style.cssText = 'background-color: #fff;position:fixed;z-index:9999;width:3rem;height:auto;overflow:hidden;background-color:white  border:solid 1px #231234;top:50%;left:50%;margin-top:-30%;margin-left:-1.5rem;border-radius: 5px;transition: all .2s 0s ease-in-out;transform: scale(.8)  opacity:0;'
        let clearDiv = document.createElement('DIV')
        clearDiv.style.cssText = 'clear:both;'
            // 文本
        let contentDiv = document.createElement('DIV')
        contentDiv.style.cssText = 'height:auto;overflow:hidden;background-color:#e8e7e7;line-height:.24rem;padding:.1rem;text-align:center margin:.1rem 0;font-size:.16rem;'
        let btnDiv = document.createElement('DIV')
        btnDiv.style.cssText = 'display: -webkit-flex;-webkit-flex-flow: row;-webkit-align-items: stretch;-webkit-justify-content: space-between;-ms-justify-content: space-between;justify-content: space-between;display: -ms-flex;-ms-flex-flow: row wrap;-ms-align-items: stretch;display: flex;flex-flow: row;align-items: stretch;'
        contentDiv.innerHTML = tips;
        //输入内容
        let contentForm = document.createElement("DIV");
        contentForm.style.cssText = 'text-align: center;height: .5rem;line-height: 0;position: relative;background-color:#f5f5f5;';
        contentForm.innerHTML = '<input type="text" id="componentInputMsg" placeholder="'+placeHolder+'" style="position: absolute;left: 50%;width: 2rem;height: .2rem;top: 50%;margin-top: -.1rem;margin-left: -1rem;border: 1px solid #cccccc;">';
        // 左按钮
        let okBtn = document.createElement('BUTTON');
        okBtn.style.cssText = 'width: 50%;cursor: pointer;display: inline-block;font-size: .16rem;height: .4rem;line-height: .4rem;border:0;background-color: #dddddd;border-left: 1px solid #f6f6f6;';
        okBtn.innerHTML = btnMsgOk;
        // 右按钮
        let noBtn = document.createElement('BUTTON');
        noBtn.style.cssText = 'width: 50%;cursor: pointer;display: inline-block;font-size: .16rem;height: .4rem;line-height:.4rem;border:0;';
        noBtn.innerHTML = btnMsgNo;
        btnDiv.appendChild(noBtn);
        btnDiv.appendChild(okBtn);
        // 添加到容器
        tipWinObj.appendChild(contentDiv);
        tipWinObj.appendChild(contentForm);
        tipWinObj.appendChild(btnDiv);
        // 获取当前页面的第一个body节点对象,
        let body = document.getElementsByTagName('BODY')[0];
        body.appendChild(tipWinObj);
        // 背景DIV
        let bgObj = document.createElement('DIV');
        bgObj.style.cssText = 'position:fixed;z-index: 9997;top: 0px;left: 0px;background: #000000;filter: alpha(Opacity=30);-moz-opacity:0.30;opacity:0.30;width:100%;height:100%;';
        body.appendChild(bgObj);
        // 开启动画
        messagePromptBox.openLoding(tipWinObj);
        // comFirmMsg: (isComfirm, tips, btnMsgOk, btnMsgNo, funcSuccess, funcError) => {
        okBtn.onclick = () => {
            funcSuccess && funcSuccess();
            funcReturn($("#componentInputMsg").val());
            body.removeChild(tipWinObj);
            body.removeChild(bgObj);
        }
        noBtn.onclick = () => {
            funcError && funcError();
            body.removeChild(tipWinObj);
            body.removeChild(bgObj);
        }
    },

    /**
     * 弱提示
     * @param {} times 时间自动关闭
     * @param {} tips 提示信息
     * */
    tipMsgBox: (tips, time) => {
        let times = time || 3000;
        let tipWinObj = document.createElement('DIV')
        tipWinObj.id = 'MsgBox'
        tipWinObj.style.cssText = 'position: fixed;z-index: 9999;width: 2rem;height: auto;overflow: hidden;top: 50%;left: 50%; margin-top: -30%;margin-left: -1rem;border-radius: 5px;color: #ffffff;background: rgba(0,0,0,.7);transition: all .2s 0s ease-in-out;transform: scale(.8);opacity:0;'
        let clearDiv = document.createElement('DIV')
        clearDiv.style.cssText = 'clear:both;'
            // 文本
        let contentDiv = document.createElement('DIV')
        contentDiv.style.cssText = 'height:auto;overflow:hidden;line-height:.24rem;padding:.1rem;text-align:center;margin:.1rem 0;font-size:.16rem;color: #fff;'
        contentDiv.innerHTML = tips
            // 添加到容器
        tipWinObj.appendChild(contentDiv)
            // 获取当前页面的第一个body节点对象,
        let body = document.getElementsByTagName('BODY')[0]
        body.appendChild(tipWinObj)
            // 开启动画
        messagePromptBox.openLoding(tipWinObj)
            // 定时关闭
        setTimeout(() => {
            body.removeChild(tipWinObj)
            tipWinObj.style.opacity = 0
            tipWinObj.style.transform = 'scale(.8)'
        }, times)
    },
    // 开启动画
    openLoding: (tipWinObj) => {
        setTimeout(() => {
            tipWinObj.style.transform = 'scale(1)'
            tipWinObj.style.opacity = 1
        }, 100)
    }
}

module.exports = messagePromptBox;