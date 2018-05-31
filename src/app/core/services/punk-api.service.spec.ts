import { TestBed, inject } from '@angular/core/testing';

import { PunkApiService, Beer } from './punk-api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PunkApiService', () => {
  let httpSpy;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpSpy,
        },
        PunkApiService,
      ]
    });
  });

  it('should be created', inject([PunkApiService], (service: PunkApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('Fetch beers', () => {
    it('should make the correct call WITHOUT a beer name', inject([PunkApiService], (service: PunkApiService) => {
      httpSpy.get.and.returnValue(of([]));
      service.fetch({ page: 0 });
      expect(httpSpy.get).toHaveBeenCalledWith('https://api.punkapi.com/v2/beers?page=0&per_page=20');
    }));

    it('should make the correct call WITH a beer name', inject([PunkApiService], (service: PunkApiService) => {
      httpSpy.get.and.returnValue(of([]));
      service.fetch({ page: 0, beerName: 'Heineken' });
      expect(httpSpy.get).toHaveBeenCalledWith('https://api.punkapi.com/v2/beers?page=0&per_page=20&beer_name=Heineken');
    }));

    it('should return a list of beers', inject([PunkApiService], (service: PunkApiService) => {
      const beers: Beer[] = [{
        id: 0,
        name: 'Heineken',
        tagline: 'bla',
        description: 'blash',
        image_url: 'some url'
      }, {
        id: 1,
        name: 'Duvel',
        tagline: 'beer',
        description: 'have no fear Duvel is here',
        image_url: 'some url 2'
      }];
      httpSpy.get.and.returnValue(of());
      service.fetch({ page: 0 }).subscribe((result) => {
        expect(result).toEqual(beers);
      });
    }));
  });

  describe('Get beer', () => {
    it('should make the correct call to fetch a beer', inject([PunkApiService], (service: PunkApiService) => {
      httpSpy.get.and.returnValue(of([]));
      service.getBeer('1');
      expect(httpSpy.get).toHaveBeenCalledWith('https://api.punkapi.com/v2/beers/1');
    }));

    it('should return a beer', inject([PunkApiService], (service: PunkApiService) => {
      const beer: Beer = {
        id: 1,
        name: 'Duvel',
        tagline: 'beer',
        description: 'have no fear Duvel is here',
        image_url: 'some url 2'
      };
      httpSpy.get.and.returnValue(of([beer]));
      service.getBeer('1').subscribe((result) => {
        expect(result).toEqual(beer);
      });
    }));
  });
});
