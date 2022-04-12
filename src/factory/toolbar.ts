// utils
import { ToolbarElement } from "../types";
import DOM from "../core/dom";
import TextareaHelper from "../utils/textareaHelper";
import Logger from "../utils/logger";
// icons
import previewIcon from "../assets/icons/preview.svg";
import headingIcon from "../assets/icons/heading.svg";
import boldIcon from "../assets/icons/bold.svg";
import italicIcon from "../assets/icons/italic.svg";
import linkIcon from "../assets/icons/link.svg";
import imageIcon from "../assets/icons/image.svg";
import anchorIcon from "../assets/icons/anchor.svg";
import blockquoteIcon from "../assets/icons/blockquote.svg";
import strikethroughIcon from "../assets/icons/strikethrough.svg";
import codeIcon from "../assets/icons/code.svg";

export class Preview implements ToolbarElement {
    private active = false

    private textareaDisplay = ''

    private element: HTMLDivElement | undefined

    private textarea: HTMLTextAreaElement

    private config: {
        parse: (data: string) => string
    }

    get icon(): string {
        return previewIcon
    }

    setConfig(config: any): void {
        this.config = config
    }

    onClick(textarea: HTMLTextAreaElement): void {
        this.textarea = textarea
        this.active = !this.active
        this.element = this.managePreview(this.active)
    }

    private managePreview(create: boolean): HTMLDivElement | undefined {
        if (!this.config || !this.config.parse || typeof this.config.parse !== 'function') {
            this.active = false
            Logger.err('parser not found. Pass parser to preview tool config.')
            return
        }

        if (!create) {
            this.element?.remove()
            this.textarea.style.display = this.textareaDisplay
            this.textarea.focus()
            window.scrollTo(0, 0)
            return
        }

        // get display value and hide textarea
        this.textareaDisplay = this.textarea.style.display
        this.textarea.style.display = 'none'

        // get elements
        const container = this.textarea.parentElement as HTMLDivElement
        const previewContainer = DOM.createPreviewContainer()

        const parsed = this.config.parse(this.textarea.value)

        // set preview html
        previewContainer.innerHTML = parsed
        container.insertBefore(previewContainer, this.textarea)
        return previewContainer
    }

}

export class Heading implements ToolbarElement {
    get icon(): string {
        return headingIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        const minHead = 1
        const maxHead = 6
        let hType = prompt(`Type (${minHead}-${maxHead}):`, minHead.toString())
        if (hType === null) { return }
        let typeNum = parseInt(hType, 10)
        if (isNaN(typeNum) || typeNum < minHead || typeNum > maxHead) {
            typeNum = minHead
        }
        let hash: string = ''
        for (let i = 0; i < typeNum; i++) {
            hash += "#"
        }
        hash += ' '
        TextareaHelper.insertBetweenSelection(textarea, hash)
    }

}

export class Bold implements ToolbarElement {
    get icon(): string {
        return boldIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        TextareaHelper.insertBetweenSelection(textarea, '**', '**')
    }
}

export class Italic implements ToolbarElement {
    get icon(): string {
        return italicIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        TextareaHelper.insertBetweenSelection(textarea, '*', '*')
    }
}

export class Strikethrough implements ToolbarElement {
    get icon(): string {
        return strikethroughIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        TextareaHelper.insertBetweenSelection(textarea, '~~', '~~')
    }
}

export class Link implements ToolbarElement {
    get icon(): string {
        return linkIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        let url = prompt('URL / Anchor:')
        if (!url) { return }
        const caption = TextareaHelper.getSelectedText(textarea) || prompt('Caption (optional):')
        if (caption === null) { return }
        const mark = caption ? `[${caption}](${url})` : `<${url}>`
        TextareaHelper.insertAtCursor(textarea, mark)
    }
}

export class Image implements ToolbarElement {
    get icon(): string {
        return imageIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        const url = prompt('URL:')
        if (!url) { return }
        const alt = prompt('Alt:', 'image')
        if (alt === null) { return }
        const caption = prompt('Caption (optional):')
        if (caption === null) { return }
        const mark = caption ? `![${alt}](${url} "${caption}")` : `![${alt}](${url})`
        TextareaHelper.insertAtCursor(textarea, mark)
    }
}

export class Anchor implements ToolbarElement {
    get icon(): string {
        return anchorIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        const name = prompt('Name:')
        if (!name) { return }
        TextareaHelper.insertAtCursor(textarea, `<a name="${name}"></a>`)
        textarea.focus()
    }
}

export class Blockquote implements ToolbarElement {
    get icon(): string {
        return blockquoteIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        TextareaHelper.insertBetweenSelection(textarea, '> ')
    }
}

export class Code implements ToolbarElement {
    get icon(): string {
        return codeIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        const lang = prompt("Language:")
        if (lang === null) {
            return
        }
        // construct
        const part = `\`\`\``
        let first = part
        if (lang) {
            first += lang
        }
        const newLine = `\n`
        first += newLine
        const last = newLine + part
        // set
        TextareaHelper.insertBetweenSelection(textarea, first, last)
    }
}