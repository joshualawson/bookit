import { Tabs } from './tabs/tabs';
import { browser } from 'webextension-polyfill-ts';
import { Tab } from './tabs/tab';

class Bookit {
    private tabs: Tabs;

    constructor() {
        this.tabs = new Tabs();
        browser.pageAction.onClicked.addListener(() => {
            this.toggleBookit();
        });

        browser.runtime.onMessage.addListener((msg, sender) => {
            const tab = this.tabs.findTab(sender.tab.id);
            if (tab != null && tab.getActive()) {
                tab.setScrollPos(msg.scroll_pos);
                tab.save();
            }
        })
    }

    private toggleBookit() {
        browser.tabs.query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT })
            .then((tabs) => browser.tabs.get(tabs[0].id))
            .then((tab) => {
                let t = this.tabs.findTab(tab.id);
                if (t == null || !t.getActive()) {
                    if (t == null) {
                        browser.tabs.sendMessage(tab.id, { "event": "REQUEST_SCROLL_POS" }).then((resp) => {
                            t = new Tab(tab.id, true, tab.url, tab.title, resp.scroll_pos);
                            this.tabs.appendTab(t);
                            t.save();
                        })
                    } else {
                        t.setTabId(tab.id);
                        t.setActive(true);
                        t.setTitle(tab.title);
                        t.setURL(tab.url);

                        browser.tabs.sendMessage(tab.id, { "event": "REQUEST_SCROLL_POS" }).then((resp) => {
                            t.setScrollPos(resp.scroll_pos);
                            t.save();
                        })

                    }
                }
                this.tabs.deactivateTab(tab.id!);
            });
    }
}
new Bookit();

browser.storage.sync.clear();