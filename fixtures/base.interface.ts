export interface IEditableElements {
    writeTextToField(fieldSelector: string, text: string, iframeSelector?: string);
    getSelector(elementSelector: string, iframeSelector?: string);
}

export interface INonEditableElements {
    click(elementSelector: string, iframeSelector?: string);
    getSelector(field: string, replaceChr: string);
}