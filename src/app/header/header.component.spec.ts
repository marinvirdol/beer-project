import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SearchTextService } from '../core/services/search-text.service';
import { Router, NavigationEnd } from '@angular/router';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { of } from 'rxjs';
import { BeersModule } from '../beers/beers.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  let searchTextServiceSpy;
  let routerSpy;

  beforeEach(() => {
    searchTextServiceSpy = jasmine.createSpyObj('SearchTextService', ['searchBy']);
    routerSpy = {
      events: of(new NavigationEnd(0, '', '')),
    };
  });

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: '/beers', pathMatch: 'full' },
          { path: '', loadChildren: './beers/beers.module#BeersModule' },
        ])
      ],
      declarations: [ HeaderComponent ],
      providers: [
        FormBuilder,
        {
          provide: SearchTextService,
          useValue: searchTextServiceSpy,
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', fakeAsync(() => {
    router = TestBed.get(Router);
    router.initialNavigation();
    const loader: SpyNgModuleFactoryLoader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = { lazyModule: BeersModule };
    router.resetConfig([
      { path: '', redirectTo: '/beers', pathMatch: 'full' },
      { path: '', loadChildren: 'lazyModule' },
    ]);
    router.navigateByUrl('');
    tick();
    expect(component).toBeTruthy();
  }));

  describe('On Init', () => {
    it('should create the form group', () => {
      expect(component.searchForm).toBeTruthy();
      expect(component.searchForm.get('searchText')).toBeTruthy();
      expect(component.searchForm.get('searchText').value).toBe('');
    });

    it('should notify the search service that a search needs to happen', fakeAsync(() => {
      component.searchForm.get('searchText').patchValue('heineken');
      tick(300);
      expect(searchTextServiceSpy.searchBy).toHaveBeenCalledWith('heineken');
    }));

    it('should display the search form if the current url matches', fakeAsync(() => {
      router = TestBed.get(Router);
      router.initialNavigation();
      const loader: SpyNgModuleFactoryLoader = TestBed.get(NgModuleFactoryLoader);
      loader.stubbedModules = { lazyModule: BeersModule };
      router.resetConfig([
        { path: 'beers/:id', loadChildren: 'lazyModule' },
      ]);
      router.navigateByUrl('/beers/1');
      tick();
      expect(component.searchFormVisible).toBe(false);
    }));
  });
});
