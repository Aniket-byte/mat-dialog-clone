import { Inject, Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { createCustomElement } from '@angular/elements';
import { CustomDialogComponent } from "./custom-dialog.component";

export interface DialogRef {
    parentInstance: HTMLDivElement;
    close: (param?: any) => void;
    afterClosed: Subject<any>;
    data?: any;
}

@Injectable()
export class DialogService {
    elementIndex: number = 0;
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private injector: Injector
    ) { }
    openDialog(component: any, data?: any): DialogRef {
        let dialogRef: DialogRef = {
            parentInstance: this.document.createElement('div'),
            close: null,
            afterClosed: new Subject<any>()
        };
        dialogRef.data = data;
        dialogRef.close = (param?: any) => {
            dialogRef.afterClosed.next(param);
            dialogRef.parentInstance.remove();
        };

        this.document.body.appendChild(dialogRef.parentInstance);
        dialogRef.parentInstance.classList.add('overlay');

        const dialogWrapperElement = createCustomElement(CustomDialogComponent, {
            injector: Injector.create({
                providers: [
                    { provide: 'dialogRef', useValue: dialogRef },
                    { provide: 'element', useValue: component },
                    { provide: 'data', useValue: data }
                ],
                parent: this.injector
            })
        });

        customElements.define('custom-dialog-wrapper-' + this.elementIndex, dialogWrapperElement);

        dialogRef.parentInstance.innerHTML =
            `<custom-dialog-wrapper-${this.elementIndex}></custom-dialog-wrapper-${this.elementIndex}>`;
        this.elementIndex++;
        return dialogRef;
    }
}
