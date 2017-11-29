import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, IonicModule, ViewController, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Usuario } from './../../clases/usuario';
import { AutenticarUsuario } from './../../providers/autenticar-usuario';
import { MovimientosPage } from '../movimientos/movimientos';
import { MovimientoPage } from '../movimiento/movimiento';
import { CuentasPage } from './../cuentas/cuentas';
import { HogarPage } from '../hogar/hogar';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public  usuario:Usuario;
  private baseURI               : string  = "http://localhost/Contador/";
  idUsuario;
  tipo;
  length;
  tabBarElement:any;//oculta la tab bar en sub pages
  public clasUser:any=[]
   public items : any = [];
   constructor( public navCtrl: NavController,
                public navParam: NavParams , 
                public modalCtrl:ModalController,
                public viewCtrl:ViewController,
                public http   : Http,
                public autenticarUsuario: AutenticarUsuario) 
   {
    //this.tabBarElement= document.querySelector('.tabbar.show-tabbar');
    this.tabBarElement= document.querySelector(".tabbar.show-tabbar");
    //console.log("tabbar",this.tabBarElement)
   }
ionViewDidLoad()
   //ionViewWillEnter()
   {
   // this.tabBarElement.style.display = 'none';
   /** se toma el id del usuario desde autenticarUsuario y se guarda
    * el tipo de cuenta y el tipo de movimieto 
    *     
   */
    this.idUsuario=Number(this.autenticarUsuario.getUsuario());
    this.autenticarUsuario.obtenerTipoCuenta();
    this.autenticarUsuario.obtenerTipoMovimiento();
    //console.log("idUsuario",this.idUsuario);
    this.clasUser=this.autenticarUsuario.getClaseUsuario();
    this.tipo= this.navCtrl.getType();
    this.length=this.navCtrl.length();
    console.log("home tipo : ",this.tipo);
    console.log("homeLength",this.length);
    this.autenticarUsuario.cambiarEstado(true);
    /** 
     * se llama a la funcion load 
    */
    this.load(this.idUsuario);
   }
   //ionViewWillEnter() { this.tabBarElement.style.display = 'none'; } 
   //ionViewWillLeave() { this.tabBarElement.style.display = 'flex'; }
     
   /**la funcion load recive parametro id de usuario para enviarlo por
    * metodo post a la pagina php Hogares.php
    */
   load(id:number)
   {
     //console.log("load() home");
    let body   : string = "key=ver&id="+id,
    type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
    headers    : any     = new Headers({ 'Content-Type': type}),
    options    : any     = new RequestOptions({ headers: headers }),
    url        : any     = this.baseURI + "hogares.php";
//console.log ("body", body);

/**el metodo post envia el id de usuario para recibir los hogares que pertenecen a
 * usuario determinado
 */
this.http.post(url, body, options)
    //this.http.get('./assets/php/retrieve-data.php')
    .map(res => res.json())
    .subscribe(data => 
    {
       this.items = data; 
       //console.log("data home",data) ;       
    });
 }
  /**permite la nevegacion hacia la pagina hogar para crear un nuevo hogar
   * esta funcionalidad se quito desde el html pero no se borro la funcion por si se 
   * vuelve a crear  la funcion 
   */
   addEntry()
   {
    this.navCtrl.push('HogarPage');
    }
   /**permite la seleccion de un hogar especifico
    * se recibe desde el html el parameto  para cargar un hogar especifico
     */
   
   seleccionar(param)
   {
     /**carga el hogar con el parametro recibido en param
      * una vez cargad el hogar toma el id del hogar para navegar a
      la pagina cuentas y mostrar las cuentas asociadas a el hogar 
      */
      console.log("seleccionar", param.id);
      //this.navCtrl.setRoot(TabsPage);
     this.autenticarUsuario.cargarHogar(param.id);
     this.autenticarUsuario.cargarNombreHogar(param.nombre);
     let idhogar =this.autenticarUsuario.getHogar();
     this.autenticarUsuario.obtenerSaldo(idhogar);
     this.autenticarUsuario.obtenerIngresos(idhogar);
     this.autenticarUsuario.obtenerEgresos(idhogar);
     //console.log("idHogar: ", idhogar);
     //console.log("idu: ", param);
     
     this.navCtrl.push(CuentasPage,{'idUser':this.idUsuario, 'idHogar':idhogar});
     
      /*let modal = this.modalCtrl.create( 
        CuentasPage,{'idUser':this.idUsuario, 'idHogar':idhogar
      });
      modal.present();*/
   }
}