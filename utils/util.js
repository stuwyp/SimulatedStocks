const formatTime = time => {
    let date = typeof time === 'object' ? time : new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const friendlyTime = time => {
    let dateObj = typeof time === 'object' ? time : new Date(time)
    let datetime = dateObj.getTime() * 1000
    let now = new Date().getTime()
    let space = now - datetime
    let str = ''

    switch (true) {
        case space < 60000:
            str = '刚刚'
            break
        case space < 1000 * 3600:
            str = Math.floor(space / 60000) + '分钟前'
            break
        case space < 1000 * 3600 * 24:
            str = Math.floor(space / (1000 * 3600)) + '小时前'
            break
        default:
            str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
    }
    return str
}

const timestampToTime = function (timestamp) {
    let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D + h + m + s;
}

export  {
    formatTime,
    formatNumber,
    friendlyTime,
    timestampToTime
}
