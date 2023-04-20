import { Page } from '@playwright/test';
import { IEditableElements, INonEditableElements } from './base.interface';
import { String } from 'typescript-string-operations';


export abstract class BasePage implements IEditableElements, INonEditableElements {
    readonly page: Page;

    protected abstract elementsSelectors: { [key: string]: string };
    protected url: string;

    constructor(page) {
        this.page = page;
    }



    async visit(extraParam: string = '') {
        let baseURL = "https://test.kwentra.com";
        let url = String.format(this.url, extraParam);
        // const currentURL = this.page.url();
        // if (currentURL == `${baseURL}/${url}`) {
        //     this.page.reload();
        //     return;
        // }
        await this.page.goto(`${baseURL}/${url}`, { timeout: 60000 });
    }

    async click(selector: string) {
        await this.page.locator(selector).click({ timeout: 70000 });
    }

    async writeTextToField(fieldSelector: string, text: string) {
        await this.page.locator(fieldSelector).type(text);
    }

    getElement(selector: string) {
        return this.page.locator(selector);
    }

    getSelector(field: string, replaceChr: string = '-') {
        return field.toLowerCase().replace(/ /g, replaceChr);
    }
}