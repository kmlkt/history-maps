import throwError from "../common/throw-error";

function getElement(selector: string): Element {
    return document.querySelector('#event-year') ?? throwError(`Gui element "${selector}" was not found"`);
}

const controls = {
    eventYear: getElement('#event-year'),
    ourAge: getElement('#our-age'),
    beforeOurAge: getElement('#before-our-age'),
    eventName: getElement('#event-name'),
    eventPanel: getElement('#event-panel'),
    countryName: getElement('#country-name'),
    switcher: getElement('#switch'),
    aboutLink: getElement('#about-link'),
    simpleView: getElement('#simple-view'),
    simpleViewCanvas: getElement('#simple-view-canvas'),
    bottomInfo: getElement('#bottom-info'),
    closeBottomInfo: getElement('#bottom-info-close'),

    yearDialog: getElement('#input-year-dialog'),
    inputYear: getElement('#input-year'),
    yearDialogOk: getElement('#input-year-dialog-ok'),
    yearDialogCancel: getElement('#input-year-dialog-cancel'),
    showYearDialog: getElement('#show-input-year-dialog'),

    pause: getElement('#pause'),

    speedDialog: getElement('#speed-dialog'),
    speedDialogPlus: getElement('#speed-dialog-plus'),
    speedDialogMinus: getElement('#speed-dialog-minus'),
    speedDialogValue: getElement('#speed-dialog-value'),
    speedDialogOk: getElement('#speed-dialog-ok'),
    speedDialogCancel: getElement('#speed-dialog-cancel'),
    showSpeedDialog: getElement('#show-speed-dialog'),
};

export default controls;
