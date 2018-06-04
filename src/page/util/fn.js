import axios from 'axios'
import api from '../../api/index'
import { Toast } from 'mint-ui';
const session = window.localStorage;

const fn = {
    install(Vue, options) {
        Vue.prototype.$ajax = api;
        // Vue.prototype.$baseUrl = "http://47.104.84.80:8081/Pmt/Api/APP/"; //测试环境测试环境
        // Vue.prototype.$imgUrl = "http://47.104.84.80:8081/Pmt/Api/APP/File/UploadFile";
        
        Vue.prototype.$baseUrl = "http://47.96.137.30:8081/Pmt/Api/APP/"; //正式环境
        Vue.prototype.$imgUrl = "http://47.96.137.30:8081/Pmt/Api/APP/File/UploadFile";
        
        Vue.prototype.$ags = ['PageID', 'ItemID', 'AttachedID', 'KeyID', 'Title', 'VerionNo', 'TemplateID', 'IsTemplate'];
        /*  合法uri  */
        Vue.prototype.validateURL = function validateURL(textval) {
            const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
            return urlregex.test(textval)
        };

        /*  小写字母  */
        Vue.prototype.validateLowerCase = function validateLowerCase(str) {
            const reg = /^[a-z]+$/
            return reg.test(str)
        };

        /*  大写字母  */
        Vue.prototype.validateUpperCase = function validateUpperCase(str) {
            const reg = /^[A-Z]+$/
            return reg.test(str)
        };

        /*  大小写字母  */
        Vue.prototype.validatAlphabets = function validatAlphabets(str) {
            const reg = /^[A-Za-z]+$/
            return reg.test(str)
        };

        /*  是否为空  */
        Vue.prototype.validateEmpty = function validateEmpty(str) {
            if (str + 0 === 0 || typeof(str) === 'undefined') {
                return true
            } else {
                return false
            }
        };

        /*  是否是邮箱  */
        Vue.prototype.email = function email(str) {
            // let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            let reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
            return reg.test(str)
        };

        /*  是否是手机号  */
        Vue.prototype.phone = function phone(str) {
            let reg = /^[0-9]{11}$/
            return reg.test(str)
        };
        Vue.prototype.$phone = function phone(str) {
            let reg = /^[0-9]{11}$/
            return reg.test(str)
        };

        /*  是否是身份证号  */
        Vue.prototype.validateIdentityCardNo = function validateIdentityCardNo(str) {
            let reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            return reg.test(str)
        };

        /*  是否是四位数  */
        Vue.prototype.fourFigures = function fourFigures(str) {
            let red = /^[0-9]{4}$/
            return red.test(str)
        };

        /*  是否是五位数  */
        Vue.prototype.fiveFigures = function fiveFigures(str) {
            let red = /^[0-9]{5}$/
            return red.test(str)
        };

        /*  是否是六位数  */
        Vue.prototype.sixFigures = function sixFigures(str) {
            let reg = /^[0-9]{6}$/
            return reg.test(str)
        };

        /*  是否是金额  */
        Vue.prototype.validateAmount = function validateAmount(str) {
            let reg = /^[0-9]+(.[0-9]{1,2})?$/; ///^[0-9]*(\.[0-9]{1,2})?$/
            return reg.test(str)
        };

        /* 非必填金额 */
        Vue.prototype.emptyOrAmount = function emptyOrAmount(str) {
            if (str) {
                Vue.prototype.validateAmount(str);
            } else {
                return true;
            }
        }

        /*  是否是相等  */
        Vue.prototype.equals = function equals(value1, value2) {
            let reg = /^[A-Za-z0-9]{6,16}$/
            return reg.test(value1) && reg.test(value2) && value1 === value2
        };

        /*  密码  字母和数字组合*/
        Vue.prototype.password = function password(str) {
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
            return reg.test(str)
        };
        Vue.prototype.required = function required(str) {
            return !!str
        };
        //格式化时间
        Vue.prototype.$formatDate = function formatDate(now) {
                var date = new Date(now);
                var month = date.getMonth() + 1;
                month = month > 9 ? month : '0' + month;
                return (
                    date.getFullYear() + "-" + month + "-" + date.getDate()
                );
            }
            //失去焦点验证
        Vue.prototype.$form = function form(obj) {
            var T = Vue.prototype;
            var hash = location.hash;
            var hashArr = ["#/", "#/login", "#/register", "#/forget"];
            var isLogin = function checkHash(hash) {
                for (var item of hashArr) {
                    if (item == hash) {
                        return true;
                    }
                }
                return false;
            }
            obj.addEventListener('input', function() {
                if (!isLogin) {
                    if (!this.value) {
                        this.previousElementSibling.setAttribute("class", "icon add");
                    } else {
                        this.previousElementSibling.setAttribute("class", "icon w");
                    }
                }

            });
            obj.addEventListener('blur', function() {
                var type = this.getAttribute("data-type");
                var tip = this.getAttribute("data-tip");
                if (!!type && type == 'equals') {
                    var preValue = this.parentNode.previousElementSibling.firstChild.nextElementSibling.value;
                    if (!T[type](this.value, preValue)) {
                        Toast(tip);
                        this.nextElementSibling.setAttribute('class', 'error')
                        return false;
                    } else {
                        this.nextElementSibling.setAttribute('class', 'right');

                        return false;
                    }
                }
                if (!!type) {
                    if (!T[type](this.value)) {
                        Toast(tip)
                        this.nextElementSibling.setAttribute('class', 'error')
                        return false;
                    } else {
                        this.nextElementSibling.setAttribute('class', 'right');
                        if (this.previousElementSibling.getAttribute("class") == "icon add") {
                            this.previousElementSibling.setAttribute("class", "icon w");

                        }
                    }
                }

            })
        };
        //提交验证
        Vue.prototype.$btn = function btn(obj) {
            var T = Vue.prototype;
            var $this = obj
            var type = $this.getAttribute("data-type");
            var tip = $this.getAttribute("data-tip");
            if (!!type) {
                if (type === 'equals') {
                    var preValue = $this.parentNode.previousElementSibling.firstChild.nextElementSibling.value;
                    if (!T[type]($this.value, preValue)) {
                        Toast(tip)
                        $this.nextElementSibling.setAttribute('class', 'error');
                        return false
                    } else {
                        $this.nextElementSibling.setAttribute('class', 'right');
                        return true;
                    }
                } else {
                    if (!T[type]($this.value)) {
                        Toast(tip)
                        $this.nextElementSibling.setAttribute('class', 'error');
                        return false
                    } else {
                        $this.nextElementSibling.setAttribute('class', 'right');
                        return true;
                    }
                }
            } else {
                return true;
            }
        };
        //获取表单数据
        Vue.prototype.$getFormData = function getFormData(arr) {
            var formData = {};
            for (var i = 0; i < arr.length; i++) {
                if (!!this.$btn(arr[i])) {
                    var name = arr[i].name;
                    var value = arr[i].value;
                    if (!!name) {
                        formData[name] = value;
                    }
                } else {
                    return false;
                }
            }
            return formData
        };
        //拷贝
        Vue.prototype.$copy = function(des, src, override) {
            if (src instanceof Array) {
                for (var i = 0, len = src.length; i < len; i++)
                    extend(des, src[i], override);
            }
            for (var i in src) {
                if (override || !(i in des)) {
                    des[i] = src[i];
                }
            }
            return des;
        };

        //图片压缩
        Vue.prototype.$imgUpload = function(event, callback, type) {
            var file = event.target.files[0];
            /*var formData = new FormData();*/
            var reader = new FileReader();
            var name = file.name;
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                let result = e.target.result;
                // 图片压缩
                var img = new window.Image();
                img.src = result;
                img.onload = function() {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    var originWidth = img.width;
                    var originHeight = img.height;
                    // 最大尺寸限制
                    var maxWidth = 750,
                        maxHeight = 1334;
                    // 目标尺寸
                    var targetWidth = originWidth,
                        targetHeight = originHeight;
                    // 图片尺寸超过750x1334的限制
                    if (originWidth > maxWidth || originHeight > maxHeight) {
                        if (originWidth / originHeight > maxWidth / maxHeight) {
                            // 更宽，按照宽度限定尺寸
                            targetWidth = maxWidth;
                            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                        } else {
                            targetHeight = maxHeight;
                            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                        }
                    }
                    // canvas对图片进行缩放
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    // 清除画布
                    ctx.clearRect(0, 0, targetWidth, targetHeight);
                    // 图片压缩
                    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                    let data = dataURLtoBlob(canvas.toDataURL("image/jpeg"));
                    /*getFile(data)*/
                    callback(data, name, type);
                };
            };

            function getFile(data) {
                callback(data, name, type)
            }

            function dataURLtoBlob(dataurl) {
                let arr = dataurl.split(","),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            }
        };

        //获取文件对象 及其添加参数
        Vue.prototype.$getFile = function(file, name, index, callback) {
            if (window.FormData) {
                var formData = new FormData();
                this.$ags.map((v, i) => {
                    if (v == "ItemID" && !this.uploadList[index].ItemID) {
                        this.uploadList[index].ItemID = 0;
                    }
                    if (v == 'IsTemplate') {
                        formData.append(v, this.uploadList[index].IsTemplete);
                    } else {
                        formData.append(v, this.uploadList[index][v]);
                    }
                });
                formData.append("Owner", JSON.parse(localStorage.getItem("userInfo")).UserEnName);
                formData.append("DocName", name);
                formData.append("Files", file);
                this.$uploadNative(formData, this.$imgUrl, callback);
            } else {
                Toast("请升级浏览器");
                return false;
            }
        };
        //图片上传
        Vue.prototype.$uploadNative = function(formData, url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.response);
                        callback(data.Data)
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        }

        //各模块编辑状态
        Vue.prototype.$moduleStatus = function() {
                this.$ajax
                    .franchiseePotarlInit({
                        type: "get",
                        data: {
                            CurrentUserPositionID: JSON.parse(
                                localStorage.getItem("userInfo")
                            ).PositionID,
                            StoreID: JSON.parse(localStorage.getItem("storeID")) || 0
                        }
                    })
                    .then(res => {
                        localStorage.setItem('initData', JSON.stringify(res.Data));
                    });
            }
            //是否可以点击保存
        Vue.prototype.$showSaveBtn = function(i, txt) {
                if(i == -1){
                    return txt;
                }else{
                    var currStatus = JSON.parse(localStorage.getItem('initData'))[i].CurrentStatus;
                    console.log(currStatus);
                    if (currStatus != 0) {
                        return "";
                    } else {
                        return txt;
                    }
                }
            },

            //设置非必填项的样式调整value:input框的值，elem:元素，dateType：有值时数据格式
            Vue.prototype.$nonMandatory = function(value, elem, dataType) {
                if (!value) {
                    elem.nextElementSibling.removeAttrbute("class");
                    elem.removeAttrbute("data-type");
                    elem.previousElementSibling.setAttribute("class", "icon add");
                } else {
                    elem.setAttribute("data-type", dataType);
                }
            },
            //选项样式调整
            Vue.prototype.changeSelect = function(id) {
                document
                    .getElementById(id)
                    .nextElementSibling.setAttribute("class", "right");
                document
                    .getElementById(id)
                    .previousElementSibling.setAttribute("class", "icon w");
            },
            //离职时间选择至今
            Vue.prototype.$today = function() {
                console.log();
                var d = document.createElement("div");
                d.textContent = "至今";
                d.className = "picker-today";
                d.addEventListener("click", () => {
                    this.isToDay = !this.isToDay;
                    if (!this.isToDay) {
                        d.style.color = "#333";
                        d.style.borderColor = "#333";
                    } else {
                        d.style.color = "#5d7c33";
                        d.style.borderColor = "#5d7c33";
                    }
                });
                document
                    .getElementsByClassName("picker mint-datetime-picker")[1]
                    .appendChild(d);

                function changeTodayStyle() {

                }
            }
    }
}

export default fn;