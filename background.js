let allowHosts = '';
chrome.extension.onMessage.addListener(function (message, sender) {
    chrome.browserAction.setBadgeBackgroundColor({
        color: 'red',
        tabId: sender.tab.id
    });
});
[

].forEach(v => {
    if (allowHosts == '') {
        allowHosts = `(host).indexOf('${v}') != -1`;
    } else {
        allowHosts += `|| (host).indexOf('${v}') != -1`;
    }
});

chrome.proxy.settings.set({
    value: {
        mode: "pac_script",
        pacScript: {
            data: `
                function FindProxyForURL(url, host) {
                    
                        return 'PROXY 38.60.212.82:3128';
                   
                }
            `
        }
    },
    scope: 'regular'
}, function () { });


chrome.webRequest.onAuthRequired.addListener(function (details, callbackFn) {
    if (details.isProxy == true) {
        callbackFn({
            authCredentials: {
                username: 'root',
                password: 'albona'
            }
        });
    }
}, {
    urls: ["<all_urls>"]
}, ['asyncBlocking']);