import { IniciarsesionPage } from './../iniciarsesion/iniciarsesion';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { UsuariosPage } from '../usuarios/usuarios';

//ionic page permite exportar la pagina desde el page.module.ts
@IonicPage()
@Component({
    selector: 'page-usuario',
    templateUrl: 'usuario.html'
})
export class UsuarioPage {
    // Define FormBuilder  se declaran las variables del formulario en html
    public form: FormGroup;
    // campos a cargar desde y hacia la base de datos
    public items: any = [];
    public usuarioNombre: any;
    public usuarioApellido: any;
    public usuarioEmail: any;
    public usuarioContrasenia: any;
    // Flag para indicar si es nuevo  o edicion de datos
    public isEdited: boolean = false;
    // Flag para mostrar u ocultar el formulario
    public hideForm: boolean = false;
    // titulo de la pagina a mostrear
    public pageTitle: string;
    // lee el id de la tabla
    public recordID: any = null;
    // base de la direccion donde se encuentral los archivos PHP
    private baseURI: string = "http://localhost/Contador/";

    // Initialise module classes
    constructor(public navCtrl: NavController,
        public http: Http,
        public NP: NavParams,
        public fb: FormBuilder,
        public toastCtrl: ToastController,
        public viewCtrl: ViewController) {

        // se crean las validaciones de los campos del formulario en el Html
        this.form = fb.group({
            "nombre": ["", Validators.compose([
                Validators.maxLength(25),
                Validators.minLength(2),
                Validators.pattern('^[a-zA-Z]+$'),
                Validators.required])],
            "apellido": ["", Validators.compose([
                Validators.maxLength(25),
                Validators.minLength(2),
                Validators.pattern('^[a-zA-Z]+$'),
                Validators.required])],
            "email": ["", Validators.compose([
                // Validators.maxLength(25),
                // Validators.minLength(5),
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.([a-zA-Z]{2,4})+(\.[a-zA-Z]{2,4})?$'),
                //Validators.pattern('^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]{2,4}([a-z0-9-]*[a-z0-9])?)*$'),
                Validators.required])],

            "contrasenia": ["", Validators.compose([
                //Validators.maxLength(25),
                Validators.minLength(5),
                Validators.pattern('^[a-zA-Z0-9]+$'),
                Validators.required])]
        });
    }
    // limpia los campos y determina si se edita o se crea registro
    ionViewWillEnter() {
        this.resetFields();

        if (this.NP.get("record")) {
            this.isEdited = true;
            this.selectEntry(this.NP.get("record"));
            this.pageTitle = 'Editar Usuario';
        }
        else {
            this.isEdited = false;
            this.pageTitle = 'Crear Usuario';
        }
    }
    /* ionViewWillLeave(){
      this.viewCtrl.dismiss();
     }*/

    volver() {
        this.viewCtrl.dismiss();
    }

    // se cargan los datos para llenar los campos en caso de listado de reistros
    selectEntry(item) {
        this.usuarioNombre = item.nombre
        this.usuarioApellido = item.apellido;
        this.usuarioEmail = item.email;
        this.usuarioContrasenia = item.contrasenia
        this.recordID = item.id;
    }



    // crea un registro, envia los datos al archiivo  php 
    createEntry(nombre, apellido, email, contrasenia) {
        let body: string = "key=create&nombre=" + nombre + "&apellido=" + apellido + "&email=" + email + "&contrasenia=" + contrasenia,
            type: string = "application/x-www-form-urlencoded; charset=UTF-8",
            headers: any = new Headers({ 'Content-Type': type }),
            options: any = new RequestOptions({ headers: headers }),
            url: any = this.baseURI + "crear-usuario.php";

        this.http.post(url, body, options)
            .map(res => res.json())
            .subscribe((data) => {
                // confirma si se conecto con la base de datos
                this.items = data;
                if (data.length == 1)// data.status === 200
                {
                    console.log("usuario: ", data)
                    //this.hideForm   = true;
                    this.sendNotification(`Ya puede ingresar con : ${email} `);
                    //this.navCtrl.push(UsuariosPage);
                    this.navCtrl.push(IniciarsesionPage);
                }
                // si existe algun problema
                else {
                    this.sendNotification(`El email: ${email} ya existe!`);
                    this.navCtrl.push(IniciarsesionPage);
                }
            });
    }
    // edita el registro enviado la info por post
    updateEntry(nombre, apellido, email, contrasenia) {
        let body: string = "key=update&nombre=" + nombre + "&apellido=" + apellido + "&email=" + email + "&contrasenia=" + contrasenia + "&id=" + this.recordID,
            type: string = "application/x-www-form-urlencoded; charset=UTF-8",
            headers: any = new Headers({ 'Content-Type': type }),
            options: any = new RequestOptions({ headers: headers }),
            url: any = this.baseURI + "editar-usuario.php";
        this.http.post(url, body, options)
            .subscribe(data => {
                console.log("datos", data);
                if (data.status === 200) {
                    //this.hideForm  =  true;
                    this.sendNotification(`Congratulations the technology: ${this.recordID} was successfully updated`);
                    this.navCtrl.push(UsuariosPage);
                }
                else {
                    this.sendNotification('Something went wrong!');
                    this.navCtrl.push(UsuariosPage);
                }
            });
    }
    // elimina registre enviado el id 
    deleteEntry() {
        let nombre: string = this.form.controls["nombre"].value,
            body: string = "key=delete&id=" + this.recordID,
            type: string = "application/x-www-form-urlencoded; charset=UTF-8",
            headers: any = new Headers({ 'Content-Type': type }),
            options: any = new RequestOptions({ headers: headers }),
            url: any = this.baseURI + "eliminar-usuario.php";

        this.http.post(url, body, options)
            .subscribe(data => {
                if (data.status === 200) {
                    //this.hideForm     = true;
                    this.sendNotification(`Congratulations the technology: ${this.recordID} was successfully deleted`);
                    this.navCtrl.push(UsuariosPage);
                }
                else {
                    this.sendNotification('Something went wrong!');
                    this.navCtrl.push(UsuariosPage);
                }
            });
    }
    // guarda los registros, manejando si son nuevos o editados
    saveEntry() {
        let nombre: string = this.form.controls["nombre"].value,
            apellido: string = this.form.controls["apellido"].value,
            email: string = this.form.controls["email"].value,
            contrasenia: string = this.form.controls["contrasenia"].value;

        if (this.isEdited) {
            this.updateEntry(nombre, apellido, email, contrasenia);
        }
        else {
            this.createEntry(nombre, apellido, email, contrasenia);
        }
    }
    // limpia los campos del formulario
    resetFields(): void {
        this.usuarioNombre = "";
        this.usuarioApellido = "";
    }
    // notifica con un toast 
    sendNotification(message): void {
        let notification = this.toastCtrl.create({
            message: message,
            //duration      : 6000,
            position: 'top',
            showCloseButton: true
        });
        notification.present();
    }



}