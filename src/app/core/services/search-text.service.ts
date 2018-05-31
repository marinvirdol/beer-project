import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SearchTextService {
    private searchTextSource = new Subject<string>();

    searchText$ = this.searchTextSource.asObservable();

    searchBy(searchText: string) {
        this.searchTextSource.next(searchText);
    }
}
