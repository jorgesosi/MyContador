import { AutenticarUsuario } from './../../providers/autenticar-usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController,
   IonicPageModule, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { TipoCuenta } from './../../clases/tipocuenta';
import { CuentasPage } from './../cuentas/cuentas';
//@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {
  tipoCuenta=[];
  tipo;
public bancos: any = [];
  // Define FormBuilder  se declaran las variables del formulario en html
public form                  : FormGroup;
// campos a cargar desde y hacia la base de datos
public cuentaNombre        : any;
public cuentaNumero        : any;
public cuentaDescripcion   : any;
public cuentaIdBanco        :any;
//public cuentaBanco          :any;
public cuentaIdUsuario      :any;
public cuentasIdCuentasTipo :any;
// Flag para indicar si es nuevo  o edicion de datos
public isEdited               : boolean = false;
// Flag para mostrar u ocultar el formulario
public hideForm               : boolean = false;
// titulo de la pagina a mostrear
public pageTitle              : string;
// lee el id de la tabla
public recordID               : any      = null;
// base de la direccion donde se encuentral los archivos PHP
private baseURI               : string  = "http://localhost/Contador/";
idHogar; 
// Initialise module classes
constructor(public navCtrl    : NavController,
            public http       : Http,
            public NP         : NavParams,
            public fb         : FormBuilder,
            public viewCtrl  :ViewController,
            public autenticarUsuario:AutenticarUsuario,
            public toastCtrl  : ToastController,
            public modalCtrl: ModalController) 
{

   // se crean las validaciones de los campos del formulario en el Html
   this.form = fb.group({
      "nombre"                  : ["", Validators.required],
      "descripcion"             :[""],
      "numero"                  : ["", Validators.required],
      //"banco"                   :[""],
      //"idBancos"                :["", Validators.required],
      //"idUsuarios"               :["", Validators.required],
      "idCuentasTipo"           :[""]
   });
}
// limpia los campos y determina si se edita o se crea registro
ionViewWillEnter()
{
  console.log("ionViewWillEnter CuentaPage ")
  this.tipoCuenta=this.autenticarUsuario.getTipoCuenta();
  //console.log ("cuentas id hogar",this.tipoCuenta);
  this.tipo= this.navCtrl.getType();
  console.log("tipo: ",this.tipo);
   this.resetFields();
   
  
   if(this.NP.get("record"))
   {
      this.isEdited      = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle     = 'Editar Cuenta';
   }
   else
   {
      this.isEdited   = false;
      this.pageTitle  = 'Crear Cuenta';
      this.idHogar    = this.NP.get('idHogar');
   }
}
ionViewWillLeave(){
   //this.navCtrl.pop();
  //this.viewCtrl.dismiss();
}
 volver(){
  //this.viewCtrl.dismiss();
  this.navCtrl.pop();
}

// se cargan los datos para llenar los campos en caso de listado de reistros
selectEntry(item)
{
   this.cuentaNombre        = item.nombre
   this.cuentaDescripcion   = item.descripcion;
   this.cuentaNumero        = item.numero;
   this.recordID            = item.id;
   this.idHogar             = item.idHogares
   //this.cuentaIdBanco       = item.idBancos;
   //this.cuentaBanco         = item.idBancos;
   this.cuentaIdUsuario     = item.idUsuarios;
   //this.cuentasIdCuentasTipo= this.nombreCuentaTipo(item.idCuentasTipo);
   this.cuentasIdCuentasTipo=item.idCuentasTipo;
   //console.log("2"  ,this.cuentasIdCuentasTipo, item.idCuentasTipo);
}
nombreCuentaTipo(id:number){
  let string='';
  //console.log("long",this.tipoCuenta.length);
  for(let i=0;i<this.tipoCuenta.length;i++){
    if(this.tipoCuenta[i].id == id)
      //console.log("for if ", this.tipoCuenta[i].nombre)
      string=this.tipoCuenta[i].nombre
  }
  return string;
}

