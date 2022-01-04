import "./assets/editor.scss";
import { config } from "./types";
import ToolbarLoader from "./core/toolbar";
import EditorLoader from "./core/editor";
import ContainerLoader from "./core/container";

/** main class */
export default class jmarkd {

    public config: config
    private editor: EditorLoader
    private toolbar: ToolbarLoader
    private container: ContainerLoader

    constructor(config: config) {
        this.config = config
        this.editor = new EditorLoader(this.config)
        this.toolbar = new ToolbarLoader(this.config, this.editor.element)
        this.container = new ContainerLoader(this.config.container, this.toolbar.element, this.editor.element)
    }

    public destroy() {
        this.editor.destroy()
        this.toolbar.destroy()
        this.container.destroy()
    }

    public save(): string {
        return this.editor.element.value
    }

}