import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IniciarsesionPage } from './iniciarsesion';

@NgModule({
  declarations: [
    IniciarsesionPage,
  ],
  imports: [
    IonicPageModule.forChild(IniciarsesionPage),
  ],
  exports:[
    IniciarsesionPage
  ]
})
export class IniciarsesionModule {}
