import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { TiposcuentasPage } from './../tiposcuentas/tiposcuentas';
@IonicPage()
@Component({
  selector: 'page-tipocuenta',
  templateUrl: 'tipocuenta.html',
})
export class TipocuentaPage {
// Define FormBuilder  se declaran las variables del formulario en html
public form                  : FormGroup;
// campos a cargar desde y hacia la base de datos
public tipocuentaNombre         : any;
public tipocuentaDescripcion       : any;
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
 
// Initialise module classes
constructor(public navCtrl    : NavController,
            public http       : Http,
            public NP         : NavParams,
            public fb         : FormBuilder,
            public toastCtrl  : ToastController) 
{

   // se crean las validaciones de los campos del formulario en el Html
   this.form = fb.group({
      "nombre"                  : ["", Validators.required],
      "descripcion"                : ["", Validators.required]
   });
}
// limpia los campos y determina si se edita o se crea registro
ionViewWillEnter()
{
   this.resetFields();

   if(this.NP.get("record"))
   {
      this.isEdited      = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle     = 'Editar Tipo';
   }
   else
   {
      this.isEdited      = false;
      this.pageTitle     = 'Crear tipo';
   }
}
// se cargan los datos para llenar los campos en caso de listado de reistros
selectEntry(item)
{
   this.tipocuentaNombre        = item.nombre
   this.tipocuentaDescripcion      = item.descripcion;
   this.recordID             = item.id;
}
// crea un registro, envia los datos al archiivo  php 
createEntry(nombre, descripcion)
{
   let body     : string   = "key=create&nombre=" + nombre + "&descripcion=" + descripcion,
       type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
       headers  : any      = new Headers({ 'Content-Type': type}),
       options  : any      = new RequestOptions({ headers: headers }),
       url      : any      = this.baseURI + "crear-tipocuenta.php";

   this.http.post(url, body, options)
   .subscribe((data) =>
   {
      // confirma si se conecto con la base de datos
      if(data.status === 200)
      {
         //this.hideForm   = true;
         this.sendNotification(`el nombre: ${nombre} fue agregado`);
         this.navCtrl.push(TiposcuentasPage);
      }
      // si existe algun problema
      else
      {
         this.sendNotification('Something went wrong!');
         this.navCtrl.push(TiposcuentasPage);
      }
   });
}
// edita el registro enviado la info por post
updateEntry(nombre, descripcion)
{
   let body       : string = "key=update&nombre=" + nombre + "&descripcion=" + descripcion + "&id=" + this.recordID,
       type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
       headers    : any     = new Headers({ 'Content-Type': type}),
       options    : any     = new RequestOptions({ headers: headers }),
       url        : any     = this.baseURI + "editar-tipocuenta.php";

   this.http.post(url, body, options)
   .subscribe(data =>
   {
   if(data.status === 200)
      {
         //this.hideForm  =  true;
         this.sendNotification(`Congratulations the technology: ${this.recordID} was successfully updated`);
         this.navCtrl.push(TiposcuentasPage);
      }
      else
      {
         this.sendNotification('Something went wrong!');
         this.navCtrl.push(TiposcuentasPage);
      }
   });
}
// elimina registre enviado el id 
deleteEntry()
{
   let nombre     : string   = this.form.controls["nombre"].value,
       body       : string   = "key=delete&id=" + this.recordID,
       type       : string   = "application/x-www-form-urlencoded; charset=UTF-8",
       headers    : any      = new Headers({ 'Content-Type': type}),
       options    : any      = new RequestOptions({ headers: headers }),
       url        : any      = this.baseURI + "eliminar-tipocuenta.php";

 this.http.post(url, body, options)
   .subscribe(data =>
 {
     if(data.status === 200)
      {
         //this.hideForm     = true;
         this.sendNotification(`Congratulations the technology: ${this.recordID} was successfully deleted`);
         this.navCtrl.push(TiposcuentasPage);
     }
     else
     {
         this.sendNotification('Something went wrong!');
         this.navCtrl.push(TiposcuentasPage);
     }
 });
}
// guarda los registros, manejando si son nuevos o editados
saveEntry()
{
   let nombre     : string    = this.form.controls["nombre"].value,
       descripcion   : string    = this.form.controls["descripcion"].value;

   if(this.isEdited)
   {
      this.updateEntry(nombre, descripcion);
   }
   else
   {
      this.createEntry(nombre, descripcion);
   }
}
// limpia los campos del formulario
resetFields() : void
{
   this.tipocuentaNombre           = "";
   this.tipocuentaDescripcion         = ""; 
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
