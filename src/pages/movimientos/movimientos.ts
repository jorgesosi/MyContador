import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, ModalController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { AutenticarUsuario } from '../../providers/autenticar-usuario';
import 'rxjs/add/operator/map';
import { MovimientoPage } from '../movimiento/movimiento';
@Component({
  selector: 'page-movimientos',
  templateUrl: 'movimientos.html',
})
export class MovimientosPage {
  public items: any = [];
  private baseURI: string = "http://localhost/Contador/";
  idUsuario;
  idHogar;
  tipo;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public fb: FormBuilder,
    public autenticarUsuario: AutenticarUsuario,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController
  ) {
    if (this.navParams.get('idHogar') == '') {
      //this.idUsuario= this.autenticarUsuario.getUsuario();
      this.idHogar = this.autenticarUsuario.getHogar();
    } else {
      //this.idUsuario= this.navParams.get('idUser');
      this.idHogar = this.navParams.get('idHogar');
    }
  }
  //ionViewDidLoad() {
  ionViewWillEnter() {
    console.log('ionViewDidLoad Movimientos');
    this.tipo = this.navCtrl.getType();
    console.log("tipo: ", this.tipo);
    //this.idUsuario= this.autenticarUsuario.getUsuario();
    this.idHogar = this.autenticarUsuario.getHogar();
    //console.log("idUsuario",this.idUsuario,"idHogar ", this.idHogar)
    this.load(this.idHogar);
  }
  /* ionViewWillLeave(){
     this.viewCtrl.dismiss();
   }*/
  volver() {
    this.viewCtrl.dismiss();
  }
  load(id: number) {
    //this.http.get('http://localhost/Contador//cuentas.php')
    let body: string = "key=ver&id=" + id,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "movimientos.php";
    //console.log("load cuentas",id)
    this.http.post(url, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.items = data;
        //console.log("data cuentas",data);
        /*if(data!==''){
         console.log("data cuentas",data);
         this.items = data; 
       }else{
         this.items=[];
       }*/     });
  }
  addEntry() {
    if (this.tipo !== 'tab') {
      this.navCtrl.pop();
    }
    this.navCtrl.push(MovimientoPage, { 'idHogar': this.idHogar });
  }
  // Allow navigation to the AddTechnology page for amending an existing entry
  // (We supply the actual record to be amended, as this method's parameter, 
  // to the AddTechnology page
  viewEntry(param) {
    if (this.tipo !== 'tab') {
      this.navCtrl.pop();
    }
    this.navCtrl.push(MovimientoPage, param);
  }
  deleteEntry(param) {
    if (this.tipo !== 'tab') {
      this.navCtrl.pop();
    }
    this.navCtrl.push(MovimientoPage, param);
  }
}
