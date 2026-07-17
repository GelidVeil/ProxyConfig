function handleResponse(response) {
    var body = response.body;
    if (body && typeof body === 'string') {
        var newBody = body;
        newBody = newBody.replace(/https?:\/\/(www\.)?google\.[a-z]{2,3}/g, 'https://www.google.com');
        newBody = newBody.replace(/https?:\/\/(www\.)?youtube\.[a-z]{2,3}/g, 'https://www.youtube.com');
        newBody = newBody.replace(/https?:\/\/(www\.)?gmail\.[a-z]{2,3}/g, 'https://www.gmail.com');
        if (newBody !== body) {
            response.body = newBody;
        }
    }
    return response;
}