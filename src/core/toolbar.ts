import { config, toolbarElement, toolbarElements } from "../types";
import DOM from "./dom";
import Logger from "../utils/logger";
import Shortcutter from "../utils/shortcutter";
import Utils from "../utils";
import Factory from "../factory";

/** loads toolbar */
export default class ToolbarLoader {

    /** toolbar element */
    public element: HTMLDivElement
    /** editor textarea */
    private textarea: HTMLTextAreaElement
    /** editor config */
    private config: config
    /** creates shortcuts */
    private shortcutter: Shortcutter | undefined
    /** default toolbar config */
    private factory = Factory.toolbarConfig()
    /** names like ['header', 'link', 'image'] */
    private names: string[] = this.factory.names!
    /** elements a.k.a plugins */
    private elements: toolbarElements = this.factory.elements!
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
        this.shortcutter?.destroy()
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
            this.elements = Object.assign(this.config.toolbar.elements, this.factory.elements)
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
            // create shortcutter if not created
            if (!this.shortcutter) {
                this.shortcutter = new Shortcutter()
            }
            // add shortcut
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
        toolbarItem.title = Utils.firstCharToUpper(name)
        toolbarItem.onclick = () => {
            el.onClick(this.textarea)
        }
        this.element.appendChild(toolbarItem)
    }

}