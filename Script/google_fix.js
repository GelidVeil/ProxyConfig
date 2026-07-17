// Google 全家桶全球固网 - 合并版
// 同时处理请求头修改和响应重定向/内容替换

function handleRequest(request) {
    var headers = request.headers || {};
    headers['Accept-Language'] = 'en-US,en;q=0.9';
    delete headers['X-Forwarded-For'];
    delete headers['Client-IP'];
    delete headers['CF-Connecting-IP'];
    delete headers['X-Real-IP'];
    return headers;
}

function handleResponse(response) {
    var status = response.statusCode;
    // 拦截 30x 重定向
    if ([301, 302, 303, 307, 308].indexOf(status) !== -1) {
        var location = response.headers['Location'];
        if (location) {
            var newLocation = location
                .replace(/^https?:\/\/(www\.)?google\.[a-z]{2,3}(\/|$)/, 'https://www.google.com/')
                .replace(/^https?:\/\/(www\.)?youtube\.[a-z]{2,3}(\/|$)/, 'https://www.youtube.com/')
                .replace(/^https?:\/\/(www\.)?gmail\.[a-z]{2,3}(\/|$)/, 'https://www.gmail.com/')
                .replace(/^https?:\/\/(www\.)?googleapis\.[a-z]{2,3}(\/|$)/, 'https://www.googleapis.com/');
            if (newLocation !== location) {
                response.headers['Location'] = newLocation;
            }
        }
    }
    // 替换响应体中的地区域名
    var body = response.body;
    if (body && typeof body === 'string') {
        var newBody = body
            .replace(/https?:\/\/(www\.)?google\.[a-z]{2,3}/g, 'https://www.google.com')
            .replace(/https?:\/\/(www\.)?youtube\.[a-z]{2,3}/g, 'https://www.youtube.com')
            .replace(/https?:\/\/(www\.)?gmail\.[a-z]{2,3}/g, 'https://www.gmail.com');
        if (newBody !== body) {
            response.body = newBody;
        }
    }
    return response;
}