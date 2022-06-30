/*处理数字为两位小数展示千分位*/
export const formatNumbers = (num, flag) => {
  if (flag === "1") {
    num = Number(num);
  } else {
    num = Number(num).toFixed(2);
  }
  if (isNaN(num)) {
    return "--";
  }
  var groups = /([\-\+]?)(\d*)(\.\d+)?/g.exec("" + num),
    mask = groups[1], //符号位
    integers = (groups[2] || "").split(""), //整数部分
    decimal = groups[3] || "", // 小数部分
    remain = integers.length % 3;

  var temp = integers
    .reduce(function (previousValue, currentValue, index) {
      if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
        return previousValue + currentValue + ",";
      } else {
        return previousValue + currentValue;
      }
    }, "")
    .replace(/\.$/g, "");
  return mask + temp + decimal;
};
/*
处理百分比、0显示、所有比例不进行0补位、最后显示4位
*/
export const commonFormatPercent = (num) => {
  num = num + "";
  if (isNaN(num)) {
    return "--";
  }
  if (num.indexOf("e") != -1 || num.indexOf("e") != -1) {
    // 科学技术处理 scientificNotationToString
    // return toNonExponential(num)
    num = accMul(this.scientificNotationToString(num), 100).toString();
  } else {
    num = accMul(num, 100).toString();
  }
  if (num.indexOf(".") > -1) {
    var len = num.split(".")[1];
    if (len.length > 4) {
      let nums = num.split(".");
      // 大于4位截取
      if (nums[1].length > 4) {
        num = nums[0] + "." + nums[1].substr(0, 4);
      }
      // 去掉多余零
      num = cutZero((num = ""));
      if (num == "0") {
        return "--";
      }
    }
  } else if (num == "0") {
    return "--";
  }
  return num;
};

/*截取多余小数 */
export const cutZero = (old) => {
  // 拷贝一份  返回去掉零的新串
  let newStr = old;
  // 循环变量 小数部分长度
  var leng = old.length - old.indexOf(".") - 1;
  // 判断是否有效数
  if (old.indexOf(".") > -1) {
    // 循环小数部分
    for (let i = leng; i > 0; i--) {
      // 如果newStr末尾有0
      if (
        newStr.lastIndexOf("0") > -1 &&
        newStr.substr(newStr.length - 1, 1) == 0
      ) {
        var k = newStr.lastIndexOf("0");
        // 如果小数点后只有一个0 去掉小数点
        if (newStr.charAt(k - 1) == ".") {
          return newStr.substring(0, k - 1);
        } else {
          // 否则 去掉一个0
          newStr = newStr.substring(0, k);
        }
      } else {
        // 如果末尾没有0
        return newStr;
      }
    }
  }
  return old;
};

/*科学计数法转为string */
export const scientificNotationToString = (param) => {
  let strParam = String(param);
  let flag = /e|E/.test(strParam);
  if (!flag) return param;

  // 指数符号true:正，false：负
  let sysbol = true;
  if (/e|E-/.test(strParam)) {
    sysbol = false;
  }
  // 指数
  let index = Number(strParam.match(/\d+$/)[0]);
  // 基数
  let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, "");
  if (sysbol) {
    return basis.padEnd(index + 1, 0);
  } else {
    return basis.padStart(index + basis.length, 0).replace(/^0/, "0");
  }
};

// 乘法  保留精度
export const accMul = (arg1, arg2) => {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    if (s1.split(".")[1]) {
      m += s1.split(".")[1].length;
    }
  } catch (e) {}
  try {
    if (s2.split(".")[1]) {
      m += s2.split(".")[1].length;
    }
  } catch (e) {}
  let result =
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m);
  return scientificNotationToString(result);
};

//
export const toNumberStr = function (num) {
  // 正则匹配小数科学记数法
  if (/^(\d+(?:\.\d+)?)(e)([\-]?\d+)$/.test(num)) {
    // 正则匹配小数点最末尾的0
    var temp = /^(\d{1,}(?:,\d{3})*\.(?:0*[1-9]+)?)(0*)?$/.exec(num.toFixed(2));
    if (num) {
      return temp[1];
    } else {
      return num.toFixed(2);
    }
  } else {
    return "" + num;
  }
};
// 小数截断保留指定位数
export const fomatFloat = function (value, n) {
  let f = toNumberStr(value);
  let s = f;
  let rs = f.indexOf(".");
  if (rs < 0) {
    s += ".";
  }
  for (var i = s.length - s.indexOf("."); i < n; i++) {
    s += "0";
  }
  let arr = s.split(".");
  let decimal = arr[1].substring(0, n);
  aee[1] = decimal;
  return arr.join(".");
};

