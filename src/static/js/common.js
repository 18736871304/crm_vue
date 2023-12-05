export function getBeforeDate (n) {
  //n为你要传入的参数，当前为0，前一天为-1，后一天为1
  var date = new Date();
  var year, month, day, s;
  date.setDate(date.getDate() + n);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  s = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
  return s;
}

export function formatDate (date, format) {
  if (!date) return;
  if (!format || typeof (format) != "string") format = "yyyy-MM-dd";
  switch (typeof date) {
    case "string":
      date = new Date(date.replace('T', ' ').replace(/-/, "/"));
      break;
    case "number":
      date = new Date(date);
      break;
  }
  if (!(date instanceof Date)) return;
  var dict = {
    "yyyy": date.getFullYear(),
    "M": date.getMonth() + 1,
    "d": date.getDate(),
    "H": date.getHours(),
    "m": date.getMinutes(),
    "s": date.getSeconds(),
    "MM": ("" + (date.getMonth() + 101)).substr(1),
    "dd": ("" + (date.getDate() + 100)).substr(1),
    "HH": ("" + (date.getHours() + 100)).substr(1),
    "mm": ("" + (date.getMinutes() + 100)).substr(1),
    "ss": ("" + (date.getSeconds() + 100)).substr(1)
  };
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]];
  });
}

// export function formatDate (date) {
//   var myyear = date.getFullYear();
//   var mymonth = date.getMonth() + 1;
//   var myweekday = date.getDate();

//   if (mymonth < 10) {
//     mymonth = "0" + mymonth;
//   }
//   if (myweekday < 10) {
//     myweekday = "0" + myweekday;
//   }
//   return (myyear + "-" + mymonth + "-" + myweekday + ' ' + '00:00:00');
// }

export function checkEmail (email) {
  var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式

  if (email == null || email == "") {
    return false;
  }
  else if (!reg.test(email)) {
    return false;
  }
  else {
    return true;
  }
}
export function checkMobile (mobile) {
  var reg = /^1[3456789]\d{9}$/; //正则表达式

  if (mobile == null || mobile == "") {
    return false;
  }
  else if (!reg.test(mobile)) {
    return false;
  }
  else {
    return true;
  }
}
export function checkAge (age) {
  var reg = /^[1-9]\d*$/; //正则表达式

  if (age == null || age == "") {
    return false;
  }
  else if (!reg.test(age)) {
    return false;
  }
  else if (age < 0 || age > 106) {
    return false;
  }
  else {
    return true;
  }
}

// 根据身份证获取出生日期
export function getBirthdayByIDCard(IDNO) {
  var val = IDNO;
  var birthdayValue;
  if (15 == val.length) { // 15位身份证号码
      birthdayValue = val.charAt(6) + val.charAt(7);
      if (parseInt(birthdayValue) < 10) {
          birthdayValue = "20" + birthdayValue;
      } else {
          birthdayValue = "19" + birthdayValue;
      }
      birthdayValue = birthdayValue + "-" + val.charAt(8) + val.charAt(9) + "-" + val.charAt(10) + val.charAt(11);
  }
  if (18 == val.length) { // 18位身份证号码
      birthdayValue = val.charAt(6) + val.charAt(7) + val.charAt(8) + val.charAt(9) + "-" + val.charAt(10) + val.charAt(11) + "-" + val.charAt(12) + val.charAt(13);
  }
  return birthdayValue;
}
//根据身份证获取性别
export function getSexByIDCard(IDNO) {
  var val = IDNO;
  if (15 == val.length) { // 15位身份证号码
    if (parseInt(val.charAt(14) / 2) * 2 != val.charAt(14)) {
        return "1";
    } else {
        return "2";
    }
  }
  if (18 == val.length) { // 18位身份证号码
    if (parseInt(val.charAt(16) / 2) * 2 != val.charAt(16)) {
        return "1";
    } else {
        return "2";
    }
  }
}
//根据身份证获取年龄
export function getIdCardAge(UUserCard) {
  //获取年龄
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
  if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
      age++;
  }
  return age
}