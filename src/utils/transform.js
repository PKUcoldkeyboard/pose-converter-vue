
// 将文件大小转换为mb的形式
export function transformSize(size) {
    if (size < 1024) {
        return size + 'B';
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB';
    } else if (size < 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + 'MB';
    } else {
        return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB';
    }
}

// 将文件大小kb、mb、gb等转为整数
export function transformBytesString(str) {
    if (!str) {
      return 0;
    }
  
    const units = {
      B: 1,
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
      TB: 1024 * 1024 * 1024 * 1024
    };
  
    const matches = str.match(/^(\d+(?:\.\d+)?)([BKMGT]B)$/i);
  
    if (!matches) {
      throw new Error('Invalid input format');
    }
  
    const value = parseFloat(matches[1]);
    const unit = matches[2].toUpperCase();
  
    if (!units.hasOwnProperty(unit)) {
      throw new Error('Unknown unit');
    }
  
    return Math.round(value * units[unit]);
}
  

// 将时间字符串格式化为yyyy-MM-dd HH:mm:ss的形式
export function transformTime(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

    