var dataUrls = ""
if (location.hostname == "localhost") {
    dataUrls = "http://172.16.194.220";
    // dataUrls = "http://testapi.itenbo.com"
} else if (location.hostname == "tm.itenbo.com") {
    dataUrls = "http://testapi.itenbo.com"
        // dataUrls = "http://172.16.194.220";
} else {
    dataUrls = "http://api.itenbo.com";
}