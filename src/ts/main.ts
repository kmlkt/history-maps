//import RunTests from './tests/tests';

import { getDlView, getInfoView, getlabelView, getPresenter, getView2d, getView3d } from "./linker"

window.onload = async () => {
    //await RunTests();
    await getPresenter().start(getView3d(), getView2d(), getInfoView(), getDlView(), getlabelView());
}