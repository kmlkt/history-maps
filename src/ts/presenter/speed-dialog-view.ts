interface ISpeedDialogView{
    show(currentSpeed: number): void;
    onCancelClicked: () => void;
    onOkClicked: (speed: number) => void;
}

export default ISpeedDialogView;