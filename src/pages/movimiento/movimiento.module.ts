import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovimientoPage } from './movimiento';

@NgModule({
  declarations: [
    MovimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(MovimientoPage),
  ],
  exports:[
    MovimientoPage
  ]
})
export class MovimientoModule {}
