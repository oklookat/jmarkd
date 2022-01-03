import { factoryToolbarConfig } from "../../factory";
import { config, toolbarElement, toolbarElements } from "../../types";
import DOM from "../dom";
import Logger from "../../utils/logger";
import Shortcutter from "../../utils/shortcutter";
import { firstCharToUpper } from "../../utils";

/** loads toolbar */
export default class ToolbarLoader {

    /** toolbar element */
    public element: HTMLDivElement
    /** editor textarea */
    private textarea: HTMLTextAreaElement
    /** global config */
    private config: config
    /** creates shortcuts */
    private shortcutter: Shortcutter | undefined
    /** toolbar names like ['header', 'link', 'image'] */
    private names: string[] = factoryToolbarConfig.names!
    /** elements a.k.a toolbar plugins */
    private elements: toolbarElements = factoryToolbarConfig.elements!
    /** elements config */
    private elementsConfig: { [name: string]: any } | undefined

    constructor(config: config, textarea: HTMLTextAreaElement) {
        this.config = config
        this.textarea = textarea
        this.element = DOM.createToolbar()
        this.checkConfig()
        this.loadElements()
    }

    public destroy() {
        if (this.shortcutter) {
            this.shortcutter.destroy()
        }
    }

    /** check config, set factory items */
    private checkConfig() {
        if (!this.config.toolbar) {
            return
        }
        if (this.config.toolbar.names) {
            this.names = this.config.toolbar.names
        }
        if (this.config.toolbar.elements) {
            this.elements = Object.assign(this.config.toolbar.elements, factoryToolbarConfig.elements)
        }
        if (this.config.toolbar.elementsConfig) {
            this.elementsConfig = this.config.toolbar.elementsConfig
        }
    }

    /** load & append toolbar elements */
    private loadElements() {
        if (!this.names) {
            return
        }
        for (const name of this.names) {
            // check if defined in names
            const element = this.elements[name]
            if (!element) {
                Logger.warn(`toolbar element with name ${name} not found`)
                continue
            }
            this.loadElement(name, element)
        }
    }

    private loadElement(name: string, el: toolbarElement) {
        // add shortcut if exists
        if (el.getShortcut) {
            if (!this.shortcutter) {
                this.shortcutter = new Shortcutter()
            }
            this.shortcutter.addAction({
                shortcut: el.getShortcut(),
                callback: () => {
                    el.onClick(this.textarea)
                }
            })
        }
        // provide config if exists
        if (this.elementsConfig && name in this.elementsConfig && el.setConfig) {
            const config = this.elementsConfig[name]
            el.setConfig(config)
        }
        // create item
        const toolbarItem = DOM.createToolbarItem(el.icon)
        toolbarItem.title = firstCharToUpper(name)
        toolbarItem.onclick = () => {
            el.onClick(this.textarea)
        }
        this.element.appendChild(toolbarItem)
    }

}