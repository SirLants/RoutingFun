import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { Page4Component } from './pages/page4/page4.component';
import { Page5Component } from './pages/page5/page5.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent, children: [
    { path: 'page-1', component: Page1Component },
    { path: 'page-2', component: Page2Component },
    { path: 'page-3', component: Page3Component },
    { path: 'page-4', component: Page4Component },
    { path: 'page-5', component: Page5Component },
  ]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
