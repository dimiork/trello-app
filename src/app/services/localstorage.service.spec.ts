import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';

describe('LocalstorageService', () => {
  let service: LocalstorageService;
  const data = [{ id: '1', title: 'Title 1', items: [{ title: 'item name', description: 'item description'}]}];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LocalstorageService ]
    })
    service = TestBed.get(LocalstorageService);
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store lists in localStorage',
    () => {
      service.save(data);
      expect(localStorage.getItem(service.name)).toEqual(JSON.stringify(data));
  });

  it('should return stored lists from localStorage',
    () => {
      localStorage.setItem(service.name, JSON.stringify(data));
      expect(service.load()).toEqual(data);
  });
});
