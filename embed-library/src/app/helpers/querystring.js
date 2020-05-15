"use strict";
exports.__esModule = true;
exports["default"] = {
    stringify: function (params) {
        return Object.keys(params).map(function (key) { return key + '=' + params[key]; }).join('&');
    }
};
