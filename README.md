# As they say

_As they say_ is a random saying generator that combines parts of existing sayings, producing sometimes insightful and hilarious outcomes. It works by breaking existing sayings into connections between their words' parts of speech and texts and then randomly combining them.

### Input

The sayings are from the following sources, all released under a [Creative Commons Attribution-ShareAlike License 3.0][1]:

- [Wikipedia's list of proverbial phrases][2]
- [Wikiquote's English proverbs][3]
- [Wikiquote's list of alphabetical English proverbs][4]
- [Wiktionary's English idioms][5]

_Because the word lists are mostly from contented generated by users, you may encounter material that you find offensive or otherwise objectionable. Please use common sense and proper judgment when using the project's data._

### Implementation

Using the natural language processing library, [compromise][6], each saying is parsed into a grammatical template, with its words' parts of speech and texts stored as a series of connections in a lookup table.

To generate a new saying, a random grammatical template is chosen. For each part of speech in the template, a random word is looked up using the previous word's part of speech and text.

Take, for example, the saying "**a dog is a man's best friend**." Compromise tags it as follows:

- **a** → Determiner
- **dog** → Singular, Noun
- **is** → Verb, Copula, PresentTense
- **a** → Determiner
- **man's** → Noun, Singular, Possessive
- **best** → Adjective
- **friend** → Noun, Singular

When this saying's grammatical template is chosen for a new saying, it begins by looking up all **determiners** that start a saying and randomly chosing one of them.

Let's say the determiner "**the**" is chosen. The next step is to look up all **singular nouns** that follow the word "the" used as a determiner.

Let's say the singular noun "**place**" is chosen. The next step is to look up all **present tense verbs** that follow the word "place" used as a singular noun (as opposed to a verb, for example).

This process repeats until each part of speech in the template has been filled.

Finally, the app checks to make sure the generated saying isn't an exact match with any actual saying.

### Development

The app is built with [React][7], using [Create React App][8] to set up the project. [Prettier][9] is used to format the code.

### License

The software in this project is released under an [MIT license][10].

The sayings in this project are released under a [Creative Commons Attribution-ShareAlike 4.0 International License][11].

[1]: https://creativecommons.org/licenses/by-sa/3.0/
[2]: https://en.wikipedia.org/wiki/List_of_proverbial_phrases
[3]: https://en.wikiquote.org/wiki/English_proverbs
[4]: https://en.wikiquote.org/wiki/English_proverbs_(alphabetically_by_proverb)
[5]: https://en.wiktionary.org/wiki/Category:English_idioms
[6]: https://compromise.cool
[7]: https://reactjs.org
[8]: https://create-react-app.dev
[9]: https://prettier.io
[10]: LICENSE
[11]: https://creativecommons.org/licenses/by-sa/4.0/
