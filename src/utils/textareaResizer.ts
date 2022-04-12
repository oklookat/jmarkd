import TextareaModify from "./textareaModify"

/** resize textarea? ok. */
export default class TextareaResizer {

    /** min textarea height */
    private minHeight = 204
    private textarea: HTMLTextAreaElement
    private resizeTimeout: NodeJS.Timeout | undefined
    // events
    private _changeHeight = this.changeHeight.bind(this)
    private _onWindowResize = this.onWindowResize.bind(this)
    // mod
    private resetValue: () => void
    private resetDisplay: () => void

    constructor(textarea: HTMLTextAreaElement) {
        this.resetValue = TextareaModify.value(textarea)
        this.resetDisplay = TextareaModify.display(textarea)
        //
        this.textarea = textarea
        //
        this.manageEvents(true)
        this.changeHeight()
    }

    public destroy() {
        this.manageEvents(false)
        if (this.textarea) {
            this.resetValue()
            this.resetDisplay()
        }
    }

    /** add or remove events */
    private manageEvents(add: boolean) {
        const action = add ? 'addEventListener' : 'removeEventListener'
        window[action]('resize', this._onWindowResize)
        //
        if (!this.textarea) {
            return
        }
        this.textarea[action]('input', this._changeHeight)
        this.textarea[action]('change', this._changeHeight)
        // custom events
        this.textarea[action]('displaychange', this._changeHeight)
        this.textarea[action]('valuechange', this._changeHeight)
    }

    public changeHeight() {
        // set min height #1
        this.textarea.style.height = `${this.minHeight}px`
        // check heights
        const height = this.textarea.clientHeight
        let scrollHeight = this.textarea.scrollHeight
        const correct = scrollHeight === height
        if (correct) {
            return
        }
        // set min height #2
        if (scrollHeight < this.minHeight) {
            scrollHeight = this.minHeight
        }
        // set final height
        this.textarea.style.height = `${scrollHeight}px`
    }

    private onWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout)
        }
        this.resizeTimeout = setTimeout(() => {
            this.changeHeight()
        }, 500)
    }

}