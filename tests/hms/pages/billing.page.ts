import { BasePage } from "../../../fixtures/base.page";
import { String } from 'typescript-string-operations';

export class BillingPage extends BasePage {
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
        successAlert: '.alert success',
        splitPosting: '#split_posting a',
        toolsOption: '#window{0} ul > li > a',
        postingCheckBoxOnWindow: '#id_select_window{0}_{1}',
        saveBtn: 'input[name="_save"]',
    };


    enterCashierCredentials(password: string): void {
        this.getElement(this.elementsSelectors.cashierLoginBody).then($body => {
            if ($body.find(this.elementsSelectors.billingPassword).length === 1) {
                this.writeTextToField(this.elementsSelectors.billingPassword, password);
                this.click(this.elementsSelectors.cashierLoginBtn);
            }
        });
    }

    clickOnToolsOnWindow(windowId: string): void {
        this.click(String.Format(this.elementsSelectors.toolsBtnInWindow, windowId));
    }

    // clickOnPaymentOnWindow(windowId: string): void {
    //     this.clickOnToolsOnWindow(windowId);
    //     this.click(String.Format(this.elementsSelectors.paymentBtnInWindow, windowId));
    //     this._paymentIframe = new PaymentIframe();
    // }

    // clickManualChargesButton(): void {
    //     this.getElement(this.elementsSelectors.manualChargesButton).click();
    //     this._manualChargesIframe = new ManualChargeIframe();
    // }

    selectPosting(windowNum: number = 1, postingNum: number = 1): void {
        this.getElement(String.format(this.elementsSelectors.postingCheckBoxOnWindow, windowNum, postingNum)).scrollIntoView().click();
    }

    clickSplit(window: number = 1): void {
        this.clickOnToolsOnWindow(window.toString());
        this.click(this.elementsSelectors.splitPosting);
    }

    CancelWindowSelectedPosting(windowNum: string = '1', postingNum: number = 1): void {
        this.selectPosting(+windowNum, postingNum);
        this.clickOnToolsOnWindow(windowNum);
        this.click(String.Format(this.elementsSelectors.cancelBtnInWindow, windowNum));
        this.writeTextToField(this.elementsSelectors.cancelCommentField, "reason");
        this.click(this.elementsSelectors.cancelSaveBtn);
    }

    selectFromTools(option: string, windowNum: string) {
        this.getElement(String.Format(this.elementsSelectors.toolsOption, windowNum)).contains(option).click();
    }
}