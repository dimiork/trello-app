"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ListService = /** @class */ (function () {
    function ListService(store, localstorage) {
        this.store = store;
        this.localstorage = localstorage;
        this.storageId = 'trello-lists';
        // this.lists$ = this.store.pipe(
        //   select('lists'),
        //   tap((listCollection: List[]) => {
        //     console.log(listCollection);
        //     this.localstorage.save(this.storageId, listCollection);
        //   })
        // );
    }
    ListService.prototype.loadLists = function () {
        return rxjs_1.of(this.localstorage.load(this.storageId));
    };
    ListService.prototype.saveLists = function (lists) {
        this.localstorage.save(this.storageId, lists);
    };
    ListService.prototype.insert = function (list) {
        var storage = this.localstorage.load(this.storageId);
        var newList = __assign({}, list, { id: Math.random().toString(26).slice(2) });
        this.localstorage.save(this.storageId, storage.concat([newList]));
        return rxjs_1.of(newList);
    };
    ListService.prototype.update = function (list) {
        var storage = this.localstorage.load(this.storageId);
        this.localstorage.save(this.storageId, storage.map(function (el) {
            if (el.id === list.id) {
                return __assign({}, el, { title: list.title, items: el.items.slice() });
            }
            return el;
        }));
        // this.localstorage.save(this.storageId, [
        //   ...storage.filter((el) => el.id !== list.id),
        //   list
        // ]);
        return rxjs_1.of(list);
    };
    // return state.map((list: List) => {
    //   if (list.id === action.list.id) {
    //           return {
    //             ...list,
    //             title: action.list.title.trim(),
    //             items: [...action.list.items]
    //           };
    //         }
    //         return list;
    ListService.prototype.remove = function (id) {
        var storage = this.localstorage.load(this.storageId);
        if (storage.some(function (el) { return el.id === id; })) {
            this.localstorage.save(this.storageId, storage.filter(function (el) { return el.id !== id; }));
            return rxjs_1.of(id);
        }
        throw Error(" " + id + " was not found. Nothing to be removed.");
    };
    ListService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ListService);
    return ListService;
}());
exports.ListService = ListService;
