import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { CuentaPage } from './../cuenta/cuenta';
import { MovimientosPage } from './../movimientos/movimientos';

import { AutenticarUsuario } from './../../providers/autenticar-usuario';

@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html',
})
export class CuentasPage {
  idUsuario;
  idHogar;
  tipoCuenta=[];
  tipo;
  public items : any = [];
  private baseURI: string  = "http://localhost/Contador/";

  //public bancos: any = [];
  constructor(public navCtrl: NavController,
              public autenticarUsuario:AutenticarUsuario ,
              public viewCtrl: ViewController,
              public http   : Http,
              public modalCtrl: ModalController){  }


  ionViewWillEnter(){
    this.tipo= this.navCtrl.getType();
    console.log("tipo: ",this.tipo);
    this.idUsuario= this.autenticarUsuario.getUsuario();
    this.idHogar= this.autenticarUsuario.getHogar();
    this.tipoCuenta=this.autenticarUsuario.getTipoCuenta();
    //console.log ("cuentas id hogar",this.tipoCuenta);
     this.load(this.idHogar);
     
     
  }
  /*ionViewdidLeave(){
    this.viewCtrl.dismiss();
  }*/

volver(){
  this.viewCtrl.dismiss();
}
  // Retrieve the JSON encoded data from the remote server
  // Using Angular's Http class and an Observable - then
  // assign this to the items array for rendering to the HTML template
  load(id:number)
  {
     //this.http.get('http://localhost/Contador//cuentas.php')
     let  body       : string = "key=ver&id="+ id,
     type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
     headers    : any     = new Headers({ 'Content-Type': type}),
     options    : any     = new RequestOptions({ headers: headers }),
     url        : any     = this.baseURI + "cuentas.php";
    //console.log("load cuentas",id)
    this.http.post(url, body, options)
      .map(res => res.json())
      .subscribe(data => 
      {
        this.items = data;
        //console.log("data cuentas",data);
       /*if(data!==''){
        console.log("data cuentas",data);
        this.items = data; 
      }else{
        this.items=[];
      }*/
      
               
     });

     /*this.http.get('http://localhost/Contador//bancos.php')
     //this.http.get('./assets/php/retrieve-data.php')
     .map(res => res.json())
     .subscribe(data => 
     {
        this.banco = data;         
     }); */
  }


  // Allow navigation to the AddTechnology page for creating a new entry
  addEntry()
  {
    if(this.tipo!=='tab'){
      this.navCtrl.pop();
    }
    
     this.navCtrl.push(CuentaPage,{'idHogar': this.idHogar});
    /* let modal = this.modalCtrl.create( 
      CuentaPage,{'idHogar': this.idHogar});
    modal.present();*/
  }


  // Allow navigation to the AddTechnology page for amending an existing entry
  // (We supply the actual record to be amended, as this method's parameter, 
  // to the AddTechnology page
  viewEntry(param)
  {
    if(this.tipo!=='tab'){
      this.navCtrl.pop();
    }
     this.navCtrl.push(CuentaPage, param);
     /*let modal = this.modalCtrl.create( 
      CuentaPage,param);
     
    modal.present();*/
     
  }
  deleteEntry(param){
    if(this.tipo!=='tab'){
      this.navCtrl.pop();
    }
this.navCtrl.push(CuentaPage, param);
      /*let modal = this.modalCtrl.create( 
        CuentaPage,param);
        console.log ("param",param);
      modal.present();*/
  }
  movimientos(param)
  {
    //this.autenticarUsuario.cargarHogar(param)
    let idhogar =this.autenticarUsuario.getHogar();
    //console.log("Cuenta to movimietos item: ", param);
   // console.log("idu: ", param);
   this.navCtrl.pop();
    this.navCtrl.push(MovimientosPage,{ 'idHogar':idhogar});
    /*let modal = this.modalCtrl.create( 
      MovimientosPage,{ 'idHogar':idhogar});
    modal.present();*/
    
  }

}

