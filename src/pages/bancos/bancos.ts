import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BancoPage } from './../banco/banco';
//@IonicPage()
@Component({
  selector: 'page-bancos',
  templateUrl: 'bancos.html',
})
export class BancosPage {
  tipo;
  public items: any = [];
  constructor(public navCtrl: NavController,
    public http: Http,
    public viewCtrl: ViewController) {
  }
  ionViewWillEnter() {
    this.tipo = this.navCtrl.getType();
    console.log("tipo: ", this.tipo);
    this.load();
  }
  /* ionViewWillLeave(){
     this.viewCtrl.dismiss();
   }*/
  // Retrieve the JSON encoded data from the remote server
  // Using Angular's Http class and an Observable - then
  // assign this to the items array for rendering to the HTML template
  load() {
    this.http.get('http://localhost/Contador/bancos.php')
      //this.http.get('./assets/php/retrieve-data.php')
      .map(res => res.json())
      .subscribe(data => {
        this.items = data;
      });
  }
  // Allow navigation to the AddTechnology page for creating a new entry
  addEntry() {
    this.navCtrl.push('BancoPage');
  }
  // Allow navigation to the AddTechnology page for amending an existing entry
  // (We supply the actual record to be amended, as this method's parameter, 
  // to the AddTechnology page
  viewEntry(param) {
    this.navCtrl.push('BancoPage', param);
  }
  deleteEntry(param) {
    this.navCtrl.push('BancoPage', param);
  }
}