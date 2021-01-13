import { Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'analysis',
    loadChildren: () => import('src/app/analysis/analysis.module').then(m => m.AnalysisModule),
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