// 除以100保留N位小数点
export const divideByHundred = function (str, n) {
  let floatVal = parseFloat(str);
  if (isNaN(floatVal)) {
    return 0;
  }
  floatVal = Math.round(str * 100) / 10000;
  let strVal = floatVal.toString();
  let searchVal = strVal.indexOf(".");
  if (searchVal < 0) {
    searchVal = strVal.length;
    strVal += ".";
  }
  while (strVal.length <= searchVal + n) {
    strVal += "0";
  }
  return parseFloat(strVal);
};
// 乘以100保留N位小数点
export const multipliedByHundred = function (str, n) {
  let floatVal = parseFloat(str);
  if (isNaN(floatVal)) {
    return 0;
  }
  floatVal = Math.round(str * 10000) / 100;
  let strVal = floatVal.toString();
  let searchVal = strVal.indexOf(".");
  if (searchVal < 0) {
    searchVal = strVal.length;
    strVal += ".";
  }
  while (strVal.length <= searchVal + n) {
    strVal += "0";
  }
  return parseFloat(strVal);
};

// 将base64转换成blob文件
export const dataURLtoFile = (dataurl, filename = "file") => {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split("/")[1];
  let bstr = window.atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${fileName}.${suffix}`, {
    type: mime,
  });
};

// 转换base64 预览pdf
export const base64ToBlob = (urlData, type) => {
  let arr = urlData.split(",");
  let mime = arr[0].match(/:(.*?);/)[1] || type;
  // 去掉url的头 并转化为type
  let bytes = window.atob(arr[1]);
  // 处理异常，将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  // 生成视图(直接针对内存)：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mime,
  });
};
// 使用
// let base64 = 'data:application/pdf;base64'+'返回值'
// let blob = base64ToBlob(base64)
// var link = document.createElement('a')
// link.href = window.URL.createObjectURL(blob)
// link.target = '_blank'
// link.click()

// 解决加法丢失精度
export const floatAdd = (arg1, arg2) => {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return floatMultiply(arg1, m) + floatMultiply(arg2, m);
};
// 解决减法丢失精度
export const floatSub = (arg1, arg2) => {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  // 动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((floatMultiply(arg1, m) - floatMultiply(arg2, m)) / m).toFixed(n);
};
// 解决乘法丢失精度
export const floatMultiply = (arg1, arg2) => {
  if (arg1 == null || arg2 == null) {
    return null;
  }
  let n1, n2;
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  n1 = Number(arg1.toString().replace(".", ""));
  n2 = Number(arg2.toString().replace(".", ""));
  return (n1 * n2) / Math.pow(10, r1 + r2);
};
// 解决除法丢失精度
export const floatDivide = (arg1, arg2) => {
  if (arg1 == null) {
    return null;
  }
  if (arg2 == null || arg2 == 0) {
    return null;
  }
  let n1, n2;
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  n1 = Number(arg1.toString().replace(".", ""));
  n2 = Number(arg2.toString().replace(".", ""));
  return (n1 / n2) * Math.pow(10, r2 - r2);
};

// isNan 布尔,null,undefined,"",[],{}隐式转换
export const isNumber = (val) => {
  if (typeof val === "string") {
    return /^-?[0-9]+\.?[0-9]*$/.test(val);
  }
  if (typeof val === "number") {
    return !Number.isNaN(val);
  }
  return false;
};
// 数值千分位化
export const formatCurrency = (m = num, digits = 2) => {
  if (!isNumber(num)) return "";
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// 判断数组是否有重复元素
export const hasReaptElement = (Arr) => {
  const obj = {};
  for (let index = 0, len = Arr.length; index < len; index++) {
    const ele = Arr[index];
    if (ele) {
      if (obj[ele]) return true;
      obj[ele] = true;
    }
  }
  return false;
};
