import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, ModalController } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticarUsuario } from '../../providers/autenticar-usuario';

@Component({
  selector: 'page-movimiento',
  templateUrl: 'movimiento.html',
})
export class MovimientoPage {

tipo;
idUsuario;
idHogar;
cuenta=[];
isEdited: boolean = false;
pageTitle              : string;
public form: FormGroup;
movimientoFecha ;
movimientoImporte;
movimientoDescripcion;
idMovimientosTipo;
idCuentas;
tipoMovimiento=[];
public recordID: any = null;
private baseURI: string = "http://localhost/Contador/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http       : Http,
    public fb         : FormBuilder,
    public autenticarUsuario: AutenticarUsuario,
    public toastCtrl  : ToastController,
    public viewCtrl :ViewController,
    public modalCtrl: ModalController) {
     
      this.form = fb.group({
        "fecha"                  : ["", Validators.required],
        "descripcion"             :[""],
        "importe"                  : ["", Validators.required],
        //"banco"                   :[""],
        //"idBancos"                :["", Validators.required],
        //"idUsuarios"               :["", Validators.required],
        "idCuentasTipo"           :[""],
        "idMovimientosTipo":[""]
     });

      //this.idUsuario= this.navParams.get('idUser');
      //this.idHogar= this.navParams.get('idHogar');
      this.idHogar=this.autenticarUsuario.getHogar();
      this.autenticarUsuario.obtenerCuenta(this.idHogar);
      //this.cuenta=this.autenticarUsuario.getCuenta();
      //console.log("cuenta en movimientos", this.cuenta);
      
  }

  //ionViewDidLoad() {
    ionViewWillEnter(){
    console.log('ionViewDidLoad Movimiento');
    this.tipo= this.navCtrl.getType();
    console.log("tipo: ",this.tipo);
    //console.log("idUsuario",this.idUsuario,"idHogar ", this.idHogar)
    this.tipoMovimiento=this.autenticarUsuario.getTipoMovimiento();
    this.cuenta=this.autenticarUsuario.getCuenta();
    //console.log("cuenta en movimientos", this.cuenta);
    this.resetFields();
    
    
     if(this.navParams.get("record"))
     {
        this.isEdited      = true;
        this.selectEntry(this.navParams.get("record"));
        this.pageTitle     = 'Editar Cuenta';
     }
     else
     {
        this.isEdited   = false;
        this.pageTitle  = 'Crear Movimiento';
        this.idHogar    = this.navParams.get('idHogar');
     }

  }
 /* ionViewWillLeave(){
    this.viewCtrl.dismiss();
  }*/
   volver(){
    this.viewCtrl.dismiss();
  }

  compareCuenta(t1 , t2 ): boolean {
    
    //console.log ("comparar cuenta",t1,t2, t1==t2);
      return t1 && t2 ? t1 == t2 : t1 == t2;
    } 
    compareMovimiento(t1 , t2 ): boolean {
      
      //console.log ("comparar movimiento",t1,t2, t1==t2);
        return t1 && t2 ? t1 == t2 : t1 == t2;
      } 

  resetFields() : void{
    this.movimientoFecha = "";
    this.movimientoImporte = "";
    this.movimientoDescripcion = ""; 
  }

  selectEntry(item){
    this.movimientoFecha        = item.fecha
    this.movimientoDescripcion   = item.descripcion;
    this.movimientoImporte       = item.importe;
    this.recordID            = item.id;
    this.idHogar             = item.idHogares
    //this.cuentaIdBanco       = item.idBancos;
    //this.cuentaBanco         = item.idBancos;
   // this.cuentaIdUsuario     = item.idUsuarios;
    //this.cuentasIdCuentasTipo= this.nombreCuentaTipo(item.idCuentasTipo);
    this.idCuentas =item.idCuentas;
    this.idMovimientosTipo= item.idMovimientosTipo;
    //console.log("select"  ,this.idCuentas, item.idCuentas);

  }
  sendNotification(message)  : void
  {
     let notification = this.toastCtrl.create({
         message       : message,
         //duration      : 6000,
         position: 'top',
         showCloseButton: true
     });
     notification.present();
  }
  createEntry(fecha, importe, descripcion, idMovimientosTipo, idCuentasTipo)
  {
     let body     : string   = "key=create&fecha=" + fecha + "&descripcion=" + descripcion + "&importe=" + importe + "&idMovimientosTipos=" +  idMovimientosTipo + "&idCuentas=" + idCuentasTipo ,
         type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
         headers  : any      = new Headers({ 'Content-Type': type}),
         options  : any      = new RequestOptions({ headers: headers }),
         url      : any      = this.baseURI + "crear-movimiento.php";
  //console.log("movimiento body",body);
     this.http.post(url, body, options)
     .subscribe((data) =>
     {
        // confirma si se conecto con la base de datos
        if(data.status === 200)
        {
           //this.hideForm   = true;
           this.sendNotification(`el nombre: ${importe} fue agregado`);
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

  saveEntry()
  {
     let fecha       : string    = this.form.controls["fecha"].value,
         importe      : string    = this.form.controls["importe"].value,
         descripcion  : string    = this.form.controls["descripcion"].value,
         //idBancos     : string    = this.form.controls["idBancos"].value,
         //idHogares   : string    = this.form.controls["idUsuarios"].value,
         //idHogares : string = this.idHogar,
          /*idBancos    : string   = this.form.controls["idBancos"].value,*/
          idMovimientosTipo: string = this.form.controls["idMovimientosTipo"].value,
          idCuentasTipo: string    = this.form.controls["idCuentasTipo"].value
          //console.log("4",idCuentasTipo);
     if(this.isEdited)
     {
        this.updateEntry(fecha, importe, descripcion, idMovimientosTipo, idCuentasTipo);
     }
     else
     {
        this.createEntry(fecha, importe, descripcion, idMovimientosTipo, idCuentasTipo);
     }
  }

  updateEntry(fecha, importe, descripcion, idMovimientosTipo, idCuentasTipo)
  {
      let body   : string = "key=update&fecha=" + fecha + "&descripcion=" + descripcion + "&importe=" + importe + "&idMovimientosTipos=" +  idMovimientosTipo + "&idCuentas=" + idCuentasTipo+"&id=" + this.recordID ,
      type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers    : any     = new Headers({ 'Content-Type': type}),
      options    : any     = new RequestOptions({ headers: headers }),
      url        : any     = this.baseURI + "editar-movimiento.php";
      //console.log("update",fecha,importe, descripcion,idMovimientosTipo,idCuentasTipo, this.recordID);
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
}
