import * as fs from 'fs';
import * as rd from 'readline'

let reader = rd.createInterface(fs.createReadStream("./input.txt"))

let data: Array<number> = [];
reader.on("line", (depth: number) => {
    data.push(+depth);
})
reader.on("close", ()=> {
    console.log(`Data has been read ${data.length}` );
    console.log(depthFinder(data));
    console.log(depthFinderWindow(data))
})


let depthFinder = (data: Array<number>) => {
  let depthIncrease: number = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i-1]) {
      depthIncrease++;
    }
  }
  return depthIncrease
}

let windowSum = (data: Array<number>, i) => {
  if (i+2 < data.length)
    return data[i] + data[i+1] + data[i+2]
}

let depthFinderWindow = (data: Array<number>) => {
  let depthIncrease: number = 0;
  for (let i = 3; i < data.length; i++) {
    if (windowSum(data, i) > windowSum(data,i-1)) {
      depthIncrease++;
    }
  }
  return depthIncrease;  
}