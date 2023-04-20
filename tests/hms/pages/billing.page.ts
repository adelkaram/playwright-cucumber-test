import { BasePage } from "../../../fixtures/base.page";
import { String } from 'typescript-string-operations';
import { PaymentOptionsPopUp } from "./payment-options.popup";
import { KwentraPayPopUp } from "./kwentra-pay.popup";
import { PaymobIframe } from "../iframes/paymob.iframe";

export class BillingPage extends BasePage {
    protected url = "reservation/individualreservation/{0}/billing";
    protected elementsSelectors = {
        billingPassword: '#id_password',
        cashierLoginBtn: 'input[type="submit"]',
        manualChargesButton: '#add_posting',
        cashierLoginBody: 'body',
        toolsBtnInWindow: '#window{0} > div.window-header.portlet-title > div.btn-group > a',
        paymentBtnInWindow: '#window{0} > .window-header > .btn-group > .dropdown-menu > #open_payment > a',
        cancelBtnInWindow: '#window{0} > .window-header > .btn-group > .dropdown-menu > #cancel_postings > a',
        splitBtnWindow: '#window{0} > .window-header > .btn-group > .dropdown-menu > #split_posting > a',
        cancelCommentField: '#id_comment',
        cancelSaveBtn: '.default.btn.green-jungle',
        // amount: '.amount',
        splitPosting: '#split_posting a',
        toolsOption: '#window{0} ul > li > a',
        saveBtn: 'input[name="_save"]',
        confirmationPopUp: '#paragraph-container > p:nth-child(1)',

        // postings
        postingAmount: '#table{0} > tbody > tr:nth-child({1}) > td.amount',
        postingDepartment: '#table{0} > tbody > tr:nth-child({1}) > td:nth-child(3)',
        postingForeignAmount: '#table{0} tr:nth-child({1}) td:nth-child(6)',
        postingCheckBoxOnWindow: '#id_select_window{0}_{1}',
    };

    paymentOptionsPopUp = new PaymentOptionsPopUp(this.page);
    kwentraPayPopup = new KwentraPayPopUp(this.page);
    paymobIframe = new PaymobIframe(this.page);

    get confirmationPopUp() {
        return this.getElement(this.elementsSelectors.confirmationPopUp)
    }

    async enterCashierCredentials(password: string) {
        await this.writeTextToField(this.elementsSelectors.billingPassword, password);
        await this.click(this.elementsSelectors.cashierLoginBtn);
    }

    async clickOnToolsOnWindow(windowId: string) {
        await this.click(String.Format(this.elementsSelectors.toolsBtnInWindow, windowId));
    }

    async clickOnPaymentOnWindow(windowId: string) {
        await this.clickOnToolsOnWindow(windowId);
        await this.click(String.Format(this.elementsSelectors.paymentBtnInWindow, windowId));
    }

    clickSplit(window: number = 1) {
        this.clickOnToolsOnWindow(window.toString());
        this.click(this.elementsSelectors.splitPosting);
    }

    CancelWindowSelectedPosting(windowNum: string = '1', postingNum: number = 1) {
        this.selectPosting(+windowNum, postingNum);
        this.clickOnToolsOnWindow(windowNum);
        this.click(String.Format(this.elementsSelectors.cancelBtnInWindow, windowNum));
        this.writeTextToField(this.elementsSelectors.cancelCommentField, "reason");
        this.click(this.elementsSelectors.cancelSaveBtn);
    }

    // selectFromTools(option: string, windowNum: string) {
    //     this.getElement(String.Format(this.elementsSelectors.toolsOption, windowNum)).contains(option).click();
    // }



    // postings
    async selectPosting(windowNum: number = 1, postingNum: number = 1): Promise<void> {
        await this.click(String.format(this.elementsSelectors.postingCheckBoxOnWindow, windowNum, postingNum));
    }

    getPostingAmount(window: number, postingRow: number) {
        return this.getElement(String.Format(this.elementsSelectors.postingAmount, window, (postingRow + 1)));
    }

    getPostingDepartment(window: number, postingRow: number) {
        return this.getElement(String.Format(this.elementsSelectors.postingDepartment, window, (postingRow + 1)));
    }

    getPostingForeignAmount(window: number, postingRow: number) {
        return this.getElement(String.Format(this.elementsSelectors.postingForeignAmount, window, (postingRow + 1)));
    }
}