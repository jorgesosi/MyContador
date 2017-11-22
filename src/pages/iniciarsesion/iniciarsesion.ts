import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Usuario } from '../../clases/usuario';
import { AutenticarUsuario } from './../../providers/autenticar-usuario';
//import { IniciarsesionPage } from './iniciarsesion';
@Component({
  selector: 'page-iniciarsesion',
  templateUrl: 'iniciarsesion.html',
})
export class IniciarsesionPage {
  usuarioEstaConectado = false;
  promiseUsuario: Promise<Usuario[]>
  public usuario:Usuario[];
  public items : any = [];
  public form                  : FormGroup;
  public usuarioNombre         : any;
  public usuarioApellido       : any;
  public usuarioEmail          : any;
  public usuarioContrasenia     :any;
  private baseURI               : string  = "http://localhost/Contador/";
  constructor(public navCtrl    : NavController,
              public http       : Http,
              public navParams  : NavParams,
              public fb         : FormBuilder,
              public toastCtrl  : ToastController,
              public autenticarUsuario: AutenticarUsuario) {
    this.form = fb.group({                  
     // "email"                   : ["",Validators.required],//
     "email"                   : ["",Validators.compose([
                                     // Validators.maxLength(25),
                                     // Validators.minLength(5),
                                     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.([a-zA-Z]{2,4})+(\.[a-zA-Z]{2,4})?$'),
                                     //Validators.pattern('^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$'),
                                      Validators.required])],
      "contrasenia"             : ["",Validators.compose([
                                      // Validators.maxLength(25),
                                      Validators.minLength(5),
                                      Validators.pattern('^[a-zA-Z0-9]+$'),
                                      Validators.required])]//Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    });
  }
  ionViewWillEnter() {
    //this.load();
    console.log('ionViewWillEnter Iniciarsesion');
  }
  registrarUsuario(){
    this.navCtrl.push('UsuarioPage');
  }
   selectEntry(item){
     this.usuarioEmail         = item.email;
     this.usuarioContrasenia    =item.contrasenia;     
  }
  resetFields() : void  {
     this.usuarioEmail            = "";
     this.usuarioContrasenia      = "";
  }
  iniciar(){
    let email       : string   =this.form.controls["email"].value,
        contrasenia : string   =this.form.controls["contrasenia"].value;
    this.iniciarSesion(email, contrasenia);
  }
  iniciarSesion(email, contrasenia){
  /* this.promiseUsuario = this.autenticarUsuario.iniciarSesion(email, contrasenia)
   this.promiseUsuario.then(
     usuar => {
       this.usuario=usuar  ;
     console.log("usuar",usuar[0]);
     console.log("iniciar",this.usuario[0]);}
   );
   console.log("fuera",this.usuario);*/
    let body    : string = "key=iniciar&email=" + email + "&contrasenia="+ contrasenia,
    type        : string = "application/x-www-form-urlencoded; charset=UTF-8",
    headers     : any     = new Headers({ 'Content-Type': type}),
    options     : any     = new RequestOptions({ headers: headers }),
    url         : any     = this.baseURI + "iniciar.php";
   this.http.post(url, body, options)
    .map(res => res.json())
    .subscribe(data =>
      {
        this.items = data;  
        console.log("items",this.items);//this.items[0].id
      //if(this.items._body !== "[]" ){
     if(this.items.length == 1 ){
            //this.hideForm  =  true;
            this.usuario=this.items;
            this.autenticarUsuario.cargarUsuario(this.usuario[0].id)
            this.autenticarUsuario.cargarClaseUsuario(this.usuario)
            console.log ("Usuario",this.usuario[0].id)
            this.sendNotification(`Bienvenido`);
            this.navCtrl.push(TabsPage);
            //this.navCtrl.push(HomePage);
            this.autenticarUsuario.cambiarEstado(true);//cambia el estado de usuario a conectado
        }
        else{
            this.sendNotification('Something went wrong!');
            //this.navCtrl.push(IniciarsesionPage);
        }
    });
    /*this.http.get('http://localhost/Contador/iniciar.php')
    .map(res => res.json())
    .subscribe(data => 
    {
       this.items = data;
       console.log("get",data)         
    });*/
  }
  sendNotification(message)  : void{
    let notification = this.toastCtrl.create({
         message       : message,
         duration      : 3000
    });
    notification.present();
  }
}
