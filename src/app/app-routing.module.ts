import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CountriesComponent } from './components/countries/countries.component';
import { DetailComponent } from './components/detail/detail.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'countries', component: CountriesComponent, canActivate: [AuthGuard]},
  {path: 'country/:cca3', component: DetailComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
