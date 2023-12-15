import { Component, OnInit, inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getetFromLocalStorage('user');
  }

  //===== Tomar/seleccionar imagen =====
async takeImage() {

  let user = this.user();
  let path = `users/${user.uid}`


  const dataUrl = (await this.utilsSvc.takePicture('Imagen del Perfil')).dataUrl;

  const loading = await this.utilsSvc.loading();
  await loading.present();

  let imagePath = `${user.uid}/profile`;
  user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

  this.firebaseSvc.updateDocument(path, {image: user.image}).then(async res => {

    this.utilsSvc.saveInLocalStorage('user', user);

    this.utilsSvc.presentToast({
      message: 'Imagen Actualizada Exitosamente',
      duration: 5000,
      color: 'success',
      position: 'middle',
      icon: 'checkmark-circle-outline'
  })

  }).catch(error => {
    console.log(error);

    this.utilsSvc.presentToast({
      message: error.message,
      duration: 5000,
      color: 'primary',
      position: 'middle',
      icon: 'alert-circle-outline'
  })

  }).finally(()=> {
    loading.dismiss();
  })
}

}
