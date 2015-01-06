/**
* Modified version of SentiWordNet to be more usable
* in a more accurate sentiment analysis.
* It has been modified by:
*   - Removing Glossary of words
*   - Changing each value that had multiple SynsetTerms
*     into distinct SynsetTerms for ease of lookup.
*   - Broken down into seperate lists of adjective,
*     adverbs, nouns, and verbs.
*   - Sorted by SynsetTerm so it can binary searched.
*
* SentiWordNet is distributed under the
* Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) license.
* More info about SentiWordNet can be found at
* http://sentiwordnet.isti.cnr.it/
*/
var dict = require('../build/modifiedSentiWordNet.json');

/**
* pos is a part-of-setence tagging module that can quickly identify
* the pos of words within a given sentence. This allows us to identify
* if a word is being used as a noun, verb, adjective, or adverb and to
* look it up in the correct array within the modified SentiWordNet object.
* (ex. address can be used as a noun and a verb, with different sentiment.)
*/
var pos = require('pos');

/**
 * Binary search used for finding the desired term
 * inside the modified SentiWordNet dictionary.
 *
 * @param {Array} Search array
 * @param {String} String being searched for

 * @return {Integer} Index of desired word if found, else -1.
 */
function binarySearch(array, key) {
  var lo = 0,
    hi = array.length - 1,
    mid,
    element;
  while (lo <= hi) {
    mid = ((lo + hi) >> 1);
    element = array[mid];
    if (element.SynsetTerms < key) {
      lo = mid + 1;
    } else if (element.SynsetTerms > key) {
      hi = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

/**
 * Given a phrase, break down and calculate sentiment values.
 *
 * @param {String} Input phrase
 *
 * @return {Object} Output of calculate sentiment values.
 */
module.exports = function (phrase) {
  var totalWords = new pos.Lexer().lex(phrase),
    tokens       = new pos.Tagger().tag(totalWords),
    ngrams       = [],
    words        = [],
    positive     = 0,
    negative     = 0,
    objective    = 0;

  var index = tokens.length;
  while(index--){
    var word =   tokens[index];
    var values = undefined;
    if(word[1] === ('JJ' || 'JJR' || 'JJS')){
      //word is an adjective
      values = dict.adjective[binarySearch(dict.adjective, word[0])];
    }else if(word[1] === ('NN' || 'NNP' || 'NNPS' || 'NNS')){
      //word is a noun
      values = dict.noun[binarySearch(dict.noun, word[0])];
    }else if(word[1] === ('RR' || 'RBR' || 'RBS')){
      //word is an noun
      values = dict.adverb[binarySearch(dict.adverb, word[0])];
    }else if(word[1] === ('VB' || 'VBD' || 'VBG' || 'VBN' || 'VBP' || 'VBZ')){
      //word is an adverb
      values = dict.verb[binarySearch(dict.verb, word[0])];
    }
    if(values){
      ngrams.push(word[0]);
      words.push(values);
      positive  +=parseFloat(values.PosScore);
      negative  +=parseFloat(values.NegScore);
      objective +=1-(parseFloat(values.PosScore) + parseFloat(values.NegScore));
    }
  }
  var final = {
    sentiment:    positive - negative,
    avgSentiment: (positive - negative) / ngrams.length,
    objective:    objective,
    positive:     positive,
    negative:     negative,
    ngrams:       ngrams.reverse(),
    words:        words.reverse()
  };
  return final;
}
