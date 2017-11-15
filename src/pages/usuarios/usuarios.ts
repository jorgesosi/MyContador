import { UsuarioPage } from './../usuario/usuario';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  public items : any = [];
  constructor(public navCtrl: NavController, 
              public http   : Http,
            public viewCtrl: ViewController) 
  {

  }


  ionViewWillEnter()
  {
     this.load();
  }
  ionViewWillLeave(){
    this.viewCtrl.dismiss();
   }


  // Retrieve the JSON encoded data from the remote server
  // Using Angular's Http class and an Observable - then
  // assign this to the items array for rendering to the HTML template
  load()
  {
     this.http.get('http://localhost/Contador//usuarios.php')
     //this.http.get('./assets/php/retrieve-data.php')
     .map(res => res.json())
     .subscribe(data => 
     {
        this.items = data; 
        console.log("data",data);        
     });
  }


  // Allow navigation to the AddTechnology page for creating a new entry
  addEntry()
  {
     this.navCtrl.push('UsuarioPage');
  }


  // Allow navigation to the AddTechnology page for amending an existing entry
  // (We supply the actual record to be amended, as this method's parameter, 
  // to the AddTechnology page
  viewEntry(param)
  {
     this.navCtrl.push('UsuarioPage', param);
  }
  deleteEntry(param){
      this.navCtrl.push('UsuarioPage', param);
  }

}
