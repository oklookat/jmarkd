import { domName } from '../types'

export default class DOM {

    public static createContainer(): HTMLDivElement {
        const el = document.createElement('div')
        el.className = domName.container
        return el
    }

    public static createToolbar(): HTMLDivElement {
        const el = document.createElement('div')
        el.className = domName.toolbar
        return el
    }

    public static createTextarea(): HTMLTextAreaElement {
        const el = document.createElement('textarea')
        el.className = domName.textarea
        return el
    }

    public static createToolbarItem(icon: string): HTMLDivElement {
        const container = document.createElement('div')
        container.className = domName.toolbarElement
        container.innerHTML = icon
        return container
    }
}