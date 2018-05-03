import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Book} from '../_models/book';
import {Globals} from '../app.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    private appService: AppService;
    public searchText: string;
    public dirtyBit = true;
    public books: Array<Book> = new Array<Book>();

    constructor(appService: AppService,
                public globals: Globals) {
        this.appService = appService;
    }

    ngOnInit() {
        this.appService.displaySomeBooks();
    }

    searchBooks(event: any, startIndex) {
        this.globals.counterObject = [];
        if (event.which === 13 || event.which === 1) {
            this.dirtyBit = false;
            this.globals.startIndex = startIndex || 0;
            this.appService.queryWithSearchText(this.searchText, this.globals.startIndex).subscribe(
                res => {
                    this.globals.booksFromQueryResult = (res.books);
                    this.globals.totalRecords = res.count;
                    this.globals.totalPagesOfRecords = parseInt((this.globals.totalRecords / 36).toFixed(), 10);
                    for (let i = 0; i < this.globals.totalPagesOfRecords; i++) {
                        this.globals.counterObject.push({i});
                    }
                }
            );
        } else {
            this.dirtyBit = true;
        }
    }
}
