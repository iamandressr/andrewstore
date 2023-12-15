import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private router: Router,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }


              async takePicture(promptLabelHeader: string) {
                return await Camera.getPhoto({
                  quality: 90,
                  allowEditing: true,
                  resultType: CameraResultType.DataUrl,
                  source: CameraSource.Prompt,
                  promptLabelHeader,
                  promptLabelPhoto: 'Selecciona una imagen',
                  promptLabelPicture: 'Toma una Foto'
                });


              };


  //===== Alerta =====
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);

    await alert.present();
  }

  //===== Loading =====
  loading() {
    return this.loadingCtrl.create({spinner: 'crescent'})
  }

  //===== Toast =====
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //===== Enruta a cualquier pagina disponible =====
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //===== Guarda un elemento en Localstorage =====
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //===== Obtener un elemento en Localstorage =====
  getetFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  //===== Modal =====
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(data) return data;

  }

  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data)
  }
}
