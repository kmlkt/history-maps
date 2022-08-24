interface IYearDialogView{
    show(currentYear: number): void;
    onCancelClicked: () => void;
    onOkClicked: (year: number) => void;
}

export default IYearDialogView;