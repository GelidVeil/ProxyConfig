function handleRequest(request) {
    var headers = request.headers || {};
    headers['Accept-Language'] = 'en-US,en;q=0.9';
    delete headers['X-Forwarded-For'];
    delete headers['Client-IP'];
    delete headers['CF-Connecting-IP'];
    delete headers['X-Real-IP'];
    return headers;
}