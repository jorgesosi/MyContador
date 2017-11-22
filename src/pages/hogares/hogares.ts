import { MovimientosPage } from './../movimientos/movimientos';
import { AutenticarUsuario } from './../../providers/autenticar-usuario';
import { IonicPage, NavController, NavParams, ToastController, ViewController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HogarPage } from './../hogar/hogar';

@Component({
  selector: 'page-hogares',
  templateUrl: 'hogares.html',
})
export class HogaresPage {
  tipo;
  public items: any = [];
  public idUsuario;
  private baseURI: string = "http://localhost/Contador/";
  constructor(public navCtrl: NavController,
    public http: Http,
    public autenticarUsuario: AutenticarUsuario,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController) {  }
  
    ionViewWillEnter() {
    this.tipo = this.navCtrl.getType();
    console.log("tipo: ", this.tipo);
    this.idUsuario = this.autenticarUsuario.getUsuario();
    this.load(this.idUsuario);
  }
  load(id: number) {
    //this.http.get('http://localhost/Contador/hogares.php')
    let body: string = "key=ver&id=" + id,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "hogares.php";
    //console.log("load hogares",this.idUsuario)
    this.http.post(url, body, options)
      //this.http.get('./assets/php/retrieve-data.php')
      .map(res => res.json())
      .subscribe(data => {
        this.items = data;
        //console.log(data) ;       
      });
  }
  // Allow navigation to the AddTechnology page for creating a new entry
  addEntry() {
    // this.navCtrl.push('HogarPage');
    let modal = this.modalCtrl.create(
      HogarPage);
    modal.present();
  }
  seleccionar(param) {
    this.autenticarUsuario.cargarHogar(param)
    let idhogar = this.autenticarUsuario.getHogar();
    //console.log("idHogar: ", idhogar);
    //console.log("id: ", param);
    this.navCtrl.push(MovimientosPage);
  }
  viewEntry(param) {
    this.navCtrl.push('HogarPage', param);
  }
  deleteEntry(param) {
    this.navCtrl.push('HogarPage', param);
  }
}

