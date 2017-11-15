import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BancoPage } from './banco';

@NgModule({
  declarations: [
    BancoPage,
  ],
  imports: [
    IonicPageModule.forChild(BancoPage),
  ],
  exports:[
    BancoPage
  ]
})
export class BancoModule {}
