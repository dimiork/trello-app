"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var LocalstorageService = /** @class */ (function () {
    function LocalstorageService() {
    }
    LocalstorageService.prototype.load = function (id) {
        return JSON.parse(window.localStorage.getItem(id)) || [];
    };
    LocalstorageService.prototype.save = function (id, data) {
        if (!!data) {
            window.localStorage.setItem(id, JSON.stringify(data));
        }
    };
    LocalstorageService.prototype.clear = function (id) {
        window.localStorage.removeItem(id);
    };
    LocalstorageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocalstorageService);
    return LocalstorageService;
}());
exports.LocalstorageService = LocalstorageService;
