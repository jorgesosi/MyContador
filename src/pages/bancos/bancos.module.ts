import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BancosPage } from './bancos';

@NgModule({
  declarations: [
    BancosPage,
  ],
  imports: [
    IonicPageModule.forChild(BancosPage),
  ],
   })
export class BancosModule {}
