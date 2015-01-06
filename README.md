SentiWord
=========

SentiWordNet based sentiment analysis for node.js focusing on accuracy and POS analysis.

SentiWord is a sentiment analysis module for node.js that uses SentiWordNet to determine a words sentiment. Since SentiWordNet 
has words classified by POS, this module first runs the input text through the node.js module [pos](https://www.npmjs.com/package/pos)
to more accurately determine the sentiment of words within sentences based on their actual pos. To improve accuracy, only words
that can be identified within their proper POS tag are used, therefore if a word is used and tagged as a verb, if it has no
sentiment value when used as a verb within SentiWordNet, it won't be evaluated.

Changes to SentiWordNet
-------------------

In standard form, SentiWordNet has synonyms grouped together with one sentiment value for a group of words. That makes lookup
of individual words slightly more difficult especially when taking into account POS. To fix this for this module, SentiWordNet was changed to different lists of words based on their pos (verb, noun, adverb, etc.). These lists were then
ordered alphabetically with one object per word (instead of one object and sentiment value for many words as is standard for
SentiWordNet). These changes don't alter the sentiment values for each word within SentiWordNet whatsoever.

Installation
------------

npm install sentiword

Usage
-----
```javascript

var sw = require('sentiword');

var ex = sw("It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.");

/** Result:
ex = { sentiment: 0.25,
  avgSentiment: 0.013157894736842105,
  objective: 17.75,
  positive: 0.75,
  negative: 0.5,
  ngrams:
   [ 'truth',
     'single',
     'man',
     'possession',
     'good',
     'fortune',
     'be',
     'wife',
     'little',
     'such',
     'man',
     'be',
     'first',
     'neighbourhood',
     'truth',
     'rightful',
     'property',
     'one',
     'other' ],
  words:
   [ { '# POS': 'n',
       ID: '11350705',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'truth' },
     { '# POS': 'a',
       ID: '493460',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'single' },
     { '# POS': 'n',
       ID: '10288516',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'man' },
     { '# POS': 'n',
       ID: '14407795',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'possession' },
     { '# POS': 'a',
       ID: '1068306',
       PosScore: '0.375',
       NegScore: '0.125',
       SynsetTerms: 'good' },
     { '# POS': 'n',
       ID: '13370938',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'fortune' },
     { '# POS': 'v',
       ID: '2744820',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'be' },
     { '# POS': 'n',
       ID: '10780632',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'wife' },
     { '# POS': 'a',
       ID: '1455732',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'little' },
     { '# POS': 'a',
       ID: '1554230',
       PosScore: '0',
       NegScore: '0.125',
       SynsetTerms: 'such' },
     { '# POS': 'n',
       ID: '10288516',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'man' },
     { '# POS': 'v',
       ID: '2744820',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'be' },
     { '# POS': 'n',
       ID: '13597444',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'first' },
     { '# POS': 'n',
       ID: '8225090',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'neighbourhood' },
     { '# POS': 'n',
       ID: '11350705',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'truth' },
     { '# POS': 'a',
       ID: '1370475',
       PosScore: '0.375',
       NegScore: '0',
       SynsetTerms: 'rightful' },
     { '# POS': 'n',
       ID: '4916342',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'property' },
     { '# POS': 'n',
       ID: '5870055',
       PosScore: '0',
       NegScore: '0',
       SynsetTerms: 'one' },
     { '# POS': 'a',
       ID: '1730820',
       PosScore: '0',
       NegScore: '0.25',
       SynsetTerms: 'other' } ] }
}
**/
```



