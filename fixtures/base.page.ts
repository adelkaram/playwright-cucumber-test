import { String } from 'typescript-string-operations';
import {chromium} from '@playwright/test';
import { IEditableElements, INonEditableElements } from './base.interface';

export abstract class BasePage implements IEditableElements, INonEditableElements{
    browser;
    page;
    protected abstract elementsSelectors: { [key: string]: string };
    protected url: string;

    // constructor() {
    //     this.setPageConig();
    // }

    // async setPageConig() {
    //     this.browser = await chromium.launch();
    //     this.page = await this.browser.newPage();
    // }

    async visit(extraParam: string = '') {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
        const baseUrl = await this.browser.baseURL;
        const url = String.format(this.url, extraParam);
        const currentURL = this.page.url();
        if (currentURL == `${baseUrl}/${url}`) {
            this.page.reload();
            return;
        }
        this.page.goto(url);
    }

    async click(selector: string, forceClick: boolean = true) {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
        this.page.locator(selector).click({ force: forceClick });
    }

    async writeTextToField(fieldSelector: string, text: string, forceType?: boolean) {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
        this.page.locator(fieldSelector).clear({ force: forceType ?? true }).type(text, ({ force: forceType ?? false }));
    }

    // chooseOptionFromMatSelectField(selector: string, option: string, forceClick?: boolean): void {
    //     cy.get(selector).click({ force: forceClick ?? true });
    //     cy.waitUntil(() => cy.get('mat-option').contains(option).click({ force: forceClick ?? true }));
    // }
    // readFromClipboard() {
    //     return cy.window().then(win => {
    //         return win.navigator.clipboard.readText();
    //     });
    // }
    // getWrappedElementText(element) {
    //     return cy.wrap(element).invoke('text');
    // }

    getElement(selector: string): any {
        return this.page.locator(selector);
    }
    // getElementVal(selector: string): any {
    //     return this.getElement(selector).invoke('val');
    // }

    fillHMSAutocompleteField(selector: string, text: string, liSelector = '.ac_results li'): void {
        // cy.intercept('/autocomplete/search/*').as('acAPI');
        // this.writeTextToField(selector, text);
        // cy.waitUntil(() => cy.get(selector).should('not.have.class', 'ac_loading'));
        // cy.get('@acAPI.last');
        // this.retrySelect(liSelector, text);
    }

    // retrySelect(selector: string, value: string) {
    //     let retries = -1;
    //     function clickingAttachedElement() {
    //         cy.getAttachedElement(selector).contains(value, { matchCase: false }).then(($el) => {
    //             retries++;
    //             try {
    //                 expect(Cypress.dom.isAttached($el)).to.be.true;
    //                 cy.get(selector).contains(value, { matchCase: false }).click({ force: true });
    //             } catch (err) {
    //                 cy.wait(500);
    //                 if (retries > 7) throw new Error('Error in retries');
    //                 return this.clickingAttachedElement();
    //             }
    //         });
    //     }
    //     return clickingAttachedElement();
    // }

    // retryWrite(selector: string, value: string) {
    //     let retries = -1;
    //     function writingInAttachedElement() {
    //         cy.getAttachedElement(selector).then(($el) => {
    //             retries++;
    //             try {
    //                 cy.wrap($el).should('be.visible');
    //                 expect(Cypress.dom.isAttached($el)).to.be.true;
    //                 cy.getAttachedElement(selector).clear({ force: true }).type(value, { force: true });
    //             } catch (err) {
    //                 cy.wait(500);
    //                 if (retries > 7) throw new Error('Error in retries');
    //                 return writingInAttachedElement();
    //             }
    //         });
    //     }
    //     return writingInAttachedElement();
    // }

    // fillMATAutocompleteField(selector: string, text: string): void {
    //     cy.get(selector).clear().type(text);
    //     cy.wait(500);// TODO
    //     cy.waitUntil(() => cy.contains('mat-option', text, { matchCase: false }).should('be.visible'));
    //     cy.wait(500);// TODO
    //     this.retrySelect('mat-option', text);
    //     this.getElement(selector).should('contain.value', text);
    //     this.getElement(selector).invoke('attr', 'class').then(txt => { expect(txt).to.contains('ng-valid'); });

    // }
    // selectFormDropDownList(selector: string, text: any) {
    //     cy.get(selector).select(text);
    // }
    // getElementText(selector: string): any {
    //     return this.getElement(selector).invoke('text');
    // }
    // fillMultiselectField(selector: string, text: string): void {
    //     cy.get(selector).type(text)
    //         .get('li').contains(text, { matchCase: false }).click();
    // }
    // confirmJSALertDialog(): void {
    //     cy.on('window:confirm', () => true);
    // }
    getSelector(field: string, replaceChr: string = '-') {
        return field.toLowerCase().replace(/ /g, replaceChr);
    }
    // retryClick(selector: string) {
    //     let retries = -1;
    //     function clickingAttachedElement() {
    //         cy.getAttachedElement(selector).then(($el) => {
    //             retries++;
    //             try {
    //                 expect(Cypress.dom.isAttached($el)).to.be.true;
    //                 cy.wrap($el).click();
    //             } catch (err) {
    //                 cy.wait(500);
    //                 if (retries > 7) throw new Error('Error in retries');
    //                 return this.clickingAttachedElement();
    //             }
    //         });
    //     }
    //     return clickingAttachedElement();
    // }

    // // Front office functions
    // get multiSelectAutoCompleteFieldOptions() {
    //     return this.getElement(this.elementsSelectors.matOptions);
    // }

    // get selectedOptions() {
    //     return this.getElement(this.elementsSelectors.selectedMatOptions);
    // }

    // clickOnMultiSelectField(field: string) {
    //     this.click((String.format(this.elementsSelectors.multiSelectAutoCompleteField, this.getSelector(field))));
    // }

    // searchInMultiSelectAutocompleteFields(field: string, value: string) {
    //     this.clickOnMultiSelectField(field);
    //     this.writeTextToField((String.format(this.elementsSelectors.searchInMultiSelectAutocompleteField, this.getSelector(field))), value);
    // }

    // selectOrUnselectFromMultiSelectField(field: string, values: string) {
    //     if (values.length) {
    //         const selections = values.split(',');
    //         selections.forEach(value => {
    //             this.searchInMultiSelectAutocompleteFields(field, value);
    //             this.retrySelect('mat-option', value);
    //         });
    //         this.writeTextToField((String.format(this.elementsSelectors.searchInMultiSelectAutocompleteField, this.getSelector(field))), '{esc}');
    //     }
    // }

    // selectFromDropDownMatField(field: string, state: string): void {
    //     this.chooseOptionFromMatSelectField(String.format(this.elementsSelectors.dropDownMatSelectField, this.getSelector(field)), state);
    // }

    // fillAutoCompleteField(field: string, value: string) {
    //     this.fillMATAutocompleteField(String.format(this.elementsSelectors.autoCompleteField, this.getSelector(field)), value);
    // }

    // addValueInInputField(field: string, value: string) {
    //     if (value.length) {
    //         this.writeTextToField(String.format(this.elementsSelectors.inputField, this.getSelector(field)), value);
    //     }
    // }
}