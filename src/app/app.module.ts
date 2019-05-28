import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrowlModule } from 'primeng/primeng';

import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatSidenavModule, MatListModule} from '@angular/material';
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
  MatSlideToggleModule
} from '@angular/material';

// configuraciones
import { UrlServices, GlobalVariables } from './global';
// utils
import { CatalogUtils } from './utils/catalog.utils';
import { FormUtils} from './utils/forms.utils';
import { ArrayUtils } from './utils/arrayUtils';
import { StringUtils } from './utils/stringUtils';
// servicios
import {SocioNegocioService} from './services/socioNegocioService';
import {UserService} from './services/userService';
import {DirectorioTelefonicoService} from './services/directorioTelefonicoServices';
import {PeriodoService} from './services/periodoServices';
import {CuentaService} from './services/cuentaServices';
import {NotificationService} from './services/notificationService';
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
import { SbBaseComponent } from './controls/serviceBusiness/sb-base/sb-base.component';

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
    SbBaseComponent,
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
    NotificationService
  ],
  entryComponents: [AlertComponent, NewUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
