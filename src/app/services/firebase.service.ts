import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private storage: AngularFirestore,
              private utilSvc: UtilsService) {}

  //===== Autenticacion =====
  getAuth() {
    return getAuth();
  }

  //===== Acceder =====
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //===== Sign Up =====
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //===== Actualizar Usuario =====
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, {displayName})
  }

  //===== Enviar email para restablecer contraseña =====
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  //===== Cerrar sesion =====
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilSvc.routerLink('/auth');
  }


  //===== Base de Datos =====
  //===== Obtener documentos de una coleccion =====
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...collectionQuery), {idField: 'id'});
  }



  //===== Setear Documento =====
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //===== Actualizar Documento =====
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

   //===== Eliminar Documento =====
   deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  //===== Obtener Documento =====
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //===== Agregar Documento =====
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //===== Almacenamiento =====
  //===== Subir imagen =====
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
    }

  //===== Obtener ruta de la imagen con su url =====
  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath
  }

  //===== Eliminar Archivo =====
  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));
  }
  }

