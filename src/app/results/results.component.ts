import {Component, OnInit} from '@angular/core';
import {Globals} from '../app.component';
import {AppService} from '../app.service';
import {Book} from '../_models/book';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    private appService: AppService;

    constructor(appService: AppService,
                public globals: Globals) {
        this.appService = appService;
    }


    ngOnInit() {

    }

    addBookToShelve(book: Book) {
        this.appService.addBookToFavorites(book);
    }
}
