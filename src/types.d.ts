/** editor */
export default class jmarkd {
    public config: config
    constructor(config: config)
    public destroy(): void
    public save(): string
}

/** element name */
export enum domName {
    container = 'jmarkd',
    toolbar = 'jmarkd__toolbar',
    toolbarElement = 'jmarkd__toolbar__element',
    textarea = 'jmarkd__textarea',
    preview = 'jmarkd__preview'
}

/** main config */
export type config = {
    /** in this container be editor stuff */
    container: HTMLDivElement
    /** textarea placeholder */
    placeholder?: string
    /** toolbar */
    toolbar?: toolbarConfig
    /** initial data */
    input?: string
}

export type toolbarConfig = {
    /** names of current active elements. Like: header, bold, link */
    names?: string[]
    /** elements. Element name: Element */
    elements?: toolbarElements
    /** elements config. Element name: Element config */
    elementsConfig?: { [name: string]: any }
}

export type toolbarElements = Record<string, toolbarElement>

export interface toolbarElement {
    /** item icon */
    get icon(): string
    /** set config to element */
    setConfig?: (config: any) => void
    /** get shortcut (KeyboardEvent.code). Returns array like ['ControlLeft', 'KeyA'] */
    getShortcut?: () => string[]
    /** when click on item */
    onClick(textarea: HTMLTextAreaElement): void
}