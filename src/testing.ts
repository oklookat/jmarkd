import './assets/testing.scss'
import jmarkd from './'
import { config } from './types'

const container = document.getElementsByClassName("testing")[0] as HTMLDivElement

const _config: config = {
    container: container
}

new jmarkd(_config)
