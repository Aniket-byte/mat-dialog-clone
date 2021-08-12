import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { LoaderComponent } from "./shared/loader.component";
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { CustomDialogModule } from './custom-dialog/custom-dialog.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    LoaderComponent,
    DialogComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
