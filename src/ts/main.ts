//import RunTests from './tests/tests';

import { getButtonsView, getDlView, getInfoView, getlabelView, getPresenter, getSpeedDialogView, getView2d, getView3d, getYearDialogView } from "./linker"

window.onload = async () => {
    //await RunTests();
    await getPresenter().start(getView3d(), getView2d(), getInfoView(), getDlView(), getlabelView(), getButtonsView(), getYearDialogView(), getSpeedDialogView());
}