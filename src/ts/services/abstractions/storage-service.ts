interface IStorageService{
    getSpeed(): number;
    setSpeed(speed: number): void;
    get3d(): boolean;
    set3d(is3d: boolean): void;
}

export default IStorageService;