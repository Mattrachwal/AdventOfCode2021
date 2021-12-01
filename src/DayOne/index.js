"use strict";
exports.__esModule = true;
var fs = require("fs");
var rd = require("readline");
var reader = rd.createInterface(fs.createReadStream("./input.txt"));
var data = [];
reader.on("line", function (depth) {
    data.push(+depth);
});
reader.on("close", function () {
    console.log("Data has been read ".concat(data.length));
    console.log(depthFinder(data));
    console.log(depthFinderWindow(data));
});
var depthFinder = function (data) {
    var depthIncrease = 0;
    for (var i = 1; i < data.length; i++) {
        if (data[i] > data[i - 1]) {
            depthIncrease++;
        }
    }
    return depthIncrease;
};
var windowSum = function (data, i) {
    if (i + 2 < data.length)
        return data[i] + data[i + 1] + data[i + 2];
};
var depthFinderWindow = function (data) {
    var depthIncrease = 0;
    for (var i = 3; i < data.length; i++) {
        if (windowSum(data, i) > windowSum(data, i - 1)) {
            depthIncrease++;
        }
    }
    return depthIncrease;
};
