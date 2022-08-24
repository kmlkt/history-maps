interface IButtonsView{
    onSwitchModeClicked: () => void;
    onPauseClicked: () => void;
    onSpeedClicked: () => void;
    onChangeYearClicked: () => void;
    setPauseButtonText(paused: boolean): void;
}

export default IButtonsView;