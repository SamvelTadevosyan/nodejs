import events from 'events';
import fs from 'fs';

import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';
import cloneDeep from 'lodash.clonedeep';


export default class DirWatcher{
  constructor(path, delay){
    this.props = {
      path,
      delay,
    };

    this.givenDirectory = {};
    this.eventEmitter = new events.EventEmitter()
  }


  gag() {
    const {
      path,
      delay
    } = this.props;

    if(fs.existsSync(path)){
      const stats = fs.lstatSync(path);

      if(stats.isDirectory()){
        fs.readdir(path, (err, files) => {

          // if(!isEqual(files, Object.keys(this.givenDirectory))) {
          //   this.eventEmitter.emit('changed');
          //   console.log('Log ::: changed');
          // }

          files.forEach((file) => {

            const stats = fs.statSync(`${path}/${file}`);
            const lastModified =  new Date(stats.mtime).getTime();


          });
          console.log('Log ::: this.givenDirectory', this.givenDirectory);

        });
      } else {
        console.log('Given path is not a directory!')
      }

    } else {
      console.log('Given path does not exist!')
    }
  }

  watch() {
    setInterval(() => {
      this.gag()

    }, 1000);
  }

}