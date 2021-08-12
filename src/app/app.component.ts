import { Component } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { DialogService } from './custom-dialog/dialog.service';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Practise-App';
  constructor(public loaderService: LoaderService, private dialogService: DialogService) {
    this.dialogService.openDialog(DialogComponentComponent, { message: "OOPs, an error occurred" }).afterClosed.subscribe(data => {
      console.log(data);
    });
    this.dialogService.openDialog(DialogComponentComponent, { message: "Dept. error" }).afterClosed.subscribe(data => {
      console.log(data);
    });
  }

  openDialog() {
    const dialogRef = this.dialogService.openDialog(DialogComponentComponent, { message: "Aniket Chaudhary" });
    // setTimeout(() => {
    //   dialogRef.close();
    // }, 2000);
  }
}
