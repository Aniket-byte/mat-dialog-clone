import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, retryWhen, take, tap, catchError, switchMap } from "rxjs/operators";
import { LoaderService } from "./loader.service";

@Injectable({
    providedIn: 'root',
})
export class PostGuardService implements CanActivate {
    constructor(private router: Router, private loaderService: LoaderService) { }
    count = 0;
    canActivate(ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
        this.count = 0;
        this.loaderService.showLoader();
        return new Observable<boolean | UrlTree>(obs => {
            this.count != 2 ? obs.error({ message: "User Auth failed", code: "AUTH_F", status: "500" }) : obs.next(true);
        }).pipe(take(1), map(data => {
            let token = localStorage.getItem('loginToken');
            return token ? true : this.router.createUrlTree(["/"]);
        }), retryWhen(err => err.pipe(switchMap(data => new Observable<any>((obs) => {
            setTimeout(() => {
                obs.next({ message: "Servers available", code: "SRVR_S", status: 200 });
            }, 2000);
        }).pipe(take(1))), map(data => {
            this.count++;
            if (data.code === "SRVR_S" && this.count < 3) {
                return data.message;
            }
            throw new Error(data.code);
        }))), tap(data => {
            this.loaderService.hideLoader();
        }, err => {
            this.loaderService.hideLoader();
        }), catchError(err => {
            return of(false);
        }));
    }
}