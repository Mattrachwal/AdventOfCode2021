"use strict";
exports.__esModule = true;
var fs = require("fs");
var rd = require("readline");
var reader = rd.createInterface(fs.createReadStream("./input.txt"));
var data = [];
reader.on("line", function (direction) {
    data.push(direction);
});
reader.on("close", function () {
    console.log(directionFinder(data));
    console.log(directionFinderAim(data));
});
var directionFinder = function (data) {
    var forward = 0;
    var depth = 0;
    data.forEach(function (direction) {
        if (direction.includes('forward')) {
            forward += parseInt(direction.substr(-1));
        }
        else if (direction.includes('up')) {
            depth -= parseInt(direction.substr(-1));
        }
        else {
            depth += parseInt(direction.substr(-1));
        }
    });
    return forward * depth;
};
var directionFinderAim = function (data) {
    var forward = 0;
    var depth = 0;
    var aim = 0;
    data.forEach(function (direction) {
        if (direction.includes('forward')) {
            var val = parseInt(direction.substr(-1));
            forward += val;
            depth += val * aim;
        }
        else if (direction.includes('up')) {
            aim -= parseInt(direction.substr(-1));
        }
        else {
            aim += parseInt(direction.substr(-1));
        }
    });
    return forward * depth;
};
