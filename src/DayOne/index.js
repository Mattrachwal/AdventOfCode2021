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
});
var depthFinder = function (data) {
    var depthIncrease = 0;
    for (var i = 1; i < data.length; i++) {
        console.log(typeof data[i]);
        if (data[i] > data[i - 1]) {
            depthIncrease++;
            console.log("".concat(data[i - 1], " < ").concat(data[i], "  ==== ").concat(depthIncrease));
        }
        else {
            console.log("".concat(data[i - 1], " > ").concat(data[i], " ==== ").concat(depthIncrease, " - NO INCREASE"));
        }
    }
    return depthIncrease;
};
