const fs = require("fs");
const csv = require('csvtojson');
const path = require('path');

const reverse = (str) => {
  let newString = "";
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  process.stdout.write(newString);
};

const transform = (str) => {
  process.stdout.write(str.toUpperCase());
};

const outputFile = (file) => {
  const stream = fs.createReadStream(file);
  stream.on('readable', function(){
    const data = stream.read();
    // process.stdout.write(data)
  });
  stream.on('end', function(){
    process.stdout.write(`Finished to read file ${file}`)
  });
};

const convertFromFile = (file) => {
  if(fs.existsSync(file)) {
    csv()
      .fromFile(file)
      .then((jsonObj) => {
        console.log('Log ::: jsonObj', jsonObj);
      })
  } else {
    console.log("given file does not exist!")
  }
};

const convertToFile = (file) => {
  console.log('Log ::: file', file);
  if(fs.existsSync(file)) {
    const name = path.basename(file, '.csv');
    if(!fs.existsSync(`${path.dirname(file)}/${name}.json`)) {
      const wstream = fs.createWriteStream(`${path.dirname(file)}/${name}.json`);

      csv()
        .fromFile(file)
        .then((jsonObj) => {
          wstream.write(JSON.stringify(jsonObj))
        });
      console.log("Json file has been created!")
    } else {
      console.log("Json file already exist!")
    }
  } else {
    console.log("given file does not exist!")
  }
};

module.exports = {
  reverse,
  transform,
  outputFile,
  convertToFile,
  convertFromFile,
};
