import { DomName } from '../types'

/** helps you with DOM manipulations */
export default class DOM {

    /** create main container */
    public static createContainer(): HTMLDivElement {
        const el = document.createElement('div')
        el.className = DomName.container
        return el
    }

    /** create container for toolbar preview item */
    public static createPreviewContainer(): HTMLDivElement {
        const el = document.createElement('div')
        el.className = DomName.preview
        return el
    }

    /** create textarea */
    public static createTextarea(): HTMLTextAreaElement {
        const el = document.createElement('textarea')
        el.className = DomName.textarea
        return el
    }

    /** create toolbar */
    public static createToolbar(): HTMLDivElement {
        const el = document.createElement('div')
        el.className = DomName.toolbar
        return el
    }

    /** create toolbar item */
    public static createToolbarItem(icon: string): HTMLDivElement {
        const el = document.createElement('div')
        el.className = DomName.ToolbarElement
        el.innerHTML = icon
        return el
    }
}