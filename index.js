import {init, setUrl} from "./renderer.js";

let i = 0;
const response = await fetch('./data/events.json');
const events = await response.json();
init('./data/worlds/' + events[0].WorldId + '.3mf');
i++;
loadNext().then();

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function loadNext() {
    await sleep(10000);
    setUrl('./data/worlds/' + events[i].WorldId + '.3mf');
    i+=1;
    if(i < events.length)
        await loadNext();
}