compareTipo(t1 , t2 ): boolean {

//console.log ("comparar",t1,t2, t1==t2);
  return t1 && t2 ? t1 == t2 : t1 == t2;
} 
// crea un registro, envia los datos al archiivo  php 
//createEntry(nombre, numero, descripcion, idBancos, idHogares, idCuentasTipo)
createEntry(nombre, numero, descripcion, idHogares, idCuentasTipo)
{
   let body     : string   = "key=create&nombre=" + nombre + "&descripcion=" + descripcion + "&numero=" + numero + "&idHogares=" +  idHogares + "&idCuentasTipo=" + idCuentasTipo ,
       type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
       headers  : any      = new Headers({ 'Content-Type': type}),
       options  : any      = new RequestOptions({ headers: headers }),
       url      : any      = this.baseURI + "crear-cuenta.php";
//console.log("cuenta body",body);
   this.http.post(url, body, options)
   .subscribe((data) =>
   {
      // confirma si se conecto con la base de datos
      if(data.status === 200)
      {
         //this.hideForm   = true;
         this.sendNotification(`el nombre: ${nombre} fue agregado`);
         //this.navCtrl.push(CuentasPage);
         this.viewCtrl.dismiss();
      }
      // si existe algun problema
      else
      {
         this.sendNotification('Something went wrong!');
         //this.navCtrl.push(CuentasPage);
         this.viewCtrl.dismiss();
      }
   });
}
// edita el registro enviado la info por post
//updateEntry(nombre,numero, descripcion, idBancos, idUsuarios, idCuentasTipo)
updateEntry(nombre, numero, descripcion, idHogares, idCuentasTipo)
{
    let body   : string = "key=update&nombre=" + nombre + "&descripcion=" + descripcion + "&numero=" + numero  + "&idHogares=" + idHogares + "&idCuentasTipo=" + idCuentasTipo +"&id=" + this.recordID ,
    type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
    headers    : any     = new Headers({ 'Content-Type': type}),
    options    : any     = new RequestOptions({ headers: headers }),
    url        : any     = this.baseURI + "editar-cuenta.php";
    //console.log("5",nombre,numero, descripcion,idHogares,idCuentasTipo);
this.http.post(url, body, options)
.subscribe(data =>
{
if(data.status === 200)
   {
      //this.hideForm  =  true;
      this.sendNotification(`Congratulations the technology: ${this.recordID} was successfully updated`);
      //this.navCtrl.push(CuentasPage);
      this.viewCtrl.dismiss();
   }
   else
   {
      this.sendNotification('Something went wrong!');
      //this.navCtrl.push(CuentasPage);
      this.viewCtrl.dismiss();
   }
});
}
// elimina registre enviado el id 
deleteEntry(){
  let nombre     : string   = this.form.controls["nombre"].value,
  body       : string   = "key=delete&id=" + this.recordID,
  type       : string   = "application/x-www-form-urlencoded; charset=UTF-8",
  headers    : any      = new Headers({ 'Content-Type': type}),
  options    : any      = new RequestOptions({ headers: headers }),
  url        : any      = this.baseURI + "eliminar-cuenta.php";
console.log("delete cuenta",body);
this.http.post(url, body, options)
.subscribe(data =>
{
 // If the request was successful notify the user
 if(data.status === 200)
 {
    //this.hideForm     = true;
    this.sendNotification(`se elimino correctamente: ${this.recordID} `);
   
    this.navCtrl.push(CuentasPage);
 }
 // Otherwise let 'em know anyway
 else
 {
    this.sendNotification('¡Aldo no funciono bien!');
    this.navCtrl.push(CuentasPage);
 }
});
  }
// guarda los registros, manejando si son nuevos o editados
saveEntry()
{
   let nombre       : string    = this.form.controls["nombre"].value,
       numero      : string    = this.form.controls["numero"].value,
       descripcion  : string    = this.form.controls["descripcion"].value,
       //idBancos     : string    = this.form.controls["idBancos"].value,
       //idHogares   : string    = this.form.controls["idUsuarios"].value,
       idHogares : string = this.idHogar,
        /*idBancos    : string   = this.form.controls["idBancos"].value,*/
        idCuentasTipo: string    = this.form.controls["idCuentasTipo"].value
        //console.log("4",idCuentasTipo);
   if(this.isEdited)
   {
      this.updateEntry(nombre, numero, descripcion, idHogares, idCuentasTipo);
   }
   else
   {
      this.createEntry(nombre, numero, descripcion, idHogares, idCuentasTipo);
   }
}
// limpia los campos del formulario
resetFields() : void
{
   this.cuentaNombre           = "";
  this.cuentaNumero         ="";
   this.cuentaDescripcion         = ""; 
}


// notifica con un toast 
sendNotification(message)  : void
{
   let notification = this.toastCtrl.create({
       message       : message,
       duration      : 3000
   });
   notification.present();
}


}

