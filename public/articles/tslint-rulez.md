To write truly testable and easily understandable code among other things it is important to keep things short. And by that I don't mean to pack your functions in one line. Robert C. Martin (also known as Uncle Bob) once said:

> The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that. Functions should not be 100 lines long. Functions should hardly ever be 20 lines long.

That was something I wanted to enforce in TypeScript project I was working on and I thought it could be easily done using a linter. For TypeScript there's *[TSLint](https://www.npmjs.com/package/tslint)*, for ES6 - *ESLint*. Unfortunately there was no such rule validating lines number of a function. There's one rule called `max-line-length`, which makes sure you don't write too long lines (horizontal length), however there was none for vertical function length. For *ESLint* I saw one rule checking the complexity and one checking the number of statements, but it wasn't the same. Well, since you can write custom rules for *TSLint* I launched my editor and started to code my first custom *TSLint* rule.

There are 3 repositories containing *TSLint* rules:

- [the TSLint repository itself](https://github.com/palantir/tslint)
- [tslint-eslint-rules](https://github.com/buzinas/tslint-eslint-rules)
- [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib)

Since the last one included some extra `grunt` tasks for scaffolding a new rule and some pleasing test infrastructure I went there directly, cloned it and coded away. Once you clone `tslint-microsoft-contrib` repo and install NPM packages to create a new rule use `create-rule` Grunt task:
```
$ grunt create-rule --rule-name max-func-body-length
```

It is going to create a `src/maxFuncBodyLengthRule.ts` file where you implement your rule and a unit test file under `test/MaxFuncBodyLengthRuleTests.ts`. Basically you just need to override `visitX` methods of your rule's walker class, add failures to linting result and that's it. Here's my original [PR](https://github.com/Microsoft/tslint-microsoft-contrib/pull/103) and the merged contribution - [rule source](https://github.com/Microsoft/tslint-microsoft-contrib/blob/master/src/maxFuncBodyLengthRule.ts) and [unit tests](https://github.com/Microsoft/tslint-microsoft-contrib/blob/master/tests/MaxFuncBodyLengthRuleTests.ts).

As for this rule's options in `tslint.json` config file you can specify the general max length like this:
- to enforce 20 lines number limit on all functions including methods and arrow functions
  ```
  "max-func-body-length": [ true, 20 ]
  ```
- to enforce limits as follows: 20 for loose functions, 10 for arrow functions, 15 for methods.
  ```json
  "max-func-body-length": [ true, {
      "func-body-length": 20,
      "arrow-body-length": 10,
      "method-body-length": 15
      }
    ]
  ```

There's one more switch here that may become handy when running this rule through unit tests code. Since e.g. `mocha` test fixtures are provided as functions to *describe()* function they can get pretty lengthy and will exceed our limits for sure. To avoid validation of such fixtures one can pass a regex string to *ignore-parameters-to-function-regex*. Linter won't validate functions passed to function, which names match that regex. To fix validation of your `mocha` tests just use it like this:
```json
"max-func-body-length": [ true, 20, {
        "ignore-parameters-to-function-regex": "describe"
    }
]
```

Linter messages are going to look similarly to:
```
$ tslint -r tslint-rules aaa.ts
aaa.ts[6, 5]: Max constructor body length exceeded in class John - max: 5, actual: 7
aaa.ts[16, 1]: Max function body length exceeded in function magic() - max: 5, actual: 21
aaa.ts[22, 13]: Max arrow function body length exceeded - max: 5, actual: 7
```

Happy linting!