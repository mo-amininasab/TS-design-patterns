const fs = require('fs');

interface Entry {
  number: number;
}

class Journal {
  entries: object;
  static count: number = 0;

  constructor() {
    this.entries = {};
  }

  addEntry(text: string) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index: number) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }
}

class PersistanceManager {
  saveToFile(journal: Journal, filename: string) {
    fs.writeFileSync(filename, journal.toString());
  }
}

Journal.count = 0;
let j = new Journal();

j.addEntry('I cried today.');
j.addEntry('I ate a bug.');

let p = new PersistanceManager();
let filename = 'c:/.../.../journal.txt';
p.saveToFile(j, filename);
