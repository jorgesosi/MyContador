import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UsuarioPage } from './../pages/usuario/usuario';
import { UsuariosPage } from './../pages/usuarios/usuarios';
import { HogaresPage } from './../pages/hogares/hogares';
import { HogarPage } from './../pages/hogar/hogar';
import { BancoPage } from './../pages/banco/banco';
import { BancosPage } from './../pages/bancos/bancos';
import { TiposcuentasPage } from './../pages/tiposcuentas/tiposcuentas';
import { CuentasPage } from './../pages/cuentas/cuentas';
import { CuentaPage } from './../pages/cuenta/cuenta';
import { IniciarsesionPage } from './../pages/iniciarsesion/iniciarsesion';
import { MovimientosPage } from './../pages/movimientos/movimientos';
import { MovimientoPage } from './../pages/movimiento/movimiento';




import { Http, HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AutenticarUsuario } from '../providers/autenticar-usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage, 
    UsuariosPage,
    BancosPage,
    HogaresPage,
    TiposcuentasPage,
    CuentasPage,
    CuentaPage,
    IniciarsesionPage,
    MovimientosPage,
    MovimientoPage
  
  ],
  imports: [
    BrowserModule,
    HttpModule,
   // IonicModule.forRoot(MyApp,
   // { tabsHideOnSubPages: true })
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    UsuariosPage,
    BancosPage,
    HogaresPage,
    TiposcuentasPage,
    CuentasPage,
    CuentaPage,
    IniciarsesionPage,
    MovimientosPage,
    MovimientoPage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutenticarUsuario
  ]
})
export class AppModule {}
