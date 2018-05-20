# Quib

Quib allows you to build GraphQL queries using plain JavaScript objects.

[![NPM version](https://img.shields.io/npm/v/quib.svg)](https://www.npmjs.com/package/quib)
[![Build Status](https://travis-ci.org/klummy/quib.js.svg?branch=master)](https://travis-ci.org/klummy/quib.js)
[![Coverage Status](https://coveralls.io/repos/klummy/quib.js/badge.svg?branch=master)](https://coveralls.io/r/klummy/quib.js?branch=master)

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [License](#license)

## Description

Quib allows you to build GraphQL queries using plain JavaScript objects. It allows you to turn this:

```
{
  queryArtists(byName:"Red Hot Chili Peppers") {
    name
    id
    image
  }
}
```

into:

```javascript
const query = quib({
  queryArtists: {
    id: "",
    image: "",
    name: ""
  }
}, {
  args: {
    queryArtists: {
      byName: "Red Hot Chili Peppers"
    }
  }
})
```

[This post outlines the thinking behind Quib](Link to Medium article here with source)

## Installation

With NPM

`npm install --save quib`

With Yarn

`yarn add quib`

## Usage

Quib focuses only on building the queries, not making the actual request which makes it very easy to use with your existing GraphQL setup and most GraphQL clients like Apollo, Urql etc.

### Basic usage

Quib can be used simply to create queries like this:

```javascript
const query = quib({
  queryArtists: {
    id: "",
    image: "",
    name: ""
  }
}, {
  // Options
})
```

The `quib` function takes two parameters:

- `schema` - **[Required]** The schema object is a JavaScript object which is a representation of the GraphQL query fields. The values in the schema are mostly ignored except if it's an object where it then loops through the keys of the object, potentially infinitely, to build out the query
- `options` - *[Optional]* This is an optional object containing additional options for the `quib` construct. Options include:
  - `args` - For example, to add arguments to your query, use the `args` property like:

    ```javascript
      const query = quib({
        queryArtists: {
          id: "",
          image: "",
          name: ""
        },

        getAllArtists: {
          artist: {
            name: "",
            power: false
          }
        }
      }, {
        args: {
          queryArtists: {
            name: "My name"
          },

          getAllArtists: {
            limit: 10
          }
        }
      })
    ```

    > When adding `args`, an important note is that the schema and args key must match. For example, in the code above, notice how there are matching keys for `queryArtists` and `getAllArtists`

## Roadmap

- [ ] Support for SDL type definition

## License

[MIT](LICENSE).
