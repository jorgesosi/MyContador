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
  /** guarda un nuevo registo recibidp  HTML form
  // usa el metodo angular http post para enviar el dato
  // */
  createEntry(nombre, idUser) {
    let body: string = "key=create&nombre=" + nombre + "&idUsuarios=" + idUser,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "crear-hogar.php";
    //console.log("hogar:",body)
    this.http.post(url, body, options)
      .subscribe((data) => {
        /** recibe el dato desde php si el status es 200 quere decier que se comunico con la base de 
         * datos
        */
        if (data.status === 200) {
          //this.hideForm   = true;
          this.sendNotification(`el nombre: ${nombre} fue agregado`);
          this.navCtrl.push(HogaresPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Existe un ERROR!');
          this.navCtrl.push(HogaresPage);
        }
      });
  }
  /**Se realizan las modificaciones se envia el parametro nombre de hogar a ser el id lo recibe desde
   *
   */
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
  /**Eliminar un registro existente que ha sido seleccionado en el formulario HTML de la página
   * 
   */
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
  /**guarda la informacion dependiendo si es una modificacion o un registro nuevo */
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
  /**limpia los valores en el formulario HTML */
  resetFields(): void {
    this.hogarNombre = "";

  }
  /**se mustran los mansajes por pantalla se recibe el mensaje por 
   * parametro
   */
  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
}
