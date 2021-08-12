import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent implements OnInit {

  date = new Date();
  constructor(@Inject("data") public data: any, @Inject("dialogRef") public dialogRef: any) { }

  ngOnInit(): void {
  }

}
