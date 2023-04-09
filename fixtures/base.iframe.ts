import { chromium } from "@playwright/test";
import { IEditableElements, INonEditableElements } from "./base.interface";

export abstract class BaseIframe implements IEditableElements, INonEditableElements {
    browser;
    page;
    protected abstract elementsSelectors: { [key: string]: string };
    protected commonIframeElements = {
        popUpIframe: '.cboxIframe',
        closeIframeButton: '#cboxClose',
        autoCompleteFieldLoader: 'ac_loading'
    };

    // closeIframe(): void {
    //     cy.get(this.commonIframeElements.closeIframeButton).click();
    //     cy.get(this.commonIframeElements.popUpIframe, { timeout: 10000 }).should('not.exist');
    // }

    // fillAutocompleteField(selector: string, text: string): void {
    //     this.typeInAutocompleteField(selector, text);
    //     this.getIframeContent().find('.ac_results').last().find('li').contains(text, { matchCase: false }).click();
    // }

    // typeInAutocompleteField(selector: string, text: string): void {
    //     this.getIframeContent().find(selector).focus().type(text);
    //     cy.waitUntil(() => this.getIframeContent().find(selector, { timeout: 10000 }).
    //         should('not.have.class', this.commonIframeElements.autoCompleteFieldLoader), { timeout: 10000 });
    // }

    async getElement(selector: string, timeout = 7000) {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
        return this.page.locator(selector, { timeout: timeout });
    }

    async click(selector: string, forceClick: boolean = true, timeout: number = 4000): Promise<void> {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
        return this.page.locator(selector, { timeout }).click({ force: forceClick });
    }

    async fillHMSAutocompleteField(selector: string, text: string, iframeSelector?: string): Promise<void> {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
        this.writeTextToField(selector, text, iframeSelector);
        this.page.frameLocator(iframeSelector).find(selector).waitUntil(() => {
            return this.page.frameLocator(iframeSelector).find(selector).should('not.have.class', 'ac_loading', { timeout: 10000 });
        });
        this.page.frameLocator(iframeSelector).find('li').contains(text, { matchCase: false }).click();
    }

    async writeTextToField(fieldSelector: string, text: string, iframeSelector?: string): Promise<void> {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
        this.page.frameLocator(iframeSelector).locator(fieldSelector).clear({ force: true }).type(text);
    }

    getSelector(field: string, replaceChr: string = '-') {
        return field.toLowerCase().replace(/ /g, replaceChr);
    }
}