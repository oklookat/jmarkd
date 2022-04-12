/** main class */
export default class jmarkd {
    public config: Config
    constructor(config: Config)
    /** remove events etc */
    public destroy(): void
    /** get text from textarea */
    public save(): string
}

/** jmarkd uses this names for elements */
export enum DomName {
    container = 'jmarkd',
    toolbar = 'jmarkd__toolbar',
    ToolbarElement = 'jmarkd__toolbar__element',
    textarea = 'jmarkd__textarea',
    preview = 'jmarkd__preview'
}

/** main config */
export type Config = {
    /** jmarkd container */
    container: HTMLDivElement

    /** textarea placeholder */
    placeholder?: string

    /** toolbar */
    toolbar?: ToolbarConfig

    /** initial data */
    input?: string
}

/** if you want to see default elements and configs see './src/factory' dir */
export type ToolbarConfig = {

    /** names of elements displayed in toolbar. Like: ['heading', 'bold', 'link'] */
    displayed?: string[]

    /** toolbar elements */
    elements: {
        /** load this elements. {'element name': element} */
        boot?: Record<string, ToolbarElement>,

        /** elements config. {'element name': element config} */
        config?:  { [name: string]: any }
    }
}

export interface ToolbarElement {
    /** item icon. SVG (prefer)/HTML/etc */
    get icon(): string

    /** set config to element */
    setConfig?: (config: any) => void

    /** get shortcut (KeyboardEvent.code). Returns array like ['ControlLeft', 'KeyA'] */
    getShortcut?: () => string[]

    /** when click on item */
    onClick(textarea: HTMLTextAreaElement): void
}