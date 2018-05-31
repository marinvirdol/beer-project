import { Component, OnInit } from '@angular/core';
import { Beer, PunkApiService } from '../../core/services/punk-api.service';
import { Observable, of, Subject } from 'rxjs';
import { SearchTextService } from '../../core/services/search-text.service';
import { takeUntil, take } from 'rxjs/operators';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-find-beers',
    templateUrl: 'find-beers.component.html'
})

export class FindBeersComponent implements OnInit {
    beers$: Observable<Beer[]> = of([]);

    private page = 1;
    private searchText = '';
    private componentDestroyed: Subject<Component> = new Subject<Component>();

    constructor(
        private router: Router,
        private punkApi: PunkApiService,
        private searchTextService: SearchTextService,
    ) { }

    ngOnInit() {
        this.beers$ = this.punkApi.fetch({ page: this.page });

        this.searchTextService.searchText$.pipe(
            takeUntil(this.componentDestroyed)
        ).subscribe((searchText: string) => {
            this.searchText = searchText;
            this.beers$ = this.punkApi.fetch({
                beerName: this.searchText,
                page: this.page,
            });
        });
    }

    onPageChange($event) {
        this.page = $event;
        this.beers$ = this.punkApi.fetch({
            beerName: this.searchText,
            page: this.page,
        });
    }

    navigate(id: number) {
        this.router.navigateByUrl(`/beers/${id}`);
    }

    trackById(index, item) {
        return item.id;
    }
}
