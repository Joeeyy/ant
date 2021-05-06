//
// module of dingtalk robot alert
//

var https = require('https');

var config = {
    robotAk: process.env.ANT_DINGTALK_ROBOT_AK,
    robotKeyword: process.env.ANT_DINGTALK_ROBOT_KEYWORD,
    robotHost: process.env.ANT_DINGTALK_ROBOT_HOST || 'oapi.dingtalk.com',
    robotPort: process.env.ANT_DINGTALK_ROBOT_PORT || 443,
}

const options = {
    hostname: 'oapi.dingtalk.com',
    port: config['robotPort'],
    path: `/robot/send?access_token=${config['robotAk']}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}


module.exports = {
    send: function(data){
        var ip = data.ip;
        var ua = data.ua;
        var referer = data.referer;
        var addr = data.addr;
        var title = data.title;
        data = JSON.stringify({
            "msgtype": "text",
            "text": {
                "content": `Title: ${title} \nAddr: ${addr} \nReferer: ${referer} \nUA: ${ua} \nIP: ${ip} \n ${config['robotKeyword']}`
            }
        })

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
                process.stdout.write(d)
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(data)
        req.end()
    }
}
