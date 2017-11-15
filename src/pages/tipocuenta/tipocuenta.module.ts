import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipocuentaPage } from './tipocuenta';

@NgModule({
  declarations: [
    TipocuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(TipocuentaPage),
  ],
})
export class TipocuentaModule {}
