import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostGuardService } from "./core/services/post-guard.service";

import { HomeComponent } from "./home/home.component";
import { PostComponent } from "./post/post.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "post", component: PostComponent, canActivate: [PostGuardService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }