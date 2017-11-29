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
  length;
  saldo;
  ingresos;
  egresos;
  nombreHogar;

  public items : any = [];
  private baseURI: string  = "http://localhost/Contador/";
  //public bancos: any = [];
  constructor(public navCtrl: NavController,
              public autenticarUsuario:AutenticarUsuario ,
              public viewCtrl: ViewController,
              public http   : Http,
              public modalCtrl: ModalController){  }
  ionViewWillEnter(){
    //this.tipo= this.navCtrl.getType();
    this.tipo= this.navCtrl.getType();
    this.length=this.navCtrl.length();
    console.log("cuentas tipo : ",this.tipo);
    console.log("cuentas Length",this.length);
    this.idUsuario= this.autenticarUsuario.getUsuario();
    this.idHogar= this.autenticarUsuario.getHogar();
    this.tipoCuenta=this.autenticarUsuario.getTipoCuenta();
    //console.log ("cuentas id hogar",this.tipoCuenta);
    this.autenticarUsuario.obtenerSaldo(this.idHogar);
    this.autenticarUsuario.obtenerIngresos(this.idHogar);
    this.autenticarUsuario.obtenerEgresos(this.idHogar);
    this.saldo=this.autenticarUsuario.getSaldo();
    this.ingresos=this.autenticarUsuario.getIngresos();
    this.egresos=this.autenticarUsuario.getEgresos();
    this.nombreHogar= this.autenticarUsuario.getNombreHogar();
    this.load(this.idHogar);
  }
  volver(){
    this.viewCtrl.dismiss();
  }
  // recibe en formatao JSON los datos desde PHP
  // utiliza el obserbable de http get o post de angular
  //asigna los items a un array 
  load(id:number) 
  {
    /*la funcion principal load recibe el parametro Numero de Id y se lo envia 
    *al archiivo PHP como post
    *@PARAM id*/
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
     });
    }
// Funcion para agregar un registo a cuentas
  addEntry(){
/*si el tipo de la pagina a abrir es tab quita la vista del programa principal*/
   if(this.tipo!=='tab'){
      this.navCtrl.pop();
    }
    
     this.navCtrl.push(CuentaPage,{'idHogar': this.idHogar});
  }
/**muesta un registo completo de la cuenta en pantalla abre pagina cuanta */
  viewEntry(param)
  {
    if(this.tipo!=='tab'){
      this.navCtrl.pop();
    }
     this.navCtrl.push(CuentaPage, param);
  }
  /**muesta la pantalla cuenta para proceder a eliminar un registro especifico */
  deleteEntry(param){
    if(this.tipo!=='tab'){
      this.navCtrl.pop();
    }
    this.navCtrl.push(CuentaPage, param);
  }
  movimientos(param){
    //this.autenticarUsuario.cargarHogar(param)
    let idhogar =this.autenticarUsuario.getHogar();
    //console.log("Cuenta to movimietos item: ", param);
   // console.log("idu: ", param);
    if(this.tipo!=='tab'){
      this.navCtrl.pop();
    }
    this.navCtrl.push(MovimientosPage,{ 'idHogar':idhogar});
  }
}

