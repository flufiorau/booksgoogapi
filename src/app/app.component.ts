import {Component, Injectable} from '@angular/core';
import {Book} from './_models/book';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'some app for search books with Google Books API';
}

@Injectable()


export class Globals {
    booksFromQueryResult: Array<Book> = new Array<Book>();
    totalRecords: number;
    totalPagesOfRecords: number;
    startIndex: number;
    favoritesBooks: Array<Book>;
    counterObject = [];
}
