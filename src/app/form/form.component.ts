import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from 'jquery';

import { GameForm } from '../classes/game-form';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

gameForm: GameForm = new GameForm();

platforms: Observable<any[]> = this.db.collection('platforms', (ref) => ref.orderBy('name')).valueChanges();

  id: string = this.route.snapshot.paramMap.get('id');

  constructor(

    private db: AngularFirestore,

    private route: ActivatedRoute,

    private router: Router


    ) {}





  ngOnInit(): void {

    if (this.id !== null) {

    this.gameForm.id = this.id;

    this.db.collection<any>('games').doc(this.id).ref.get().then(

      (doc) => {

        if (doc.exists) {

          this.gameForm.id = doc.id;
          this.gameForm.title = doc.data().title;
          this.gameForm.cover = doc.data().cover;
          this.gameForm.description = doc.data().description;
          this.gameForm.platform = doc.data().platform;
          this.gameForm.media = doc.data().media;
          this.gameForm.date = doc.data().date;

        } else {
          alert('Documento não encontrado!\n Clique em [Ok] para continuar ...');

          this.router.navigate(['/list']);
        }
      }
    ).catch(

      (error) => {
        console.error('Falha ao obter o documento: ' , error);
      }
    );
    }

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

      this.db.collection<any>('games').doc(this.id).set(

   {
     title: this.gameForm.title,
     cover: this.gameForm.cover,
     description: this.gameForm.description,
     platform: this.gameForm.platform,
     media: this.gameForm.media,
     date: this.gameForm.date

   }

      ).then(
        () => {
        alert(`"${this.gameForm.title}" atualizado com sucesso!\n\nClique em [Ok] para continuar.`);

        this.router.navigate(['/list']);
    }
      ).catch(
        (error) =>{
          console.error('Falha ao atualizar Db', error);
        }
      );
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
