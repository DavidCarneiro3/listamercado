import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, ParamMap, Router, RouterModule } from '@angular/router';
import { Animation, AnimationController, IonContent, IonItem, ModalController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { FunctionsService } from '../service/functions.service';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListaCompraPage implements AfterViewInit {
  @ViewChild('item', { static: false })
  item!: ElementRef;
  @ViewChild(IonContent, { static: false })
  content!: IonContent;

  deleteAnimation!: Animation;
  
  id: any;
  titulo: any
  prods: any;
  prodsCart: any;
  totalm: any;
  totald: any;
  totals: any;
  segment: string = 'items'
  montante: any;
  selected: any;
  mercantil: any
  idmercantil: any
  usuario: any = 1;
  listas: any;
  constructor(private route: ActivatedRoute, 
              private router: Router,
              private service: DataService,
              private func: FunctionsService, 
              private animationCtrl: AnimationController,
              public modalController: ModalController,
              private events: EventsService) { 
                this.route.queryParams.subscribe(params => {
                  console.log(params)
                  if (params && params['id']) {
                    this.id = JSON.parse(params['id']);
                    console.log('Id',this.id)
                  }
                });
              }

  ngAfterViewInit() {
    
  }

  ionViewDidEnter(){
    
    this.getLista(this.id,this.usuario)

    // this.setupIconAnimations();
 
    // const style = this.item.nativeElement.style;
    const windowWidth = window.innerWidth;
  }

  segmentChanged(ev: any) {
    console.log('Segment target', ev.target.value);
    this.segment = ev.target.value
  }

  getLista(idlista: string | Blob,usuario: string | Blob){
    this.service.getListaMercUsu(idlista,usuario)
    .subscribe(data => {
      let values = data.datas;
      console.log('values',values)
      this.montante = values[0].montante
      this.titulo = values[0].lista
      this.mercantil = values[0].mercantil
      this.idmercantil = values[0].idmercantil
      this.getProds(this.id,this.idmercantil)
      this.getProdsCart(this.id,this.idmercantil)
    })
  }

  getProds(idlista: string | Blob,mercantil: string | Blob){
    this.prods = '';
    this.service.getListsProds(idlista,mercantil)
    .subscribe(data => {
      let tmp = data.datas;
      //tmp.at(tmp.length);
      console.log('tmp',tmp[(tmp.length-1)].total);
      this.totald = tmp[(tmp.length-1)].total
      this.prods = data.datas
      console.log('prods',this.prods);
    })
  }

  getProdsCart(idlista: string | Blob,mercantil: string | Blob){
    this.prodsCart = '';
    this.service.getListsProdsCart(idlista,mercantil)
    .subscribe(data => {
      let tmp = data.datas;
      //tmp.at(tmp.length);
      console.log('tmp',tmp[(tmp.length-1)].total);
      this.totals = tmp[(tmp.length-1)].total
      this.prodsCart = data.datas
      console.log('prodsCarts',this.prodsCart);
    })
  }

  select(value: any,carro: any){
    this.selected = value;
    this.push(this.selected,carro)
    this.getProds(this.id,this.idmercantil)
    this.getProdsCart(this.id,this.idmercantil)
    console.log('Radio',this.selected)
  }

  push(id: any, carro: any){
    
    this.service.upProdCart(id,carro,this.usuario)
    .subscribe(data => {
      console.log('Data',data)
      if(data.result == 'sucess'){
        this.getLists()
        
        // this.func.toast('Produto selecionado',3000)
        }
      
    })
  }

  edit(id: any){
    let params: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id)
      }
    };
    this.router.navigate(['prod-detalhe'], params)
  }

  back(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
   
initDelAnimation(){
  const animation = this.animationCtrl.create()
  .addElement(document.querySelectorAll('.slide-in'))
  .duration(1000)
  .iterations(1)
  .keyframes([
    { offset: 0, transform: 'translateY(35px)', opacity: '0' },
    { offset: 0.3, transform: 'translateY(-1px)', opacity: '0.5' },
    { offset: 1, transform: 'translateY(0px)', opacity: '1' }
  ]);

animation.play();
}  

getLists(){
  this.service.getLists(this.usuario)
  .subscribe(data => {
    this.listas = data.datas
    this.initDelAnimation()
    this.events.publishSomeData({
      idUsuario: this.usuario
    })
    console.log('Listas',this.listas);
  })
}

}
