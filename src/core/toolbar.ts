import { Config, ToolbarConfig, ToolbarElement } from "../types";
import DOM from "./dom";
import Logger from "../utils/logger";
import Shortcutter from "../utils/shortcutter";
import Utils from "../utils";
import Factory from "../factory";

/** loads toolbar */
export default class ToolbarLoader {

    /** creates shortcuts */
    private shortcutter: Shortcutter | undefined

    /** toolbar element */
    public element: HTMLDivElement

    /** editor textarea */
    private textarea: HTMLTextAreaElement

    /** editor config */
    private config: Config

    /** toolbar config */
    private toolbarConfig: ToolbarConfig

    /** default toolbar config */
    private toolbarFactory = Factory.toolbarConfig()

    constructor(config: Config, textarea: HTMLTextAreaElement) {
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
            this.toolbarConfig = this.toolbarFactory
            return
        }
        this.toolbarConfig = this.config.toolbar

        // check boot (elements)
        if (this.toolbarConfig.elements.boot) {
            if (this.toolbarFactory.elements.boot) {
                this.toolbarConfig.elements.boot = Object.assign(this.toolbarFactory.elements.boot, this.toolbarConfig.elements.boot)
            } else {
                this.toolbarConfig.elements.boot = this.toolbarConfig.elements.boot
            }

        } else {
            this.toolbarConfig.elements.boot = this.toolbarFactory.elements.boot
        }

        // check config (elements)
        if (this.toolbarConfig.elements.config) {
            if (this.toolbarFactory.elements.config) {
                this.toolbarConfig.elements.config = Object.assign(this.toolbarFactory.elements.config, this.toolbarConfig.elements.config)
            } else {
                this.toolbarConfig.elements.config = this.toolbarConfig.elements.config
            }

        } else {
            this.toolbarConfig.elements.config = this.toolbarFactory.elements.config
        }

        // set displayed items
        if(!this.toolbarConfig.displayed) {
            this.toolbarConfig.displayed = []
            for(const itemName in this.toolbarConfig.elements.boot!) {
                this.toolbarConfig.displayed.push(itemName)
            }
        }
    }

    /** load & append toolbar elements */
    private loadElements() {
        for (const name of this.toolbarConfig.displayed!) {
            if (!(name in this.toolbarConfig.elements.boot!)) {
                Logger.warn(`toolbar element with name '${name}' not found. Check your config.`)
                continue
            }
            const element = this.toolbarConfig.elements.boot![name]
            this.loadElement(name, element)
        }
    }

    private loadElement(name: string, el: ToolbarElement) {
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
        const isElements = !!(this.toolbarConfig.elements &&
            this.toolbarConfig.elements.config && name in this.toolbarConfig.elements.config && typeof el.setConfig === 'function')
        if (isElements) {
            const config = this.toolbarConfig.elements.config![name]
            // @ts-ignore
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