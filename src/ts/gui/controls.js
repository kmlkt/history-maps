"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
Object.defineProperty(exports, "__esModule", { value: true });
var throw_error_1 = require("../common/throw-error");
function throwNotFound() {
    (0, throw_error_1.default)('a gui element was not found');
}
var controls = {
    eventYear: (_a = document.querySelector('#event-year')) !== null && _a !== void 0 ? _a : throwNotFound(),
    ourAge: (_b = document.querySelector('#our-age')) !== null && _b !== void 0 ? _b : throwNotFound(),
    beforeOurAge: (_c = document.querySelector('#before-our-age')) !== null && _c !== void 0 ? _c : throwNotFound(),
    eventName: (_d = document.querySelector('#event-name')) !== null && _d !== void 0 ? _d : throwNotFound(),
    eventPanel: (_e = document.querySelector('#event-panel')) !== null && _e !== void 0 ? _e : throwNotFound(),
    countryName: (_f = document.querySelector('#country-name')) !== null && _f !== void 0 ? _f : throwNotFound(),
    switcher: (_g = document.querySelector('#switch')) !== null && _g !== void 0 ? _g : throwNotFound(),
    aboutLink: (_h = document.querySelector('#about-link')) !== null && _h !== void 0 ? _h : throwNotFound(),
    simpleView: (_j = document.querySelector('#simple-view')) !== null && _j !== void 0 ? _j : throwNotFound(),
    simpleViewCanvas: (_k = document.querySelector('#simple-view-canvas')) !== null && _k !== void 0 ? _k : throwNotFound(),
    bottomInfo: (_l = document.querySelector('#bottom-info')) !== null && _l !== void 0 ? _l : throwNotFound(),
    closeBottomInfo: (_m = document.querySelector('#bottom-info-close')) !== null && _m !== void 0 ? _m : throwNotFound(),
    yearDialog: (_o = document.querySelector('#input-year-dialog')) !== null && _o !== void 0 ? _o : throwNotFound(),
    inputYear: (_p = document.querySelector('#input-year')) !== null && _p !== void 0 ? _p : throwNotFound(),
    yearDialogOk: (_q = document.querySelector('#input-year-dialog-ok')) !== null && _q !== void 0 ? _q : throwNotFound(),
    yearDialogCancel: (_r = document.querySelector('#input-year-dialog-cancel')) !== null && _r !== void 0 ? _r : throwNotFound(),
    showYearDialog: (_s = document.querySelector('#show-input-year-dialog')) !== null && _s !== void 0 ? _s : throwNotFound(),
    pause: (_t = document.querySelector('#pause')) !== null && _t !== void 0 ? _t : throwNotFound(),
    speedDialog: (_u = document.querySelector('#speed-dialog')) !== null && _u !== void 0 ? _u : throwNotFound(),
    speedDialogPlus: (_v = document.querySelector('#speed-dialog-plus')) !== null && _v !== void 0 ? _v : throwNotFound(),
    speedDialogMinus: (_w = document.querySelector('#speed-dialog-minus')) !== null && _w !== void 0 ? _w : throwNotFound(),
    speedDialogValue: (_x = document.querySelector('#speed-dialog-value')) !== null && _x !== void 0 ? _x : throwNotFound(),
    speedDialogOk: (_y = document.querySelector('#speed-dialog-ok')) !== null && _y !== void 0 ? _y : throwNotFound(),
    speedDialogCancel: (_z = document.querySelector('#speed-dialog-cancel')) !== null && _z !== void 0 ? _z : throwNotFound(),
    showSpeedDialog: (_0 = document.querySelector('#show-speed-dialog')) !== null && _0 !== void 0 ? _0 : throwNotFound(),
};
exports.default = controls;
