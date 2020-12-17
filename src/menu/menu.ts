import { browser } from "webextension-polyfill-ts";

const saved = browser.storage.sync.get().then((data) => {
    let html = "";
    if (Object.keys(data).length == 0) {
        html += "No bookmarks found";
    } else {
        html += "<ul>";
        for (let i in data) {
            console.log(data[i]);
            html += "<li class=\"item\" data-id=\"" + i + "\" data-title=\"" + data[i].title + "\" data-url=\"" + data[i].url + "\" data-scrollPos=\"" + data[i].scrollPos + "\"><a class=\"link\" class=\"bookmark\">" + data[i].title + "</a><a class=\"remove\" data-id=\"" + i + "\">X</a>";
        }
        html += "</ul>";
    }
    document.getElementById("content").innerHTML = html;
}).catch((error) => {
    console.log(error);
})

const href = document.body.querySelector(".bookmark");

document.addEventListener("click", (elem) => {
    if (elem.target instanceof HTMLElement) {
        if (elem.target.classList.contains("item") || elem.target.classList.contains("link")) {
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
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        } else if (elem.target.classList.contains("remove")) {
            const id = elem.target.getAttribute("data-id");
            browser.runtime.sendMessage({
                "event": "REMOVE_BOOKMARK",
                "id": id,
            }).catch((error) => {
                console.log(error);
            });
        }
    }
})