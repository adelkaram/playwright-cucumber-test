import { BaseIframe } from "../../../fixtures/base.iframe";

export class SplitPostingIframe extends BaseIframe {
    protected elementsSelectors = {
        amountToSplitField: '#id_amount_to_split',
        percentageToSplitField: '#id_percentage_to_split',
        saveButtonInWindowPopUp: 'input[name="_save"]',
    };

    constructor() {
        super();
    }

    async splitPosting(amount?: string, percentage?: string): Promise<void> {
        if (amount) {
            this.writeTextToField(this.elementsSelectors.amountToSplitField, amount);
        } else if (percentage) {
            this.writeTextToField(this.elementsSelectors.percentageToSplitField, percentage);
        }
        await this.page.frameLocator(this.commonIframeElements.popUpIframe).locator(this.elementsSelectors.saveButtonInWindowPopUp).click();
    }

}
