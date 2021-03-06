import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";



export const firebaseConfig = {
  apiKey: "AIzaSyAh6JjolaF3HuqOG_i8kKRpMWRhAxYNeqY",
  authDomain: "hopechest-f62fe.firebaseapp.com",
  databaseURL: "https://hopechest-f62fe.firebaseio.com",
  projectId: "hopechest-f62fe",
  storageBucket: "hopechest-f62fe.appspot.com",
  messagingSenderId: "97779542033"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    // AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
