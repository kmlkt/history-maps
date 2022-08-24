import IStorageService from "../abstractions/storage-service";

class StorageService implements IStorageService{
    getSpeed(): number {
        const val = localStorage.getItem('speed');
        return val == null ? null : parseInt(val);
    }
    setSpeed(speed: number): void {
        localStorage.setItem('speed', speed.toString());
    }
    get3d(): boolean {
        const val = localStorage.getItem('is3d');
        return val == null ? null : val == 'true';
    }
    set3d(is3d: boolean): void {
        localStorage.setItem('is3d', is3d ? 'true' : 'false');
    }
    getBottomInfoVisible(): boolean {
        const val = localStorage.getItem('bottom-info-visible');
        return val == null ? null : val == 'true';
    }
    setBottomInfoVisible(visible: boolean): void {
        localStorage.setItem('bottom-info-visible', visible ? 'true' : 'false');
    }
}

export default StorageService;