export type action = {
    /** KeyboardEvent.code array */
    shortcut: string[]
    /** what to do when shortcut called */
    callback: () => void
}

/** add keyboard shortcuts? ok. */
export default class Shortcutter {

    /** pretty pressed keys + callback. Example: ['KeyB+KeyF': callback] */
    private actions: { [shortcut: string]: () => void } = {}

    /** pressed keys. Example: {KeyB: true, KeyF: true, KeyA: true} */
    private keysPressed: { [key: string]: boolean } = {}

    /** pressed keys. Example: KeyB+KeyF+KeyA */
    private keysPressedPretty: string = ''
    
    // events
    private _keyDown = this.onKeyDown.bind(this)
    private _keyUp = this.onKeyUp.bind(this)
    private _focusOut = this.onFocusOut.bind(this)

    constructor() {
        this.manageEvents(true)
    }

    public destroy() {
        this.manageEvents(false)
        this.resetPressedKeys()
    }

    private manageEvents(add: boolean) {
        const action = add ? 'addEventListener' : 'removeEventListener'
        // @ts-ignore
        document[action]('keyup', this._keyUp)
        // @ts-ignore
        document[action]('keydown', this._keyDown)
        // @ts-ignore
        document[action]('focusout', this._focusOut)
        // @ts-ignore
        document[action]('pointerout', this._focusOut)
    }

    /** add pretty shortcut with callback to actions */
    public addAction(action: action) {
        const short = action.shortcut.join("+")
        this.actions[short] = action.callback
    }

    private onKeyDown(evt: KeyboardEvent) {
        this.keysPressed[evt.code] = true
        this.setKeysPressedPretty()
        if (this.actions[this.keysPressedPretty]) {
            evt.preventDefault()
            this.actions[this.keysPressedPretty]()
        }
    }

    private onKeyUp(evt: KeyboardEvent) {
        delete this.keysPressed[evt.code]
        this.setKeysPressedPretty()
    }

    /** convert pressed keys array to value like: KeyB+KeyF+KeyA */
    private setKeysPressedPretty() {
        const tempPressed: string[] = []
        for (const pressed in this.keysPressed) {
            tempPressed.push(pressed)
        }
        this.keysPressedPretty = tempPressed.join("+")
    }

    /** moving between tabs / minimize / etc */
    private onFocusOut(ev: PointerEvent | FocusEvent) {
        if (ev instanceof PointerEvent) {
            // clear pressed keys only when pointer focused not in window
            if (ev.relatedTarget) {
                return
            }
        }
        this.resetPressedKeys()
    }

    private resetPressedKeys() {
        this.keysPressed = {}
        this.keysPressedPretty = ''
    }

}