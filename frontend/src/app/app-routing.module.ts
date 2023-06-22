import { RouterModule, Routes } from '@angular/router';

import { AppLayoutComponent } from './app-layout/app-layout.component';
import { LoginComponent } from './views/login/login.component';
import { UserInfoComponent } from './views/user-info/user-info.component';
//import { userInfo } from 'os';
import { NgModule } from '@angular/core';
import { PagenotfoundComponent } from './views/pagenotfound/pagenotfound.component';
import { AuthenticationGuardService } from './guards/authentication-guard.service';

const routes: Routes = [
  // no layout
  {
    path: "login",
    component: LoginComponent
  },
  
  { path: "", redirectTo: "login", pathMatch: "full" },
  // app routes
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (module) => module.DashboardModule
          ),
      },
    ],
    canActivate: [AuthenticationGuardService]
  },
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "userInfo",
        loadChildren: () =>
          import("./views/user-info/user-info.module").then(
            (module) => module.UserInfoModule
          ),
      },
    ],
    canActivate: [AuthenticationGuardService]
  },

  // redirect to page not found
  { path: "**", component: PagenotfoundComponent },
];


@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
