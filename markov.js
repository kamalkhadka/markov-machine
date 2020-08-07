/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      if (chains.get(this.words[i])) {
        chains.get(this.words[i]).push(this.words[i + 1] || null);
      } else {
        chains.set(this.words[i], [this.words[i + 1] || null]);
      }
    }
    this.chains = chains;
  }

    /** return random text from chains */
  
    makeText(numWords = 100) {
       let result = [];
  
      while (result.length <= numWords) {
        let keys = Array.from(this.chains.keys());
        let key = keys[Math.floor(Math.random() * keys.length)];
        result.push(key);
      }
  
      return result.join(" ");
    }
}

module.exports = {
  MarkovMachine,
};
