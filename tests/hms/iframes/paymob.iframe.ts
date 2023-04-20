import { BaseIframe } from "../../../fixtures/base.iframe";
import { paymentCard } from "models/payment-card.model";


export class PaymobIframe extends BaseIframe {
    protected elementsSelectors = {
        paymobIframeSel: '#paymob-iframe',
        number: '#paymob_checkout > div:nth-child(1) > input[type=text]',
        holderName: '#paymob_checkout > div:nth-child(2) > input',
        month: '#paymob_checkout > div.inputDiv.cardExpire > input[type=text]:nth-child(1)',
        year: '#paymob_checkout > div.inputDiv.cardExpire > input[type=text]:nth-child(2)',
        csv: '#paymob_checkout > div:nth-child(4) > input[type=text]',
        payBtn: '#paymob_checkout > input.iframeBtn'
    };

    async pay(card: paymentCard) {
        await this.page.waitForTimeout(3000);
        await this.writeTextToField(this.elementsSelectors.number, card.cardNumber, this.elementsSelectors.paymobIframeSel);
        await this.writeTextToField(this.elementsSelectors.holderName, card.holderName, this.elementsSelectors.paymobIframeSel);
        await this.writeTextToField(this.elementsSelectors.month, card.month, this.elementsSelectors.paymobIframeSel);
        await this.writeTextToField(this.elementsSelectors.year, card.year, this.elementsSelectors.paymobIframeSel);
        await this.writeTextToField(this.elementsSelectors.csv, card.csv, this.elementsSelectors.paymobIframeSel);
        await this.click(this.elementsSelectors.payBtn, this.elementsSelectors.paymobIframeSel)
    }

}