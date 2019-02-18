"use strict";
exports.__esModule = true;
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["Load"] = "[LISTS] LOAD";
    ActionTypes["LoadSuccess"] = "[LISTS] LOADED SUCCESS";
    ActionTypes["LoadFail"] = "[LISTS] LOADED FAIL";
    ActionTypes["Add"] = "[LIST] ADD";
    ActionTypes["AddSuccess"] = "[LIST] ADD SUCCESS";
    ActionTypes["AddFail"] = "[LIST] ADD FAIL";
    ActionTypes["Update"] = "[LIST] UPDATE";
    ActionTypes["UpdateSuccess"] = "[LIST] UPDATE SUCCESS";
    ActionTypes["Remove"] = "[LIST] REMOVE";
    ActionTypes["RemoveSuccess"] = "[LIST] REMOVE SUCCESS";
    // Clear = '[LIST] CLEAR',
    // AddItem = '[LIST] ADD_ITEM',
    // UpdateItem = '[LIST] UPDATE_ITEM',
    // RemoveItem = '[LIST] REMOVE_ITEM'
})(ActionTypes = exports.ActionTypes || (exports.ActionTypes = {}));
var Load = /** @class */ (function () {
    function Load() {
        this.type = ActionTypes.Load;
    }
    return Load;
}());
exports.Load = Load;
var LoadSuccess = /** @class */ (function () {
    function LoadSuccess(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadSuccess;
    }
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFail = /** @class */ (function () {
    function LoadFail(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadFail;
    }
    return LoadFail;
}());
exports.LoadFail = LoadFail;
var Add = /** @class */ (function () {
    function Add(payload) {
        this.payload = payload;
        this.type = ActionTypes.Add;
    }
    return Add;
}());
exports.Add = Add;
var AddSuccess = /** @class */ (function () {
    function AddSuccess(payload) {
        this.payload = payload;
        this.type = ActionTypes.AddSuccess;
    }
    return AddSuccess;
}());
exports.AddSuccess = AddSuccess;
var AddFail = /** @class */ (function () {
    function AddFail(payload) {
        this.payload = payload;
        this.type = ActionTypes.AddFail;
    }
    return AddFail;
}());
exports.AddFail = AddFail;
var Update = /** @class */ (function () {
    function Update(payload) {
        this.payload = payload;
        this.type = ActionTypes.Update;
    }
    return Update;
}());
exports.Update = Update;
var UpdateSuccess = /** @class */ (function () {
    function UpdateSuccess(payload) {
        this.payload = payload;
        this.type = ActionTypes.UpdateSuccess;
    }
    return UpdateSuccess;
}());
exports.UpdateSuccess = UpdateSuccess;
var Remove = /** @class */ (function () {
    function Remove(payload) {
        this.payload = payload;
        this.type = ActionTypes.Remove;
    }
    return Remove;
}());
exports.Remove = Remove;
var RemoveSuccess = /** @class */ (function () {
    function RemoveSuccess(payload) {
        this.payload = payload;
        this.type = ActionTypes.RemoveSuccess;
    }
    return RemoveSuccess;
}());
exports.RemoveSuccess = RemoveSuccess;
// | LoadFail
// | Add
// | AddSuccess
// | AddFail
// | Update
// | Remove
// | Clear
// | AddItem
// | UpdateItem
// | RemoveItem;
