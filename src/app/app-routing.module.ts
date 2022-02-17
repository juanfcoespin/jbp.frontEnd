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
import { EntregasUrbanoComponent } from './pages/entregas-urbano/entregas-urbano.component';
import { HojaRutaComponent } from './pages/hoja-ruta/hoja-ruta.component';
import { RptHojaRutaComponent } from './reportes/rpt-hoja-ruta/rpt-hoja-ruta.component';
import { RptReaccionesComponent } from './reportes/rpt-reacciones/rpt-reacciones.component';
import { UpdateNumFacturaExportacionComponent } from './pages/update-num-factura-exportacion/update-num-factura-exportacion.component';
import { RptFacturasHistoricasComponent } from './reportes/rpt-facturas-historicas/rpt-facturas-historicas.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'directorio', component: DirectorioTelefonicoComponent},
  {path: 'entregasUrbano', component: EntregasUrbanoComponent},
  {path: 'hojaRuta', component: HojaRutaComponent},
  {path: 'rptHojaRuta', component: RptHojaRutaComponent},
  {path: 'updateNumFacturaExportacion', component: UpdateNumFacturaExportacionComponent},
  {path: 'facturasHistoricas', component: RptFacturasHistoricasComponent},
  {path: 'reacciones', component: RptReaccionesComponent},
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
