import { ToolbarConfig } from "../types";
import { Preview, Heading, Bold, Italic, Blockquote, Code, Strikethrough, Link, Image, Anchor } from './toolbar';

/** default configs */
export default class Factory {

    /** default toolbar config */
    public static toolbarConfig(): ToolbarConfig {
        return {
            displayed: ['preview', 'heading', 'bold', 'italic', 'strikethrough', 'link', 'image', 'anchor', 'blockquote', 'code'],
            elements: {
                boot: {
                    'preview': new Preview(),
                    'heading': new Heading(),
                    'bold': new Bold(),
                    'italic': new Italic(),
                    'strikethrough': new Strikethrough(),
                    'link': new Link(),
                    'image': new Image(),
                    'anchor': new Anchor(),
                    'blockquote': new Blockquote(),
                    'code': new Code(),
                }
            }
        }
    }
    
}