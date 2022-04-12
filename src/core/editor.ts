import { Config } from "../types"
import DOM from "./dom"
import TextareaResizer from "../utils/textareaResizer"

export default class EditorLoader {

    public element: HTMLTextAreaElement
    private config: Config
    public resizer: TextareaResizer

    constructor(config: Config) {
        this.element = DOM.createTextarea()
        this.resizer = new TextareaResizer(this.element)
        this.config = config
        if (this.config.input) {
            this.element.value = this.config.input
        }
        if (this.config.placeholder) {
            this.element.placeholder = this.config.placeholder
        }
    }


    public destroy() {
        this.resizer.destroy()
    }

}