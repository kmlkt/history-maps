import throwError from "../common/throw-error";

function throwNotFound(): never {
    throwError('a gui element was not found');
}

const controls = {
    eventYear: document.querySelector('#event-year') ?? throwNotFound(),
    ourAge: document.querySelector('#our-age') ?? throwNotFound(),
    beforeOurAge: document.querySelector('#before-our-age') ?? throwNotFound(),
    eventName: document.querySelector('#event-name') ?? throwNotFound(),
    eventPanel: document.querySelector('#event-panel') ?? throwNotFound(),
    countryName: document.querySelector('#country-name') ?? throwNotFound(),
    switcher: document.querySelector('#switch') ?? throwNotFound(),
    aboutLink: document.querySelector('#about-link') ?? throwNotFound(),
    simpleView: document.querySelector('#simple-view') ?? throwNotFound(),
    simpleViewCanvas: document.querySelector('#simple-view-canvas') ?? throwNotFound(),
    bottomInfo: document.querySelector('#bottom-info') ?? throwNotFound(),
    closeBottomInfo: document.querySelector('#bottom-info-close') ?? throwNotFound(),

    yearDialog: document.querySelector('#input-year-dialog') ?? throwNotFound(),
    inputYear: document.querySelector('#input-year') ?? throwNotFound(),
    yearDialogOk: document.querySelector('#input-year-dialog-ok') ?? throwNotFound(),
    yearDialogCancel: document.querySelector('#input-year-dialog-cancel') ?? throwNotFound(),
    showYearDialog: document.querySelector('#show-input-year-dialog') ?? throwNotFound(),

    pause: document.querySelector('#pause') ?? throwNotFound(),

    speedDialog: document.querySelector('#speed-dialog') ?? throwNotFound(),
    speedDialogPlus: document.querySelector('#speed-dialog-plus') ?? throwNotFound(),
    speedDialogMinus: document.querySelector('#speed-dialog-minus') ?? throwNotFound(),
    speedDialogValue: document.querySelector('#speed-dialog-value') ?? throwNotFound(),
    speedDialogOk: document.querySelector('#speed-dialog-ok') ?? throwNotFound(),
    speedDialogCancel: document.querySelector('#speed-dialog-cancel') ?? throwNotFound(),
    showSpeedDialog: document.querySelector('#show-speed-dialog') ?? throwNotFound(),
};

export default controls;
