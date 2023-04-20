import { BaseIframe } from "fixtures/base.iframe";

export class SplitPostingIframe extends BaseIframe {
    protected elementsSelectors = {
        irfameSelector: '.cboxIframe',
        amountToSplitField: '#id_amount_to_split',
        percentageToSplitField: '#id_percentage_to_split',
        saveButton: 'input[name="_save"]',
    };

    async splitPosting(amount?: string, percentage?: string): Promise<void> {
        if (amount) {
            await this.writeTextToField(this.elementsSelectors.amountToSplitField, amount, this.elementsSelectors.irfameSelector);
        } else if (percentage) {
            await this.writeTextToField(this.elementsSelectors.percentageToSplitField, percentage, this.elementsSelectors.irfameSelector);
        }
        await this.click(this.elementsSelectors.saveButton, this.elementsSelectors.irfameSelector)
    }

}
