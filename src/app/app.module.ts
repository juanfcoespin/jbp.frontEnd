import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrowlModule } from 'primeng/primeng';

import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatSidenavModule, MatListModule, MatPaginatorModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatAutocompleteModule,
  MatRadioModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatExpansionModule} from '@angular/material/expansion';
// configuraciones
import { UrlServices, GlobalVariables } from './global';
// utils
import { CatalogUtils } from './utils/catalog.utils';
import { FormUtils} from './utils/forms.utils';
import { ArrayUtils } from './utils/arrayUtils';
import { StringUtils } from './utils/stringUtils';
// servicios
import {PromotickServices} from './services/promotickServices';
import {SocioNegocioService} from './services/socioNegocioService';
import {UserService} from './services/userService';
import {DirectorioTelefonicoService} from './services/directorioTelefonicoServices';
import {PeriodoService} from './services/periodoServices';
import {CuentaService} from './services/cuentaServices';
import {BusinessServiceOrders} from './services/businessServiceOrders';
import {RetencionesServices } from './services/retencionesServices';
import {DocumentosEnviadosServices } from './services/documentosEnviadosServices';

// paginas
import { AlertComponent } from './controls/alert/alert.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { GestionParticipantesPuntosComponent } from './pages/gestion-participantes-puntos/gestion-participantes-puntos.component';
import { DirectorioTelefonicoComponent } from './pages/directorio-telefonico/directorio-telefonico.component';
import { UpdateMontosCuentasComponent } from './pages/update-montos-cuentas/update-montos-cuentas.component';
import { LoginComponent } from './pages/login/login.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { TestSingleRComponent } from './pages/test-single-r/test-single-r.component';
import { BusinessServicesComponent } from './pages/business-services/business-services.component';
import { ServiceBusinessComponent } from './controls/service-business/service-business.component';
import { TestComponent } from './pages/test/test.component';
import { EnvioRetencionesComponent } from './pages/envio-retenciones/envio-retenciones.component';
import { EstadoCuentaPtkComponent } from './pages/estado-cuenta-ptk/estado-cuenta-ptk.component';
import { DocumentosEnviadosComponent } from './pages/documentos-enviados/documentos-enviados.component';
import { EntregasUrbanoComponent } from './pages/entregas-urbano/entregas-urbano.component';
import { EntregaServices } from './services/entregaServices';
import { MatTableExporterModule } from 'mat-table-exporter';
import { HojaRutaComponent } from './pages/hoja-ruta/hoja-ruta.component';
import { TransportistaService } from './services/transportistaService';
import { RptHojaRutaComponent } from './reportes/rpt-hoja-ruta/rpt-hoja-ruta.component';
import { RptReaccionesComponent } from './reportes/rpt-reacciones/rpt-reacciones.component';
import { ReaccionesServices } from './services/reaccionesServices';
import { UpdateNumFacturaExportacionComponent } from './pages/update-num-factura-exportacion/update-num-factura-exportacion.component';
import { FacturaServices } from './services/facturaServices';

@NgModule({
  declarations: [
    AppComponent,
    TestSingleRComponent,
    LoginComponent,
    NewUserComponent,
    AlertComponent,
    PedidosComponent,
    GestionParticipantesPuntosComponent,
    DirectorioTelefonicoComponent,
    UpdateMontosCuentasComponent,
    BusinessServicesComponent,
    ServiceBusinessComponent,
    TestComponent,
    EnvioRetencionesComponent,
    EstadoCuentaPtkComponent,
    DocumentosEnviadosComponent,
    EntregasUrbanoComponent,
    HojaRutaComponent,
    RptHojaRutaComponent,
    RptReaccionesComponent,
    UpdateNumFacturaExportacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GrowlModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    GrowlModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableExporterModule,
    MatPaginatorModule 
  ],
  providers: [
    AuthGuard,
    UrlServices,
    GlobalVariables,
    ArrayUtils,
    CatalogUtils,
    FormUtils,
    StringUtils,
    SocioNegocioService,
    UserService,
    DirectorioTelefonicoService,
    PeriodoService,
    CuentaService,
    BusinessServiceOrders,
    RetencionesServices,
    PromotickServices,
    DocumentosEnviadosServices,
    EntregaServices,
    TransportistaService,
    ReaccionesServices,
    FacturaServices
  ],
  entryComponents: [AlertComponent, NewUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
