import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Game {
  cover: string;
  date: string;
  description: string;
  media: string;
  platform: string;
  title: string;
}


export interface GameId extends Game {
  id: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {




  private gameCollection: AngularFirestoreCollection<Game>;


  games: Observable<GameId[]>;


  orderBy: string;


  orderDr: any;

  constructor(private db: AngularFirestore) {

    this.orderBy = 'title';


    this.orderDr = 'asc';

  }

  ngOnInit(): void {


    this.getList();

  }

  getList() {

    this.gameCollection = this.db.collection<Game>('games', ref => ref.orderBy(this.orderBy, this.orderDr));

    this.games = this.gameCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Game;
        const id = a.payload.doc.id;

        return { id, ...data };
      }))
    );
  }


  changeOrderField(field: string) {

    if (this.orderBy !== field) {
      this.orderBy = field;
      this.getList();
    }
    return false;

  }

  changeOrderDir(direction: any) {

    if (this.orderDr !== direction) {
      this.orderDr = direction;
      this.getList();
    }
    return false;

  }


  deleteGame(gameKey, gameTitle) {


    if (!confirm(`Oooops!\nTem certeza que deseja apagar "${gameTitle}" da sua coleção?`)) {
      return false;
    }

    this.db.collection('games').doc(gameKey).delete()
      .then(res => {
        alert(`"${gameTitle}" foi apagado da sua coleção!\nClique em [Ok] para continuar.`);
      })
      .catch(err => {
        console.error(`Falha ao apagar: ${err}`);
      });

    return false;

  }
}
