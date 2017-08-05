import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireModule } from 'angularFire2';
import { FirebaseListObservable, AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  songs: FirebaseListObservable<any>;
  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, private barcodeScanner: BarcodeScanner) {
    this.songs = af.list('/songs');
    this.items = af.list('/items');
  }

  addItem() {
    let prompt = this.alertCtrl.create({
      title: 'Item Name',
      message: "Enter a name for the item you wish to add.",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {
            this.items.push({
              name: data.name
            });
          }
        }
      ]
    })
    prompt.present();
  }

  showOptions(itemId, itemName) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Item',
          role: 'destructive',
          handler: () => {
            this.removeItem(itemId);
          }
        },{
          text: 'Update name',
          handler: () => {
            this.updateSong(itemId, itemName);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeItem(itemId: string) {
    this.items.remove(itemId);
  }

  updateSong(itemId, itemName){
    let prompt = this.alertCtrl.create({
      title: 'Item Name',
      message: "Update the name for this item",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: itemName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.items.update(itemId, {
              name: data.name
            });
          }
        }
      ]
    });
    prompt.present();
  }

  scanItem() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.items.push({
              name: barcodeData.text
            });
      alert("You successfully scaned an Item. The Barcode Data is: " + barcodeData.text);
    }, (err) => {
      alert("Could not scann this barcode. Please try again or make sure it's a valid barcode.");
    });
  }

}
