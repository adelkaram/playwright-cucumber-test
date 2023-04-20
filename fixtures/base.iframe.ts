import { Page } from "@playwright/test";
import { IEditableElements, INonEditableElements } from "./base.interface";

export abstract class BaseIframe implements IEditableElements, INonEditableElements {
    readonly page: Page;

    protected abstract elementsSelectors: { [key: string]: string };


    constructor(page) {
        this.page = page;
    }


    async getElement(elementSelector: string, iframeSelector: string) {
        await this.page.frameLocator(iframeSelector).locator(elementSelector);
    }

    async click(elementSelector: string, iframeSelector: string) {
        await this.page.frameLocator(iframeSelector).locator(elementSelector,).click();
    }



    async writeTextToField(fieldSelector: string, text: string, iframeSelector: string) {
        await this.page.frameLocator(iframeSelector).locator(fieldSelector).type(text);
    }

    getSelector(field: string, replaceChr: string = '-') {
        return field.toLowerCase().replace(/ /g, replaceChr);
    }
}