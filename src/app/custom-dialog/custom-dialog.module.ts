import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CustomDialogComponent } from "./custom-dialog.component";
import { DialogService } from "./dialog.service";

@NgModule({
    declarations: [CustomDialogComponent],
    providers: [DialogService],
})
export class CustomDialogModule {
    constructor(@Optional() @SkipSelf() private customDialogModule: CustomDialogModule) {
        if (this.customDialogModule) {
            throw new Error("Module already imported");
        }
    }
}