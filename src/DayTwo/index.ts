import * as fs from 'fs';
import * as rd from 'readline'

let reader = rd.createInterface(fs.createReadStream("./input.txt"))

let data: Array<string> = [];
reader.on("line", (direction: string) => {
    data.push(direction);
})
reader.on("close", ()=> {
  console.log(directionFinder(data));
  console.log(directionFinderAim(data));

})

const directionFinder = (data: string[]) => {
  let forward: number = 0
  let depth: number = 0
  data.forEach((direction) => {
    if(direction.includes('forward')) {
      forward += parseInt(direction.substr( -1 ))
    } else if (direction.includes('up')) {
      depth -= parseInt(direction.substr( -1 ))
    } else {
      depth += parseInt(direction.substr( -1 ))
    }
  });
  return forward * depth;
}

const directionFinderAim = (data: string[]) => {
  let forward: number = 0;
  let depth: number = 0;
  let aim: number = 0
  data.forEach((direction) => {
    if(direction.includes('forward')) {
      let val: number = parseInt(direction.substr( -1 ))
      forward += val
      depth += val * aim
    } else if (direction.includes('up')) {
      aim -= parseInt(direction.substr( -1 ))
    } else {
      aim += parseInt(direction.substr( -1 ))
    }
  });
  return forward * depth
}