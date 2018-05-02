import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Globals} from '../app.component';
import {Book} from '../_models/book';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {


    private appService: AppService;

    constructor(appService: AppService,
                public globals: Globals) {
        this.appService = appService;
    }

    getFavorites() {
        this.appService.getFavorites();
    }

    ngOnInit() {
        this.appService.getFavorites();
    }

    deleteBookFromShelve(bookId: string) {
        this.appService.deleteFromFavorites(bookId);
    }
}
