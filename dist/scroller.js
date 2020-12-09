let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
    browser.runtime.sendMessage({ "scroll_pos": scroll_pos });
}

document.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
        });

        ticking = true;
    }
});

browser.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    if (req.event != undefined && req.event === "REQUEST_SCROLL_POS") {
        sendResponse({ "scroll_pos": window.scrollY });
    }
});