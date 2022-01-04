import { domName } from '../types'

/** helps you with DOM manipulations */
export default class DOM {

    /** create main container */
    public static createContainer(): HTMLDivElement {
        const el = document.createElement('div')
        el.className = domName.container
        return el
    }

    /** create container for toolbar preview item */
    public static createPreviewContainer(): HTMLDivElement {
        const el = document.createElement('div')
        el.className = domName.preview
        return el
    }

    /** create textarea */
    public static createTextarea(): HTMLTextAreaElement {
        const el = document.createElement('textarea')
        el.className = domName.textarea
        return el
    }

    /** create toolbar */
    public static createToolbar(): HTMLDivElement {
        const el = document.createElement('div')
        el.className = domName.toolbar
        return el
    }

    /** create toolbar item */
    public static createToolbarItem(icon: string): HTMLDivElement {
        const el = document.createElement('div')
        el.className = domName.toolbarElement
        el.innerHTML = icon
        return el
    }
}