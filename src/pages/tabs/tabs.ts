import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { UsuariosPage } from './../usuarios/usuarios';
import { HogaresPage } from './../hogares/hogares';
import { BancosPage } from './../bancos/bancos';
import { TiposcuentasPage } from './../tiposcuentas/tiposcuentas';
import { CuentasPage } from '../cuentas/cuentas';
import { MovimientosPage } from './../movimientos/movimientos';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = HogaresPage;
  tab4Root = CuentasPage;
  tab5Root = MovimientosPage;
  constructor() {
  }
}
