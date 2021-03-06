import "./assets/editor.scss";
import { Config } from "./types";
import ToolbarLoader from "./core/toolbar";
import EditorLoader from "./core/editor";
import ContainerLoader from "./core/container";

/** main class */
export default class jmarkd {

    public config: Config
    private editor: EditorLoader
    private toolbar: ToolbarLoader
    private container: ContainerLoader

    constructor(config: Config) {
        this.config = config
        this.editor = new EditorLoader(this.config)
        this.toolbar = new ToolbarLoader(this.config, this.editor.element)
        this.container = new ContainerLoader(this.config.container, this.toolbar.element, this.editor.element)
        // force check (change) height after appending element to container
        this.editor.resizer.changeHeight()
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