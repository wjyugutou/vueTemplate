/* 验证邮箱 */
export function validateEmail(email: string) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i

  return regex.test(email)
}

/* 验证手机号 */
export function validatePhone(phone: string) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const regex = /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i

  return regex.test(phone)
}

/* 验证pad还是pc */
export function vaildatePc() {
  const userAgentInfo = navigator.userAgent
  const Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ]
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/* 判断是否为空 空数组 空对象 空字符串 null undefined 'undefined' */
export function validatenull(val: unknown) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (Array.isArray(val)) {
    if (val.length === 0) {
      return true
    }
  }
  else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') {
      return true
    }
  }
  else {
    if (
      val === 'null'
      || val === null
      || val === 'undefined'
      || val === undefined
      || val === ''
    ) {
      return true
    }
    return false
  }
  return false
}

/* 判断身份证号码 */
export function vaildateIdCard(id: string) { // 1 "验证通过!", 0 //校验不通过
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const format = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|(71)|(8[12]))\d{4}((19\d{2})|(2\d{3}))((0[1-9])|(1[0-2]))((0[1-9])|([12]\d)|(3[01]))\d{3}[0-9x]$/i
  // 号码规则校验
  if (!format.test(id)) {
    return { valid: false, msg: '身份证号码不合规' }
  }
  // 371203199906193511
  // 区位码校验
  // 出生年月日校验   前正则限制起始年份为1900;
  const year = +id.substring(6, 9) // 身份证年
  const month = +id.substring(10, 11) // 身份证月
  const date = +id.substring(12, 13) // 身份证日
  const time = Date.parse(`${month}-${date}-${year}`) // 身份证日期时间戳date
  const now_time = Date.parse(`${new Date()}`) // 当前时间戳
  const dates = (new Date(year, month, 0)).getDate() // 身份证当月天数
  if (time > now_time || date > dates) {
    return { valid: false, msg: '出生日期不合规' }
  }
  // 校验码判断
  const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 系数
  const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对照表
  const id_array = id.split('')
  let sum = 0
  for (let k = 0; k < 17; k++) {
    sum += Number.parseInt(id_array[k]) * Number.parseInt(`${c[k]}`)
  }
  if (id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
    return { valid: false, msg: '身份证校验码不合规' }
  }
  return { valid: true, msg: '校验通过' }
}

/* 座机 */
export function validateTelephone(str: string) {
  const reg = /^0\d{2,3}-?\d{7,8}$/
  return reg.test(str)
}

/* 社会信用代码 */
export function validateCreditCode(str: string) {
  const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
  return reg.test(str)
}

/* 银行卡 */
export function validateBankCard(str: string) {
  const reg = /^\d{8,30}$/
  return reg.test(str)
}
