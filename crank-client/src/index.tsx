import { createElement } from '@bikeshaving/crank'
import { renderer } from '@bikeshaving/crank/dom'
import htm from 'htm'

const html = htm.bind(createElement)

function Greeting({ name = 'World '}) {
    return html`<div> Hello ${name}</div>`
}

renderer.render(<Greeting />, document.body)