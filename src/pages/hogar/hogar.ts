import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HogaresPage } from './../hogares/hogares';
import { AutenticarUsuario } from './../../providers/autenticar-usuario';
@IonicPage()
@Component({
  selector: 'page-hogar',
  templateUrl: 'hogar.html',
})
export class HogarPage {
  tipo;
  public form: FormGroup;
  public hogarNombre: any;
  public idUsuario;
  //public usuarioApellido       : any;
  //public usuarioEmail          : any;
  // Flag to be used for checking whether we are adding/editing an entry
  public isEdited: boolean = false;
  // Flag to hide the form upon successful completion of remote operation
  public hideForm: boolean = false;
  // Property to help ste the page title
  public pageTitle: string;
  // Property to store the recordID for when an existing entry is being edited
  public recordID: any = null;
  private baseURI: string = "http://localhost/Contador/";
  // Initialise module classes
  constructor(public navCtrl: NavController,
    public http: Http,
    public NP: NavParams,
    public fb: FormBuilder,
    public autenticarUsuario: AutenticarUsuario,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController) {
    // Create form builder validation rules
    this.form = fb.group({
      "nombre": ["", Validators.required],
    });
  }
  // Determine whether we adding or editing a record
  // based on any supplied navigation parameters
  ionViewWillEnter() {
    this.tipo = this.navCtrl.getType();
    console.log("tipo: ", this.tipo);
    this.idUsuario = Number(this.autenticarUsuario.getUsuario());
    this.resetFields();
    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Editar Hogar';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Crear Hogar';
    }
  }
  /*ionViewWillLeave(){
    this.viewCtrl.dismiss();
  }*/
  volver() {
    this.viewCtrl.dismiss();
  }
  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.hogarNombre = item.nombre
    this.recordID = item.id;
  }
  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data 
  // to our remote PHP script (note the body variable we have created which 
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(nombre, idUser) {
    let body: string = "key=create&nombre=" + nombre + "&idUsuarios=" + idUser,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "crear-hogar.php";
    //console.log("hogar:",body)
    this.http.post(url, body, options)
      .subscribe((data) => {
        // If the request was successful notify the user
        if (data.status === 200) {
          //this.hideForm   = true;
          this.sendNotification(`el nombre: ${nombre} fue agregado`);
          this.navCtrl.push(HogaresPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
          this.navCtrl.push(HogaresPage);
        }
      });
  }
  // Update an existing record that has been edited in the page's HTML form
  // Use angular's http post method to submit the record data 
  // to our remote PHP script (note the body variable we have created which 
  // supplies a variable of key with a value of update followed by the key/value pairs
  // for the record data
  updateEntry(nombre) {
    let body: string = "key=update&nombre=" + nombre + "&id=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "editar-hogar.php";
    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          //this.hideForm  =  true;
          this.sendNotification(`se realizo el cambio de: ${this.recordID} `);
          this.navCtrl.push(HogaresPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('algo no funcionó bien!');
          this.navCtrl.push(HogaresPage);
        }
      });
  }
  // Remove an existing record that has been selected in the page's HTML form
  // Use angular's http post method to submit the record data 
  // to our remote PHP script (note the body variable we have created which 
  // supplies a variable of key with a value of delete followed by the key/value pairs
  // for the record ID we want to remove from the remote database
  deleteEntry() {
    let nombre: string = this.form.controls["nombre"].value,
      body: string = "key=delete&id=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "eliminar-hogar.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          //this.hideForm     = true;
          this.sendNotification(`se elimino correctamente: ${this.recordID} `);
          this.navCtrl.push(HogaresPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('¡Aldo no funciono bien!');
          this.navCtrl.push(HogaresPage);
        }
      });
  }
  // Handle data submitted from the page's HTML form
  // Determine whether we are adding a new record or amending an
  // existing record
  saveEntry() {
    let nombre: string = this.form.controls["nombre"].value;
    let idUser: number = this.idUsuario
    if (this.isEdited) {
      this.updateEntry(nombre);
    }
    else {
      this.createEntry(nombre, idUser);
    }
  }
  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.hogarNombre = "";

  }
  // Manage notifying the user of the outcome
  // of remote operations
  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
}
