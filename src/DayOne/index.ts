import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./input.txt"))

var data: Array<number> = [];
reader.on("line", (depth: number) => {
    data.push(+depth);
})
reader.on("close", ()=> {
    console.log(`Data has been read ${data.length}` );
    console.log(depthFinder(data));
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