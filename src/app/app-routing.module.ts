import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CountriesComponent } from './components/countries/countries.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'countries', component: CountriesComponent},
  {path: 'countries/:id', component: DetailComponent}
  // { path: 'about', redirectTo: 'about'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
