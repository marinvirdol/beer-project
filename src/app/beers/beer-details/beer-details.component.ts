import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { Beer, PunkApiService } from '../../core/services/punk-api.service';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-beer-details',
    templateUrl: 'beer-details.component.html',
})

export class BeerDetailsComponent implements OnInit, OnDestroy {
    beer$: Observable<Beer> = of(null);

    private componentDestroyed: Subject<Component> = new Subject<Component>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private punkApiService: PunkApiService,
    ) { }

    ngOnInit() {
        this.beer$ = this.route.paramMap.pipe(
            takeUntil(this.componentDestroyed),
            switchMap((params: ParamMap) =>
              this.punkApiService.getBeer(params.get('id')))
          );
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

    goBack() {
        this.router.navigateByUrl('/beers');
    }

    trackByIndex(index) {
        return index;
    }
}
