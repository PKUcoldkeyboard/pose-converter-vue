
/**
 * 邮箱格式验证
 */
export function validEmail(email) {
    var str = email;
    var re = /^([a-z0-9]+[_|\_|\.]?)*[a-z0-9]+@([a-z0-9]+[_|\_|\.]?)*[a-z0-9]+\.[a-z]{2,3}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}
/**
 * 密码格式验证，8-16位字符，必须同时含有大小写字母、数字
 */
export function validPassword(password) {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
    if (re.test(password)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 用户名必须在4位以上，10位以下
 */
export function validUsername(str) {
    return str.length >= 4 && str.length <= 10
}