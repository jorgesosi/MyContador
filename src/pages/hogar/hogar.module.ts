import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HogarPage } from './hogar';

@NgModule({
  declarations: [
    HogarPage,
  ],
  imports: [
    IonicPageModule.forChild(HogarPage),
  ],
  exports:[
    HogarPage
  ]
})
export class HogarModule {}
