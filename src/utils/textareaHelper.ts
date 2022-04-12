import Logger from "./logger"

export default class TextareaHelper {

    public static getSelectedText(textarea: HTMLTextAreaElement): string {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selected = textarea.value.slice(start, end)
        return selected
    }

    /** insert value in cursor position */
    public static insertAtCursor(textarea: HTMLTextAreaElement, value: string) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        // set caret after text insertion
        const setNormalCaret = () => {
            const where = end + value.length
            textarea.selectionStart = where
            textarea.selectionEnd = where
        }

        // undo/redo support & another method to insert text
        const execMethod = (): boolean => {
            if (!document.execCommand) {
                Logger.warn('document.execCommand finally removed from browsers. Toolbar undo/redo may be broken')
                return false
            }
            textarea.focus()
            // prevent selected text replace
            textarea.selectionStart = end
            textarea.selectionEnd = end
            // insert
            document.execCommand("insertText", false, value)
            setNormalCaret()
            return true
        }

        // good method, but undo/redo not work
        const constructMethod = () => {
            const before = textarea.value.slice(0, start)
            const selected = this.getSelectedText(textarea)
            const after = textarea.value.slice(end)
            textarea.value = before + selected + value + after
            textarea.focus()
            setNormalCaret()
        }
        execMethod() || constructMethod()
    }

    /** insert first and last between selection. first+selected+last */
    public static insertBetweenSelection(textarea: HTMLTextAreaElement, first?: string, last?: string) {
        if (!first && !last) {
            return
        }
        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        // set caret after text insertion
        const setNormalCaret = () => {
            let where = end
            if (first) {
                where += first.length
            } else if (last) {
                where += last.length
            }
            textarea.selectionStart = where
            textarea.selectionEnd = where
        }

        // undo/redo support & another method to insert text
        const execMethod = (): boolean => {
            if (!document.execCommand) {
                Logger.warn('document.execCommand finally removed from browsers. Toolbar undo/redo may be broken')
                return false
            }
            textarea.focus()

            // fix caret after first inserted
            let lenOffset = 0

            // set first
            if (first) {
                lenOffset = first.length
                textarea.selectionStart = start
                textarea.selectionEnd = start
                document.execCommand("insertText", false, first)
            }

            // set last
            if (last) {
                textarea.selectionStart = end + lenOffset
                textarea.selectionEnd = end + lenOffset
                document.execCommand("insertText", false, last)
            }
            setNormalCaret()
            return true
        }

        // good method, but undo/redo not work
        const constructMethod = () => {
            const before = textarea.value.slice(0, start)
            const selected = this.getSelectedText(textarea)
            const after = textarea.value.slice(end)
            let text = before
            if (first) {
                text += first
            }
            text += selected
            if (last) {
                text += last
            }
            text += after
            // set
            textarea.value = text
            textarea.focus()
            setNormalCaret()
        }
        
        execMethod() || constructMethod()
    }


}