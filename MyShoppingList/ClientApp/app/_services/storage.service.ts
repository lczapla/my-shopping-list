import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    public getItem(key: string): any {
        if (typeof localStorage === 'undefined')
            return null;
        return localStorage.getItem(key);
    }

    public setItem(key: string, data: string): void {
        if (typeof localStorage === 'undefined')
            return null;
        localStorage.setItem(key, data);
    }

    public removeItem(key: string): void {
        if (typeof localStorage === 'undefined')
            return null;
        localStorage.removeItem(key);
    }
}