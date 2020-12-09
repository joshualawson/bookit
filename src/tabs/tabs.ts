import { Tab } from './tab';
import { browser } from "webextension-polyfill-ts";

export class Tabs {
    private collection: Array<Tab>;

    public constructor() {
        this.collection = new Array<Tab>();

        browser.tabs.onUpdated.addListener((tabId: number, tabInfo: any) => {
            this.updateActiveTab(tabId, tabInfo);
        });
        browser.tabs.onRemoved.addListener((tabId: number) => {
            this.closeActiveTab(tabId);
        });
    }

    public appendTab(tab: Tab) {
        this.collection.push(tab);
    }

    public findTab(tabId: number): Tab | null {
        return this.collection.find((elm) => {
            return elm.getTabId() === tabId;
        })
    }

    private deteleTab(tabId: number) {
        const tab = this.findTab(tabId);
        if (tab) {
            const index = this.collection.indexOf(tab);
            if (index !== -1) {
                this.collection.splice(index, 1);
            }
        }
    }

    private updateActiveTab(tabId: number, tabInfo: any) {
        let tab = this.findTab(tabId)
        if (tab?.getActive()) {
            // This tab is suppose to be tracked, lets update the url, title and scroll pos if it changes
            if (tabInfo.title != undefined) {
                tab.setTitle(tabInfo.title)
            }

            if (tabInfo.url != undefined) {
                tab.setURL(tabInfo.url);
            }

            browser.tabs.sendMessage(tab.getTabId(), { "event": "REQUEST_SCROLL_POS" }).then((resp) => {
                tab.setScrollPos(resp.scroll_pos);
            })

            return
        }
    }

    private closeActiveTab(tabId: number) {
        const tab = this.findTab(tabId);
        if (tab != null && tab.getActive()) {
            tab.save();
        }
        this.deteleTab(tabId);
    }

    public activateTab(tabId: number) {
        const tab = this.findTab(tabId);

        tab?.setActive(true);
    }

    public deactivateTab(tabId: number) {
        const tab = this.findTab(tabId);

        tab?.setActive(false);
    }
}