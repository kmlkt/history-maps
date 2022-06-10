import {init, addModel, clearModels, getElement} from "./renderer.js";

const response = await fetch('./data/events.json');
const events = await response.json();

const eventYear = document.querySelector('#event-year');
const eventName = document.querySelector('#event-name');
const countryName = document.querySelector('#country-name');
const switcher = document.querySelector('#switch');
const simpleView = document.querySelector('#simple-view');

let is3D = true;
let worldId;

init('./data/worlds/' + events[0].WorldId + '/base.3mf', () => {
    eventYear.textContent = yearToStr(events[0].Year);
    eventName.textContent = events[0].Name;

    switcher.removeAttribute("hidden");
    switcher.textContent = "2D";
    switcher.addEventListener('click', switchView)
});

const threeElement = getElement();


loadNext().then();

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function yearToStr(year){
    if(year < 0)
        return -year + ' г. до н.э.'
    return year + ' г. н.э.'
}

let i = 0;
async function loadNext() {
    await sleep(10000);
    const event = events[i];
    worldId = event.WorldId;
    if(is3D){
        const r = await fetch('./data/worlds/' + event.WorldId +'/countries.json');
        const countries = await r.json();
        let textPrinted = false;
        clearModels();
        countries.Countries.forEach(c => {
            addModel('./data/worlds/' + event.WorldId + '/' + c + '.3mf', c, () => {
                if(!textPrinted){
                    eventYear.textContent = yearToStr(event.Year);
                    eventName.textContent = event.Name;
                    textPrinted = true;
                }
            });
        });
    } else {
        simpleView.setAttribute('src', './data/worlds/' + event.WorldId +'.bmp');
        eventYear.textContent = yearToStr(event.Year);
        eventName.textContent = event.Name;
    }
    i+=1;
    if(i < events.length)
        await loadNext();
}

async function switchView(event) {
    if(is3D){
        eventYear.className = 'event-year-dark';
        eventName.className = 'event-name-dark';
        countryName.className = 'country-name-dark';
        threeElement.setAttribute('hidden', '');
        simpleView.removeAttribute('hidden');
        if(worldId)
            simpleView.setAttribute('src', './data/worlds/' + worldId +'.bmp');
        switcher.textContent = '3D';
    } else {
        eventYear.className = 'event-year';
        eventName.className = 'event-name';
        countryName.className = 'country-name';
        simpleView.setAttribute('hidden', '');
        threeElement.removeAttribute('hidden');
        if(worldId){
            const r = await fetch('./data/worlds/' + worldId +'/countries.json');
            const countries = await r.json();
            clearModels();
            countries.Countries.forEach(c => {
                addModel('./data/worlds/' + worldId + '/' + c + '.3mf', c, () => {});
            });
        }
        switcher.textContent = '2D';
    }
    is3D = !is3D;
}