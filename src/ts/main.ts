//import RunTests from './tests/tests';

import { getDlView, getInfoView, getPresenter, getView2d } from "./linker"

window.onload = async () => {
    //await RunTests();
    await getPresenter().start(getView2d(), getInfoView(), getDlView());
}