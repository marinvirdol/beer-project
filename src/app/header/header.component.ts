import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { Subject, of, Observable } from 'rxjs';
import { SearchTextService } from '../core/services/search-text.service';
import { Router, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  searchFormVisible = true;

  private componentDestroyed: Subject<Component> = new Subject<Component>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchTextService: SearchTextService,
  ) { }

  ngOnInit() {
    this.searchForm = this.buildSearchForm();
    this.router.events.pipe(
      takeUntil(this.componentDestroyed),
      filter((event: any) => event instanceof NavigationEnd),
      map(event => event.url === '/beers')
    ).subscribe(event => this.searchFormVisible = event);

    this.searchForm.valueChanges.pipe(
      takeUntil(this.componentDestroyed),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((formValue) => {
        return of(formValue.searchText);
      })
    ).subscribe((searchText: string) => this.searchTextService.searchBy(searchText));
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  private buildSearchForm(): FormGroup {
    return this.fb.group({
      searchText: '',
    });
  }

}
