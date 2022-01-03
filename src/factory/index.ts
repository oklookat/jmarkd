import { Preview, Heading, Bold, Italic, Blockquote, Code, Strikethrough, Link, Image, Anchor } from './basic'
import { toolbarConfig } from "../types";

export const factoryToolbarConfig: toolbarConfig = {
    names: ['preview', 'heading', 'bold', 'italic', 'strikethrough', 'link', 'image', 'anchor', 'blockquote', 'code'],
    elements: {
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