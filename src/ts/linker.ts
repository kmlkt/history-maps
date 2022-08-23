import ButtonsView from "./gui/buttons-view";
import DlView from "./gui/dl-view";
import InfoView from "./gui/info-view";
import LabelView from "./gui/label-view";
import View2d from "./gui/view-2d";
import View3d from "./gui/view-3d";
import IButtonsView from "./presenter/buttons-view";
import IDlView from "./presenter/dl-view";
import IInfoView from "./presenter/info-view";
import ILabelView from "./presenter/label-view";
import Presenter from "./presenter/presenter";
import IView2d from "./presenter/view-2d";
import IView3d from "./presenter/view-3d";
import IEventService from "./services/abstractions/event-service";
import EventService from "./services/implementations/event-service";

export function getEventService(): IEventService{
    return new EventService();
}

export function getPresenter(): Presenter {
    return new Presenter(getEventService());
};

export function getView2d(): IView2d{
    return new View2d();
}

export function getView3d(): IView3d{
    return new View3d();
}

export function getInfoView(): IInfoView{
    return new InfoView();
}

export function getDlView(): IDlView{
    return new DlView();
}

export function getlabelView(): ILabelView{
    return new LabelView();
}

export function getButtonsView(): IButtonsView{
    return new ButtonsView();
}