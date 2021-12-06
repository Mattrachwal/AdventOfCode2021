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
    console.log(lifeSupportFinder(data));
});
var diagnosticFinder = function (data) {
    var gammaRate = '';
    var epsilonRate = '';
    var rateTracker = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    data.forEach(function (record) {
        for (var i = 0; i < record.length; i++) {
            if (record[i] === "1") {
                rateTracker[i] += 1;
            }
        }
    });
    rateTracker.forEach(function (val) {
        if (val > data.length / 2) {
            gammaRate += '1';
            epsilonRate += '0';
        }
        else {
            gammaRate += '0';
            epsilonRate += '1';
        }
    });
    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};
var gammaLooper = function (data, place, count) {
    if (count === void 0) { count = 0; }
    var reducedData = [];
    if (data.length > 1) {
        var onesTotal_1 = 0;
        var bigger_1 = '0';
        data.forEach(function (val) {
            if (val[place] === '1') {
                onesTotal_1 += 1;
            }
        });
        if (onesTotal_1 >= data.length / 2) {
            bigger_1 = '1';
        }
        data.forEach(function (val) {
            if (val[place] === bigger_1) {
                reducedData.push(val);
            }
        });
        return gammaLooper(reducedData, place + 1, count + 1);
    }
    else {
        console.log(data.length);
        return data[0];
    }
};
var epsilonLooper = function (data, place, count) {
    if (count === void 0) { count = 0; }
    var reducedData = [];
    if (data.length > 1) {
        var onesTotal_2 = 0;
        var smaller_1 = '1';
        data.forEach(function (val) {
            if (val[place] === '0') {
                onesTotal_2 += 1;
            }
        });
        if (onesTotal_2 <= data.length / 2) {
            smaller_1 = '0';
        }
        data.forEach(function (val) {
            if (val[place] === smaller_1) {
                reducedData.push(val);
            }
        });
        return epsilonLooper(reducedData, place + 1, count + 1);
    }
    else {
        console.log(data.length);
        return data[0];
    }
};
var lifeSupportFinder = function (data) {
    return parseInt(epsilonLooper(data, 0, 0), 2) * parseInt(gammaLooper(data, 0, 0), 2);
};
