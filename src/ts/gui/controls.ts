import throwError from "../common/throw-error";

function getElement<T extends Element>(selector: string): T {
    return document.querySelector<T>(selector) ?? throwError(`Gui element "${selector}" was not found"`);
}
function getElements<T extends Element>(selector: string): NodeListOf<T> {
    return document.querySelectorAll<T>(selector);
}

const controls = {
    eventYear: getElement('#event-year'),
    ourAge: getElement('#our-age'),
    beforeOurAge: getElement('#before-our-age'),
    eventName: getElement('#event-name'),
    eventPanel: getElement('#event-panel'),
    countryName: getElement<HTMLDivElement>('#country-name'),
    switcher: getElement('#switch'),
    aboutLink: getElement('#about-link'),

    canvas3d: getElement<HTMLCanvasElement>('#canvas-3d'),
    canvas2d: getElement<HTMLCanvasElement>('#canvas-2d'),
    canvas2dImage: getElement<HTMLImageElement>('#canvas-2d-image'),

    bottomInfo: getElement('#bottom-info'),
    closeBottomInfo: getElement('#bottom-info-close'),

    yearDialog: getElement('#input-year-dialog'),
    yearDialogInput: getElement<HTMLInputElement>('#year-dialog-input'),
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

    eventNames(): NodeListOf<Element>{
        return getElements('.event-name-copy');
    }
};

export default controls;
