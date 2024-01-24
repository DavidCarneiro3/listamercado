import { Component } from '@angular/core';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { ListaCompraPage } from '../lista-compra/lista-compra.page';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public id = 199;
  public listas: any;
  idusuario: any = 1
  listaCompra: any = ListaCompraPage
  constructor(private route: Router,
              private service: DataService,
              public modalController: ModalController,
              private events: EventsService) {
                this.events.getObservable().subscribe((data: { idUsuario: any; }) => {
                  this,this.getLists(data.idUsuario)
                  console.log('Recebido',data)
                })
              }

  // goCompras(){
  //   this.route.navigate(['/lista-compra/lista-compra/:'+this.id])
  // }

  ionViewDidEnter(){
    this.idusuario = 1;
    this.getLists(this.idusuario);
  }

  getLists(id: any){
    this.service.getLists(id)
    .subscribe((data: { datas: any; }) => {
      this.listas = data.datas
      console.log('Listas',this.listas);
    })
  }

  goListaCompra(id: any){
    let params: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id)
      }
    };
    this.route.navigate(['lista-compra'], params);
  }
}
