import * as fs from 'fs';
import * as rd from 'readline'

let reader = rd.createInterface(fs.createReadStream("./input.txt"))

let data: Array<string> = [];
reader.on("line", (direction: string) => {
    data.push(direction);
})
reader.on("close", ()=> {
  console.log(lifeSupportFinder(data));

})

const diagnosticFinder = (data: string[]) => {
  let gammaRate: string = ''
  let epsilonRate: string = ''
  let rateTracker: number[] = new Array(0,0,0,0,0,0,0,0,0,0,0,0)

  data.forEach((record) => {
    for(let i: number = 0; i < record.length; i++) {
      if (record[i] === "1") {
        rateTracker[i] += 1
      }
    }
  })

  rateTracker.forEach((val: number) => {
    if(val > data.length / 2) {
      gammaRate += '1'
      epsilonRate += '0'
    } else {
      gammaRate += '0'
      epsilonRate += '1'
    }
  })

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2); 
}

const gammaLooper = (data: string[], place:number, count: number = 0) => {
  let reducedData: string[] = [];
  if(data.length > 1) {
    let onesTotal: number = 0;
    let bigger: string = '0';
    data.forEach((val: string) => {
      if (val[place] === '1') {
        onesTotal += 1;
      }
    })

    if (onesTotal >= data.length / 2) {
      bigger = '1';
    }

    data.forEach((val: string) => {
      if(val[place] === bigger) {
        reducedData.push(val)
      }
    })
    return gammaLooper(reducedData, place+1, count+1)
  } else {
    console.log(data.length)
    return data[0]
  }
}

const epsilonLooper = (data: string[], place:number, count: number = 0) => {
  let reducedData: string[] = [];
  if(data.length > 1) {
    let onesTotal: number = 0;
    let smaller: string = '1';
    data.forEach((val: string) => {
      if (val[place] === '0') {
        onesTotal += 1;
      }
    })

    if (onesTotal <= data.length / 2) {
      smaller = '0';
    }

    data.forEach((val: string) => {
      if(val[place] === smaller) {
        reducedData.push(val)
      }
    })

    return epsilonLooper(reducedData, place+1, count+1)
  } else {

    console.log(data.length)
    return data[0]
  }
}
const lifeSupportFinder = (data: string[]) => {

  return parseInt(epsilonLooper(data, 0, 0), 2) * parseInt(gammaLooper(data, 0, 0), 2);
}