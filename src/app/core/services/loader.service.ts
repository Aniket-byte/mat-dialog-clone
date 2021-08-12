import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    loaderStateSub = new Subject<boolean>();
    showLoader() {
        this.loaderStateSub.next(true);
    }
    hideLoader() {
        this.loaderStateSub.next(false);
    }
}