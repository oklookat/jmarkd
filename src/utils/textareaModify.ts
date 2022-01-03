/** modify textarea? ok. */
export default class TextareaModify {

    /** emit valuechange event */
    private static fireValue(ctx: any, value: string) {
        const evt = new CustomEvent('valuechange', {
            bubbles: true,
            cancelable: false,
            detail: value
        })
        ctx.dispatchEvent(evt)
    }

    /** emit displaychange event */
    private static fireDisplay(ctx: any, value: string) {
        const evt = new CustomEvent('displaychange', {
            bubbles: true,
            cancelable: false,
            detail: value
        })
        ctx.dispatchEvent(evt)
    }

    /** get property descriptor */
    private static getProtoDesc(ctx: any, prop: string): PropertyDescriptor | undefined {
        const prototype = Object.getPrototypeOf(ctx)
        const protoDesc = Object.getOwnPropertyDescriptor(prototype, prop)
        if (!protoDesc) {
            return undefined
        }
        return protoDesc
    }

    /** fire valuechange event when textarea.value changed. 
     * Overrides textarea.value getter and setter.
     * @returns function to set textarea.value standard behavior */
    public static value(el: HTMLTextAreaElement): () => void {
        const prop = 'value'
        // reset
        const defaultProtoDesc = this.getProtoDesc(el, prop)
        const resetter = () => {
            if (!defaultProtoDesc) {
                return
            }
            Object.defineProperty(el, prop, defaultProtoDesc)
        }
        // set
        const _this = this
        Object.defineProperty(el, prop, {
            enumerable: true,
            configurable: true,
            get: function () {
                const protoDesc = _this.getProtoDesc(this, prop)
                if (!protoDesc || !protoDesc.get) {
                    return undefined
                }
                return protoDesc.get.call(this)
            },
            set: function (newValue) {
                const protoDesc = _this.getProtoDesc(this, prop)
                if (!protoDesc || !protoDesc.set) {
                    return false
                }
                // set value
                protoDesc.set.call(this, newValue)
                _this.fireValue(this, newValue)
                return true
            },
        });
        return resetter
    }

    /** fire displaychange event when textarea.style.display changed. 
     * Overrides textarea.style.display property.
     * @returns function to set textarea.style.display standard behavior */
    public static display(el: HTMLTextAreaElement): () => void {
        const _this = this
        const prop = 'display'
        // set
        Object.defineProperty(el.style, prop, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this.getPropertyValue(prop)
            },
            set: function (newValue) {
                this.setProperty(prop, newValue);
                _this.fireDisplay(el, newValue)
                return true
            },
        })
        // reset
        const resetter = () => {
            Object.defineProperty(el.style, prop, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return this.getPropertyValue(prop)
                },
                set: function (newValue) {
                    this.setProperty(prop, newValue);
                    return true
                },
            })
        }
        return resetter
    }

}