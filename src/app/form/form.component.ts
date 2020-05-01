import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from 'jquery';

import { GameForm } from '../classes/game-form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

gameForm: GameForm = new GameForm();

  platforms: Observable<any[]>;

  constructor(private db: AngularFirestore) {

    this.platforms = this.db.collection('platforms', (ref) => ref.orderBy('name')).valueChanges();

  }

  ngOnInit(): void {

    $(document).ready(() => {
      $(window).resize(() => {
        if (window.innerWidth > 539) {
          $('aside').show(0);
        } else {
          $('aside').hide(0);
        }
      });
    });
  }

  onSubmit() {
    console.log(this.gameForm);

    if (this.gameForm.id === undefined) {


      this.db.collection<any>('games').add({ ...this.gameForm })
        .then(() => {


          alert(`Jogo "${this.gameForm.title}" adicionado com sucesso!\n\nClique em OK para continuar`);


          this.gameForm = new GameForm();

          return false;

        })
        .catch((err) => {

        console.error('Erro ao gravar dados: ' + err);
      });

    } else {


    }


  }


  helpToggle() {
    $(document).ready(() => {

      if ($('aside').is(':visible')) {
        this.helpHide();
      } else {
        this.helpShow();
      }

    });
    return false;
  }


  helpHide() {
    $('aside').slideUp('fast');
  }


  helpShow() {
    $('aside').slideDown('fast');
  }

  hideAside() {
    if (window.innerWidth > 539) {
      return false;
    } else {
      this.helpHide();
    }
  }

}
