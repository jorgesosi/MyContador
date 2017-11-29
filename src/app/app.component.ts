import { AutenticarUsuario } from './../providers/autenticar-usuario';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, Headers, RequestOptions } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { IniciarsesionPage } from './../pages/iniciarsesion/iniciarsesion';
import { HomePage } from './../pages/home/home';
import { HogaresPage } from './../pages/hogares/hogares';
import { CuentasPage } from './../pages/cuentas/cuentas';
import { BancosPage } from './../pages/bancos/bancos';
import { UsuariosPage } from './../pages/usuarios/usuarios';
import { MovimientosPage } from './../pages/movimientos/movimientos';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = IniciarsesionPage;
  tabspage: any = TabsPage
  homepage: any = HomePage;
  iniciarsesion: any = IniciarsesionPage;
  usuarios: any = UsuariosPage;
  bancos: any = BancosPage;
  cuentas: any = CuentasPage;
  hogares: any = HogaresPage;
  movimientos: any = MovimientosPage;

  conectado: boolean;
  items = [];
  private baseURI: string = "http://localhost/Contador/";
  @ViewChild('contenido') contenido: NavController;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public http: Http,
    public menuCtrl: MenuController,
    public autenticarUsuario: AutenticarUsuario) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  menuOpened() {
    this.conectado = this.autenticarUsuario.estaConectado();
    console.log("open", this.conectado);
  }

  menuDraged() {
    this.conectado = this.autenticarUsuario.estaConectado();
    console.log("drag", this.conectado);
  }

  irPagina(pagina) {
    //this.contenido.setRoot(pagina);
    this.contenido.setRoot(pagina);
    //this.autenticarUsuario.usuarioEstaConectado=true;

    this.menuCtrl.close();
  }
  cerrarSesion() {
    let body: string = "key=cerrar",
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "cerrar.php";

    this.http.post(url, body, options)
    //this.autenticacionService.cerrarSesion();
    this.autenticarUsuario.cargarUsuario(null)
    this.autenticarUsuario.cambiarEstado(false);
    this.conectado = this.autenticarUsuario.estaConectado();
    this.contenido.setRoot(this.iniciarsesion);
    console.log('Usuario:', this.autenticarUsuario.getUsuario())
    this.http.get('http://localhost/Contador/cerrar.php')
      //this.http.get('./assets/php/retrieve-data.php')
      .map(res => res.json())
      .subscribe(data => {
        this.items = data;
        // console.log(data);       
      });
    this.menuCtrl.close();
  }
}
