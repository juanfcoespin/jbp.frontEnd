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
import { GenerarQRComponent } from './pages/bodega/generar-qr/generar-qr.component';
import { ConsultaUbicacionComponent } from './pages/bodega/consulta-ubicacion/consulta-ubicacion.component';
import { ConsultaLoteComponent } from './pages/bodega/consulta-lote/consulta-lote.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { ConfDashComponent } from './pages/marketing/conf-dash/conf-dash.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'directorio', component: DirectorioTelefonicoComponent},
  {path: 'entregasUrbano', component: EntregasUrbanoComponent, canActivate: [AuthGuard]},
  {path: 'hojaRuta', component: HojaRutaComponent, canActivate: [AuthGuard]},
  {path: 'rptHojaRuta', component: RptHojaRutaComponent, canActivate: [AuthGuard]},
  {path: 'updateNumFacturaExportacion', component: UpdateNumFacturaExportacionComponent, canActivate: [AuthGuard]},
  {path: 'facturasHistoricas', component: RptFacturasHistoricasComponent, canActivate: [AuthGuard]},
  {path: 'reacciones', component: RptReaccionesComponent},
  {path: 'participantesPuntos', component: GestionParticipantesPuntosComponent, canActivate: [AuthGuard]},
  {path: 'envioRetenciones', component: EnvioRetencionesComponent, canActivate: [AuthGuard]},
  {path: 'updateMontoCuentas', component: UpdateMontosCuentasComponent},
  {path: 'test', component: TestComponent},
  {path: 'generarQR', component: GenerarQRComponent, canActivate: [AuthGuard]},
  {path: 'businessServices', component: BusinessServicesComponent,canActivate: [AuthGuard]},
  {path: 'consultaUbicacion', component: ConsultaUbicacionComponent},
  {path: 'consultaLote', component: ConsultaLoteComponent },
  {path: 'confDash', component: ConfDashComponent, canActivate: [AuthGuard]},
  {path: 'user', component: NewUserComponent},
  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
