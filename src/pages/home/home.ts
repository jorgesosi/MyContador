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
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public  usuario:Usuario;
  private baseURI               : string  = "http://localhost/Contador/";
  idUsuario
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
    this.idUsuario=Number(this.autenticarUsuario.getUsuario());
    this.autenticarUsuario.obtenerTipoCuenta();
    this.autenticarUsuario.obtenerTipoMovimiento();
    //console.log("idUsuario",this.idUsuario);
    this.clasUser=this.autenticarUsuario.getClaseUsuario();
    //console.log("home",this.clasUser)
    this.load(this.idUsuario);
   }
   //ionViewWillEnter() { this.tabBarElement.style.display = 'none'; } 
   //ionViewWillLeave() { this.tabBarElement.style.display = 'flex'; }
   // Retrieve the JSON encoded data from the remote server
   // Using Angular's Http class and an Observable - then
   // assign this to the items array for rendering to the HTML template
   load(id:number)
   {
     //console.log("load() home");
    let body   : string = "key=ver&id="+id,
    type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
    headers    : any     = new Headers({ 'Content-Type': type}),
    options    : any     = new RequestOptions({ headers: headers }),
    url        : any     = this.baseURI + "hogares.php";
//console.log ("body", body);
this.http.post(url, body, options)
    //this.http.get('./assets/php/retrieve-data.php')
    .map(res => res.json())
    .subscribe(data => 
    {
       this.items = data; 
       //console.log("data home",data) ;       
    });
 }
  // Allow navigation to the AddTechnology page for creating a new entry
   addEntry()
   {
      //this.navCtrl.push('HogarPage');
      let modal = this.modalCtrl.create( 
        HogarPage);
      modal.present();
   }
   // Allow navigation to the AddTechnology page for amending an existing entry
   // (We supply the actual record to be amended, as this method's parameter, 
   // to the AddTechnology page
   viewEntry(param)
   {
      this.navCtrl.push('AddTechnology', param);
   }
   seleccionar(param)
   {
     this.autenticarUsuario.cargarHogar(param)
     let idhogar =this.autenticarUsuario.getHogar();
     //console.log("idHogar: ", idhogar);
     //console.log("idu: ", param);
     //this.navCtrl.push(CuentasPage,{'idUser':this.idUsuario, 'idHogar':idhogar});
      let modal = this.modalCtrl.create( 
        CuentasPage,{'idUser':this.idUsuario, 'idHogar':idhogar
      });
      modal.present();
   }
}