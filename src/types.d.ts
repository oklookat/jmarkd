/** main class */
declare class jmarkd {
    public config: config
    constructor(config: config)
    /** remove events etc */
    public destroy(): void
    /** get text from textarea */
    public save(): string
}
export default jmarkd

/** jmarkd uses this names for elements */
export enum domName {
    container = 'jmarkd',
    toolbar = 'jmarkd__toolbar',
    toolbarElement = 'jmarkd__toolbar__element',
    textarea = 'jmarkd__textarea',
    preview = 'jmarkd__preview'
}

/** main config */
export type config = {
    /** jmarkd container */
    container: HTMLDivElement
    /** textarea placeholder */
    placeholder?: string
    /** toolbar */
    toolbar?: toolbarConfig
    /** initial data */
    input?: string
}

export type toolbarElements = Record<string, toolbarElement>
export type toolbarConfig = {
    /** names of current active elements. Like: header, bold, link */
    names?: string[]
    /** elements. {name: element} */
    elements?: toolbarElements
    /** elements config. name: config */
    elementsConfig?: { [name: string]: any }
}

export interface toolbarElement {
    /** item icon. SVG (prefer)/HTML/etc */
    get icon(): string
    /** set config to element */
    setConfig?: (config: any) => void
    /** get shortcut (KeyboardEvent.code). Returns array like ['ControlLeft', 'KeyA'] */
    getShortcut?: () => string[]
    /** when click on item */
    onClick(textarea: HTMLTextAreaElement): void
}