import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent {
    @Input() isFavorite: boolean;
    @Output() change = new EventEmitter();

    fav() {
        this.isFavorite = !this.isFavorite;
        console.log('toggled favorite');

        this.change.emit({ newValue: this.isFavorite });
    }
}

export interface FavoriteChangedEventArgs {
   newValue: boolean 
}
