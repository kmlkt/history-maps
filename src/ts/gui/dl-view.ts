import IDlView from "../presenter/dl-view";
import controls from "./controls";

class DlView implements IDlView{
    setLight(){
        controls.eventYear.classList.remove('event-year-dark');
        controls.eventName.classList.remove('event-name-dark');
        controls.switcher.classList.remove('btn-dark');
        controls.aboutLink.classList.remove('btn-dark');
        controls.showYearDialog.classList.remove('btn-dark');
        controls.showSpeedDialog.classList.remove('btn-dark');
        controls.pause.classList.remove('btn-dark');
        controls.switcher.textContent = '2D';
        controls.beforeOurAge.classList.remove('event-year-dark');
        controls.ourAge.classList.remove('event-year-dark');
        controls.eventNames().forEach(x => x.classList.remove('event-name-dark'));
    }
    setDark() {
        controls.eventYear.classList.add('event-year-dark');
        controls.eventName.classList.add('event-name-dark');
        controls.switcher.classList.add('btn-dark');
        controls.aboutLink.classList.add('btn-dark');
        controls.showYearDialog.classList.add('btn-dark');
        controls.showSpeedDialog.classList.add('btn-dark');
        controls.pause.classList.add('btn-dark');
        controls.switcher.textContent = '3D';
        controls.beforeOurAge.classList.add('event-year-dark');
        controls.ourAge.classList.add('event-year-dark');
        controls.eventNames().forEach(x => x.classList.add('event-name-dark'));
    }
}

export default DlView;