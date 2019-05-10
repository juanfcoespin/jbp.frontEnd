import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DirectorioTelefonicoComponent } from './pages/directorio-telefonico/directorio-telefonico.component';
import { GestionParticipantesPuntosComponent } from './pages/gestion-participantes-puntos/gestion-participantes-puntos.component';
import { UpdateMontosCuentasComponent} from './pages/update-montos-cuentas/update-montos-cuentas.component';
import { TestSingleRComponent} from './pages/test-single-r/test-single-r.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'directorio', component: DirectorioTelefonicoComponent},
  // {path: 'participantesPuntos', component: GestionParticipantesPuntosComponent, canActivate: [AuthGuard]},
  {path: 'participantesPuntos', component: GestionParticipantesPuntosComponent},
  {path: 'updateMontoCuentas', component: UpdateMontosCuentasComponent},
  {path: 'test', component: TestSingleRComponent},
  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
