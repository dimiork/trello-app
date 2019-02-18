"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var ListActions = require("../../store/list/actions");
var BoardComponent = /** @class */ (function () {
    function BoardComponent(store, listService) {
        this.store = store;
        this.listService = listService;
        this.lists$ = this.store.pipe(store_1.select('lists'));
        this.addListDialog = false;
    }
    BoardComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new ListActions.Load());
    };
    BoardComponent.prototype.toggleAddListDialog = function () {
        this.addListDialog = !this.addListDialog;
    };
    BoardComponent.prototype.addList = function (title) {
        // const list = {
        //   title: title,
        // }
        this.store.dispatch(new ListActions.Add(title));
        // this.listService.createList(title);
        this.toggleAddListDialog();
    };
    BoardComponent.prototype.removeList = function (list) {
        // this.store.dispatch(new ListActions.Remove(list));
    };
    BoardComponent = __decorate([
        core_1.Component({
            selector: 'app-board',
            templateUrl: './board.component.html',
            styleUrls: ['./board.component.css']
        })
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
