import { mount } from 'svelte'
import './app.css'

import App from './App.svelte'

// Zum Testen:
//import App from './surveys/survey_NASA-TLX.svelte'
//import App from './surveys/survey_demographic.svelte'
//import App from './surveys/survey_ATI.svelte'

const target = document.getElementById('app')
if (!target) {
  throw new Error('Element #app wurde nicht gefunden')
}

const app = mount(App, {
  target,
})

export default app
