export interface IEditableElements {
    writeTextToField(fieldSelector: string, text: string): void;
    fillHMSAutocompleteField(selector: string, text: string): void;
    getSelector(field: string, replaceChr: string): String;
}

export interface INonEditableElements {
    click(selector: string, forceClick: boolean, timeout: number): void;
    getSelector(field: string, replaceChr: string): String;
}