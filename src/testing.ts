import './assets/testing.scss'
import jmarkd from './'
import { Config, ToolbarElement } from './types'

const container = document.getElementsByClassName("testing")[0] as HTMLDivElement

class Say implements ToolbarElement {
    private what: string

    get icon() {
        return "Say"
    }

    setConfig(what: string) {
        this.what = what
    }

    getShortcut() {
        return ['AltLeft', 'KeyE']
    }

    onClick(textarea: HTMLTextAreaElement) {
        textarea.value += this.what
    }
}

const config: Config = {
    container: container,
    toolbar: {
        // displayed: ['say'] // if you need leave only your items or change item order
        elements: {
            boot: {
                say: new Say()
            },
            config: {
                say: '🌹'
            }
        }
    }
}

new jmarkd(config)
