import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { VerificationComponent } from './components/verification/verification.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
    /**
     * is used in Angular routing configuration to specify a guard for protecting a route.
     * The AuthGuard class contains login to determine if the user is authorized to access the above route
     * based on there current logged in status
     */
    canActivate: [AuthGuard],
  },
  {
    path: 'album',
    loadChildren: () =>
      import('./pages/album/album.module').then((m) => m.AlbumModule),
    /**
     * is used in Angular routing configuration to specify a guard for protecting a route.
     * The AuthGuard class contains login to determine if the user is authorized to access the above route
     * based on there current logged in status
     */
    canActivate: [AuthGuard],
  },
  {
    path: 'photo',
    loadChildren: () =>
      import('./pages/photo/photo.module').then((m) => m.PhotoModule),
    /**
     * is used in Angular routing configuration to specify a guard for protecting a route.
     * The AuthGuard class contains login to determine if the user is authorized to access the above route
     * based on there current logged in status
     */
    canActivate: [AuthGuard],
  },
  { path: 'verification', component: VerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
