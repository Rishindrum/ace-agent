import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScheduleSetupComponent } from './components/schedule-setup/schedule-setup.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptor } from './interceptors/auth.interceptor';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'schedule-setup', component: ScheduleSetupComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    // We strictly need these two for the API and the UI components
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
};