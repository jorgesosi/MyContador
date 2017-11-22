import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { BancosPage } from './../bancos/bancos';
@IonicPage()
@Component({
  selector: 'page-banco',
  templateUrl: 'banco.html',
})
export class BancoPage {
  tipo;
  public form: FormGroup;
  public bancoNombre: any;
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
    this.resetFields();
    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Editar Banco';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Crear Banco';
    }
  }
  /* ionViewWillLeave(){
     this.viewCtrl.dismiss();
   }*/

  volver() {
    this.viewCtrl.dismiss();
  }
  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item) {
    this.bancoNombre = item.nombre
    this.recordID = item.id;
  }
  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data 
  // to our remote PHP script (note the body variable we have created which 
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(nombre) {
    let body: string = "key=create&nombre=" + nombre,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "crear-banco.php";
    this.http.post(url, body, options)
      .subscribe((data) => {
        // If the request was successful notify the user
        if (data.status === 200) {
          //this.hideForm   = true;
          this.sendNotification(`el nombre: ${nombre} fue agregado`);
          this.navCtrl.push(BancosPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
          this.navCtrl.push(BancosPage);
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
      url: any = this.baseURI + "editar-banco.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          //this.hideForm  =  true;
          this.sendNotification(`Congratulations the technology: ${this.recordID} was successfully updated`);
          this.navCtrl.push(BancosPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
          this.navCtrl.push(BancosPage);
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
      url: any = this.baseURI + "eliminar-banco.php";
    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          //this.hideForm     = true;
          this.sendNotification(`Congratulations the technology: ${this.recordID} was successfully deleted`);
          this.navCtrl.push(BancosPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Something went wrong!');
          this.navCtrl.push(BancosPage);
        }
      });
  }
  // Handle data submitted from the page's HTML form
  // Determine whether we are adding a new record or amending an
  // existing record
  saveEntry() {
    let nombre: string = this.form.controls["nombre"].value;
    if (this.isEdited) {
      this.updateEntry(nombre);
    }
    else {
      this.createEntry(nombre);
    }
  }
  // Clear values in the page's HTML form fields
  resetFields(): void {
    this.bancoNombre = "";
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