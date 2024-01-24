import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private toastCtrl: ToastController,
              private alert: AlertController) { }

    async toast(msg: string,time: number){
    const toast = await this.toastCtrl.create({
          message: msg,
          duration: time,
          position: 'bottom'
        });
        await toast.present();
  }

  async presentAlert(title: any,msg: any){
    const confirm = await this.alert.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      
    });
    await confirm.present();
  
  }
  
}
