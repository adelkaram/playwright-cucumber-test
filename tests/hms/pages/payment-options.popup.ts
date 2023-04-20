import { BasePage } from "../../../fixtures/base.page";

export class PaymentOptionsPopUp extends BasePage {
    protected elementsSelectors = {
        kwentraPayBtn: '#btns-container > button:nth-child(2)',
        kwentraPayPopUp:'#fo-payment'
    };

    async selectKwentraPay(){
        await this.click(this.elementsSelectors.kwentraPayBtn);
        await this.getElement(this.elementsSelectors.kwentraPayPopUp);
    }

}