import './assets/style.scss'
import Core from './'
import { config } from './types'

const container = document.getElementsByClassName("testing")[0] as HTMLDivElement

const config: config = {
    container: container
}

// @ts-ignore
const core = new Core(config)

