import { browser } from "webextension-polyfill-ts";
import { v4 as uuidv4 } from 'uuid';

export class Tab {
    private id: string;
    private tabId: number;
    private active: boolean;
    private url: string;
    private title: string;
    private scrollPos: number;

    public constructor(
        tabId: number,
        active: boolean,
        url: string,
        title: string,
        scrollPos: number,
        id?: string
    ) {
        if (id == null) {
            this.id = uuidv4();
        }
        this.tabId = tabId;
        this.active = active;
        this.url = url;
        this.title = title;
        this.scrollPos = scrollPos;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string) {
        this.id = id;
    }


    public getTabId(): number {
        return this.tabId;
    }

    public setTabId(tabId: number) {
        this.tabId = tabId;
    }

    public getActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean) {
        this.active = active;
    }

    public getURL(): string {
        return this.url;
    }

    public setURL(url: string) {
        this.url = url;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getScrollPos(): number {
        return this.scrollPos;
    }

    public setScrollPos(scrollPos: number) {
        this.scrollPos = scrollPos;
    }

    public save() {
        browser.storage.sync.get().then((data: { [s: string]: any }) => {
            if (Object.keys(data).length == 0) {
                data = {};
            }

            data[this.id] = {
                title: this.title,
                url: this.url,
                scrollPos: this.scrollPos
            }

            browser.storage.sync.set(data)
        })
    }
}

