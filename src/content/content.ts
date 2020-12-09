import { browser } from 'webextension-polyfill-ts';

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
    browser.runtime.sendMessage({ "scroll_pos": scroll_pos })
        .catch((error) => {
            console.log(error);
        });
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

browser.runtime.onMessage.addListener((msg: any, sender: any, sendResponse: any) => {
    if (msg.event != undefined && msg.event === "REQUEST_SCROLL_POS") {
        sendResponse({ "scroll_pos": window.scrollY });
    }
    if (msg.event != undefined && msg.event === "SET_SCROLL_POS") {
        if (document.readyState === "complete") {
            window.scrollTo(msg.scrollPos, 0);
            return;
        }
        window.addEventListener("load", () => {
            window.scrollTo(msg.scrollPos, 0);
        });
    }
});

