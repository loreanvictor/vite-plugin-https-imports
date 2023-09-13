import { Timer, observe } from 'https://esm.sh/quel'


const target = document.querySelector('h1')
const timer = new Timer(1000)

observe($ => target.textContent = $(timer))
