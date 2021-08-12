import { Component, Inject, Injector, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { DialogRef } from "./dialog.service";

@Component({
    selector: 'app-custom-dialog',
    template: `
    <div class="dialog-wrapper">
        <ng-template #ref></ng-template>
    </div>`,
    styles: [
        `
        .dialog-wrapper{
            background:white;
            padding:16px;
            border-radius:5px;
            box-shadow:0 0 10px 2px rgba(0,0,0,0.5);
        }
        `
    ]
})
export class CustomDialogComponent {
    @ViewChild("ref", { read: ViewContainerRef }) containerRef!: ViewContainerRef;
    constructor(
        @Inject("dialogRef") private dialogRef: DialogRef,
        @Inject("element") private element: any,
        @Inject("data") private data: any,
        private cdRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }
    ngAfterViewInit() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.element);
        this.containerRef.createComponent(factory, undefined, Injector.create(
            {
                providers: [
                    { provide: 'dialogRef', useValue: this.dialogRef },
                    { provide: 'data', useValue: this.data }
                ],
            }));
        this.cdRef.detectChanges();
    }
}