import { toolbarElement } from "../types";
import DOM from "../core/dom";
// markdown parser
import { marked } from "marked";
// code highlighting
import hljs from "highlight.js";
import '../assets/highlight.scss';
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
import TextareaHelper from "../utils/textareaHelper";

export class Preview implements toolbarElement {
    private active = false
    private textareaDisplay = ''
    private element: HTMLDivElement | undefined
    private textarea: HTMLTextAreaElement
    private config: {
        sanitize(html: string): string
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
        // parse
        this.setupParser()
        let _html = marked.parse(this.textarea.value)
        // sanitize
        if (this.config) {
            _html = this.config.sanitize(_html)
        }
        // set preview html
        previewContainer.innerHTML = _html
        container.insertBefore(previewContainer, this.textarea)
        return previewContainer
    }

    private setupParser() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext'
                return hljs.highlight(code, { language }).value
            },
            // highlight.js css expects a top-level 'hljs' class.
            langPrefix: 'hljs language-',
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false,
        })
        // marked.use({ extensions: [this.spoilerExtension()] })
    }

    // // !>[title]content<! - spoiler. TODO: fix this, works not good. Idk how fix that.
    // private spoilerExtension(): (marked.TokenizerExtension & marked.RendererExtension) {
    //     return {
    //         name: 'spoiler',
    //         level: 'inline',
    //         start(src: string) {
    //             return src.match(/!>/gm)?.index || -1
    //         },
    //         tokenizer(src: string) {
    //             const rule = /!>\[(.+)]([\s\S]+?)<!/gm
    //             const match = rule.exec(src)
    //             if (!match) {
    //                 return
    //             }
    //             const raw = match[0]
    //             const title = this.lexer.inlineTokens(match[1].trim(), [])
    //             const content = this.lexer.inlineTokens(match[2].trim(), [])
    //             const token = {
    //                 type: 'spoiler',
    //                 raw: raw,
    //                 title: title,
    //                 content: content,
    //                 tokens: []
    //             }
    //             return token
    //         },
    //         renderer(token) {
    //             const title = this.parser.parseInline(token.title, this.parser.renderer)
    //             const content = this.parser.parseInline(token.content, this.parser.renderer)
    //             return `<details><summary>${title}</summary>${content}</details>`
    //         },
    //         //childTokens: ['title', 'content']    
    //     }
    // }
}

export class Heading implements toolbarElement {
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

export class Bold implements toolbarElement {
    get icon(): string {
        return boldIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        TextareaHelper.insertBetweenSelection(textarea, '**', '**')
    }
}

export class Italic implements toolbarElement {
    get icon(): string {
        return italicIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        TextareaHelper.insertBetweenSelection(textarea, '*', '*')
    }
}

export class Strikethrough implements toolbarElement {
    get icon(): string {
        return strikethroughIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        TextareaHelper.insertBetweenSelection(textarea, '~~', '~~')
    }
}

export class Link implements toolbarElement {
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

export class Image implements toolbarElement {
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

export class Anchor implements toolbarElement {
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

export class Blockquote implements toolbarElement {
    get icon(): string {
        return blockquoteIcon
    }

    onClick(textarea: HTMLTextAreaElement): void {
        TextareaHelper.insertBetweenSelection(textarea, '> ')
    }
}

export class Code implements toolbarElement {
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