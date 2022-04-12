import DOM from "./dom"

export default class ContainerLoader {

    /** user container by config */
    public user: HTMLDivElement

    /** jmarkd container under user container */
    public self: HTMLDivElement

    /** toolbar element */
    public toolbar: HTMLDivElement
    
    /** editor / textarea */
    public editor: HTMLTextAreaElement

    constructor(user: HTMLDivElement, toolbar: HTMLDivElement, editor: HTMLTextAreaElement) {
        this.user = user
        this.self = DOM.createContainer()
        this.toolbar = toolbar
        this.editor = editor
        this.append()
    }

    public destroy() {
        if (this.user) {
            this.user.removeChild(this.self)
        }
    }

    private append() {
        this.self.append(this.toolbar)
        this.self.append(this.editor)
        this.user.append(this.self)
    }
}