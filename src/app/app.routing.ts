import { Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
  }
];

