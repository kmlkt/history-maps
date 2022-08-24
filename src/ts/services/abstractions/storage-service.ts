interface IStorageService{
    getSpeed(): number;
    setSpeed(speed: number): void;
    get3d(): boolean;
    set3d(is3d: boolean): void;
    getBottomInfoVisible(): boolean;
    setBottomInfoVisible(visible: boolean): void;
}

export default IStorageService;