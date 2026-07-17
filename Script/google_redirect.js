function handleResponse(response) {
    var status = response.statusCode;
    if ([301,302,303,307,308].indexOf(status) !== -1) {
        var location = response.headers['Location'];
        if (location) {
            var newLocation = location;
            newLocation = newLocation.replace(/^https?:\/\/(www\.)?google\.[a-z]{2,3}(\/|$)/, 'https://www.google.com/');
            newLocation = newLocation.replace(/^https?:\/\/(www\.)?youtube\.[a-z]{2,3}(\/|$)/, 'https://www.youtube.com/');
            newLocation = newLocation.replace(/^https?:\/\/(www\.)?gmail\.[a-z]{2,3}(\/|$)/, 'https://www.gmail.com/');
            newLocation = newLocation.replace(/^https?:\/\/(www\.)?googleapis\.[a-z]{2,3}(\/|$)/, 'https://www.googleapis.com/');
            if (newLocation !== location) {
                response.headers['Location'] = newLocation;
            }
        }
    }
    return response;
}