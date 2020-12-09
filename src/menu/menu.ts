import { browser } from "webextension-polyfill-ts";

const saved = browser.storage.sync.get().then((data) => {
    let html = "<ul>";
    for (let i in data) {
        console.log(data[i]);
        html += "<li><a href=\"\" class=\"bookmark\" data-id=\"" + i + "\" data-title=\"" + data[i].title + "\" data-url=\"" + data[i].url + "\" data-scrollPos=\"" + data[i].scrollPos + "\">" + data[i].title + "</a>";
    }
    html += "</ul>";
    document.getElementById("content").innerHTML = html;
}).catch((error) => {
    console.log(error);
})

const href = document.body.querySelector(".bookmark");

document.addEventListener("click", (elem) => {
    if (elem.target instanceof HTMLElement) {
        if (!elem.target.classList.contains("bookmark")) {
            return
        }
        const id = elem.target.getAttribute("data-id");
        const title = elem.target.getAttribute("data-title");
        const url = elem.target.getAttribute("data-url");
        const scrollPos: number = +elem.target.getAttribute("data-scrollPos");

        browser.tabs.create({
            url: url
        }).then((tab) => {
            browser.tabs.executeScript(tab.id, {
                code: "window.scrollTo({top: " + scrollPos + ", behavior: 'smooth'});",
                runAt: "document_idle"
            }).catch((error) => console.log(error))

            browser.runtime.sendMessage({
                "event": "REOPEN_BOOKMARK",
                "id": id,
                "tabId": tab.id,
                "title": title,
                "url": url,
                "scrollPos": scrollPos
            })
        }).catch((error) => {
            console.log(error);
        });
    }
})