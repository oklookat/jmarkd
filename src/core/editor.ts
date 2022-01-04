import { config } from "../types"
import DOM from "./dom"
import TextareaResizer from "../utils/textareaResizer"

export default class EditorLoader {

    public element: HTMLTextAreaElement
    private config: config
    private resizer: TextareaResizer

    constructor(config: config) {
        this.element = DOM.createTextarea()
        this.resizer = new TextareaResizer(this.element)
        this.config = config
        if (this.config.input) {
            this.element.innerText = this.config.input
        }
        if (this.config.placeholder) {
            this.element.placeholder = this.config.placeholder
        }
    }


    public destroy() {
        this.resizer.destroy()
    }

}