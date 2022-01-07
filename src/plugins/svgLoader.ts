// @ts-ignore
import { getExtractedSVG } from "svg-inline-loader"
import type { Plugin, TransformResult } from "rollup"
import fs from "fs"


// from: https://github.com/vitejs/vite/issues/1204#issuecomment-846189641
// TODO: remove this once https://github.com/vitejs/vite/pull/2909 gets merged

export type svgLoaderOptions = {
  classPrefix?: string
  idPrefix?: string
  removeSVGTagAttrs?: boolean
  warnTags?: boolean
  removeTags?: boolean
  warnTagAttrs?: boolean
  removingTagAttrs?: boolean
}


export default class SVGLoader implements Plugin {

  public name: 'vite-svg-patch-plugin'
  public options = () => { return null }

  constructor(options?: svgLoaderOptions) {
    if (options) {
      // @ts-ignore
      this.options = () => { return options }
    }
  }

  public transform(code: string, id: string): Promise<TransformResult> {
    const endsWithSvg = id.endsWith('.svg')
    if (!endsWithSvg) {
      return Promise.resolve(code)
    }
    return new Promise((resolve, reject) => {
      fs.readFile(id, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          reject(err)
        }
        const value = `export default '${getExtractedSVG(data, this.options)}'`
        resolve(value)
      })
    })
  }

}