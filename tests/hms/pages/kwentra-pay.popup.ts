import { BasePage } from "../../../fixtures/base.page";

export class KwentraPayPopUp extends BasePage {
    protected elementsSelectors = {
        amountField: '#mat-input-2',
        paymentMethodField: '#mat-input-0',
        nextBtn: '#btn-container > button:nth-child(2)'
    };

    async selectPaymentMethod(paymentMethod: string) {
        await this.click(this.elementsSelectors.paymentMethodField);
        await this.page.getByText(paymentMethod).click();
    }

    async enterAmount(amount: string) {
        await this.writeTextToField(this.elementsSelectors.amountField, amount);
    }

    async clickNext() {
        await this.click(this.elementsSelectors.nextBtn);
    }

}