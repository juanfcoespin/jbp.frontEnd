import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DirectorioTelefonicoComponent } from './pages/directorio-telefonico/directorio-telefonico.component';
import { GestionParticipantesPuntosComponent } from './pages/gestion-participantes-puntos/gestion-participantes-puntos.component';
import { UpdateMontosCuentasComponent} from './pages/update-montos-cuentas/update-montos-cuentas.component';
import { BusinessServicesComponent } from './pages/business-services/business-services.component';
import { AuthGuard } from './auth.guard';
import { TestComponent } from './pages/test/test.component';
import { EnvioRetencionesComponent} from './pages/envio-retenciones/envio-retenciones.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'directorio', component: DirectorioTelefonicoComponent},
  {path: 'participantesPuntos', component: GestionParticipantesPuntosComponent},
  {path: 'envioRetenciones', component: EnvioRetencionesComponent, canActivate: [AuthGuard]},
  {path: 'updateMontoCuentas', component: UpdateMontosCuentasComponent},
  {path: 'test', component: TestComponent},
  {path: 'businessServices', component: BusinessServicesComponent,canActivate: [AuthGuard]},
  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
