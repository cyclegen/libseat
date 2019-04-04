/*
* author: www.somethingwhat.com
*/

import touch from 'touchjs'

var cat = window.cat || {};
cat.touchjs = {
    left: 0,
    top: 0,
    scaleVal: 1,   //缩放
    curStatus: 0,   //记录当前手势的状态, 0:拖动, 1:缩放
    //初始化
    init: function ($targetObj, callback) {
        touch.on($targetObj, 'touchstart', function (ev) {
            cat.touchjs.curStatus = 0;
            // ev.preventDefault();//阻止默认事件
        });
        if (!window.localStorage.cat_touchjs_data)
            callback(0, 0, 1);
        else {
            var jsonObj = JSON.parse(window.localStorage.cat_touchjs_data);
            cat.touchjs.left = parseFloat(jsonObj.left), cat.touchjs.top = parseFloat(jsonObj.top), cat.touchjs.scaleVal = parseFloat(jsonObj.scale);
            callback(cat.touchjs.left, cat.touchjs.top, cat.touchjs.scaleVal);
        }
    },
    //拖动
    drag: function ($targetObj, callback) {
        touch.on($targetObj, 'drag', function (ev) {
            if (cat.touchjs.scaleVal != 1) {
                $targetObj.css("left", cat.touchjs.left + ev.x).css("top", cat.touchjs.top + ev.y);
            }
        });
        touch.on($targetObj, 'dragend', function (ev) {
            cat.touchjs.left = cat.touchjs.left + ev.x;
            cat.touchjs.top = cat.touchjs.top + ev.y;
            callback(cat.touchjs.left, cat.touchjs.top);
        });
    },
    //缩放
    scale: function ($targetObj, callback) {
        var initialScale = cat.touchjs.scaleVal || 1;
        var currentScale;
        touch.on($targetObj, 'pinch', function (ev) {
            cat.touchjs.curStatus = 1;
            currentScale = ev.scale - 1;
            currentScale = initialScale + currentScale;
            cat.touchjs.scaleVal = currentScale;
            if (cat.touchjs.scaleVal < 1.0) {
                cat.touchjs.scaleVal = 1.0
            }
            if (cat.touchjs.scaleVal > 3) {
                cat.touchjs.scaleVal = 3
            }
            var transformStyle = 'scale(' + cat.touchjs.scaleVal + ')';
            var left = ev.target.offsetLeft;
            var top = ev.target.offsetTop;
            $targetObj.css("transform-origin", left + "px " + top + "px 0px");//设置变形原点
            $targetObj.css("-webkit-transform", transformStyle);
            callback(cat.touchjs.scaleVal);
        });

        touch.on($targetObj, 'pinchend', function (ev) {
            initialScale = currentScale;
            cat.touchjs.scaleVal = currentScale;
            callback(cat.touchjs.scaleVal);
        });
    },

};

export default cat
