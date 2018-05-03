import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Book} from './_models/book';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Globals} from './app.component';

@Injectable()
export class AppService {

    private appKey = 'AIzaSyDIWstwzbxkANobXqJ4X8bCN1x1sMnL4pM';

    constructor(private http: HttpClient,
                public globals: Globals) {
    }

    displaySomeBooks() {
        this.queryWithSearchText('book', 0).subscribe(
            res => {
                this.globals.booksFromQueryResult = (res.books);
            });
    }

    queryWithSearchText(searchText: string, startIndex: number): Observable<any> {
        const urlForQuery: string = 'https://www.googleapis.com/books/v1/volumes?q=' + searchText + '&startIndex=' + startIndex * 36 + '&maxResults=36&key=' + this.appKey;

        return this.http.get(urlForQuery)
            .map(this.responseDataOfBooks)
            .catch(this.handleError);
    }

    private responseDataOfBooks(res: Response) {
        const body = res;
        const books: Array<Book> = new Array<Book>();
        const bookResponse = body;
        for (const book of bookResponse['items']) {
            books.push({
                title: book.volumeInfo.title,
                id: book.id,
                authors: book.volumeInfo.authors,
                pageCount: book.volumeInfo.pageCount,
                image: book.volumeInfo.imageLinks === undefined ? '' : book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail,
                previewLink: book.volumeInfo.previewLink
            });

        }
        return {count: bookResponse['totalItems'], books: books};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body['error'] || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getFavorites() {
        this.globals.favoritesBooks = JSON.parse(window.localStorage.getItem('books'));
    }

    addBookToFavorites(book: Book) {
        let newBook = true;
        let booksOnFavShelve: any;
        if (window.localStorage.getItem('books')) {
            booksOnFavShelve = JSON.parse(window.localStorage.getItem('books'));
            for (const someBook of booksOnFavShelve) {
                if (book.id === someBook.id) {
                    newBook = false;
                }
            }
            if (newBook) {
                booksOnFavShelve = Array.from(booksOnFavShelve);
                booksOnFavShelve.push(book);
                const listBooks = JSON.stringify(booksOnFavShelve);
                localStorage.setItem('books', listBooks);
                console.log('book was added');
            } else {
                console.log('book already on shelve');
            }
        } else {
            booksOnFavShelve = JSON.stringify(book);
            localStorage.setItem('books', booksOnFavShelve);
        }
    }

    deleteFromFavorites(bookId: string) {
        const booksOnFavShelve = JSON.parse(window.localStorage.getItem('books'));
        const shelveAfterDelete = [];
        for (const someBook of booksOnFavShelve) {
            if (bookId !== someBook.id) {
                shelveAfterDelete.push(someBook);
            }
        }
        const listBooks = JSON.stringify(shelveAfterDelete);
        localStorage.setItem('books', listBooks);
        console.log('book was deleted');
        this.getFavorites();
    }
}
