import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent, Globals} from './app.component';
import {SearchComponent} from './search/search.component';
import {AppService} from './app.service';
import {FormsModule} from '@angular/forms';
import {ResultsComponent} from './results/results.component';
import {MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatToolbarModule, MatGridListModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        ResultsComponent,
        FavoritesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
    ],
    providers: [
        AppService,
        Globals],
    bootstrap: [AppComponent]
})
export class AppModule {
}
