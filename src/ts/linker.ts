import DlView from "./gui/dl-view";
import InfoView from "./gui/info-view";
import View2d from "./gui/view-2d";
import IDlView from "./presenter/dl-view";
import IInfoView from "./presenter/info-view";
import Presenter from "./presenter/presenter";
import IView2d from "./presenter/view-2d";
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

export function getInfoView(): IInfoView{
    return new InfoView();
}

export function getDlView(): IDlView{
    return new DlView();
}