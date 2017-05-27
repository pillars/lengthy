# Lengthy [![Build Status](https://travis-ci.org/pillars/lengthy.svg?branch=master)](https://travis-ci.org/pillars/lengthy)

I was born in France but live in Montreal. Construction in America relies a lot on the imperial mesuring system ([which makes me extremely sad](http://www.funnyjunk.com/Baby+steps+america/funny-pictures/5224677#744572_5224233)). I wanted a way to easily convert units on my website for readers that are only comfortable with one format. You can see the package at work at [karelledru.com](https://karelledru.com).

## Features

- Support fractions like `1/2"` (half an inch)
- Support unit combinations like `6ft 4in`
- Support decimal value `1.94m`
- Small and focus (you might be able to do some of that with math.js but it is big!)

Limitations:

- Since `'` and `"` are respectively the shorthands for foot and inch, you cannot use these to separate thousands (like 1'000)
- Decimal number are expected to use a dot (10.5 will work) and not a colon (10,5 won't work)
- The output string doesn't support pluralization at the moment

## Usage

Install via yarn/npm:

```
yarn add lengthy
```

Or as a script tag:

```html
<script src="lengthy.min.js"></script>
```

And start using:

```js
Lengthy.from('6ft 4in 1/2').to('m')
```

## Api

### `from(string)`

Lengthy can parse single units:

- `10cm`
- `10 cm`
- `28 m`
- `6' 4"`

As well as combined units and fractions:

- `6' 4"`
- `5" 1/2`
- `5 1/2 "`

The supported units are:

- Meter: `m`, `meter`, `meters`
- Kilometer: `km`, `kilometer`, `kilometers`
- Centimeter: `cm`, `centimeter`, `centimeters`
- Millimeter: `mm`, `millimeter`, `millimeters`
- Foot: `'`, `ft`, `foot`, `feet`
- Inch: `"`, `in`, `inch`, `inches`
- Yard: `yd`, `yard`, `yards`
- Miles: `mi`, `mile`, `miles`

### `to(stringOrArray)`

Lengthy can convert a string to a single unit or multiple ones. You can use any of the units listed above. You can also add a precision (replace * with the unit you want):

- `*-round` will return the rounded value
- `*-floor` will return the rounded value downwards to the closest integer
- `*-ceil` will return the rounded value upwards to the closest integer
- `*-n` where `n` is an integer (like `*-2`) will allow n decimal digit

For inches, you might want to format it as fractions. You can do that with the precision:

- `*-/n` where `n` is an integer in [2, 4, 8, 16, 32, 64]. So `*-/8` will return fraction where the denominator is 8 or less.

Lengthy can parse any fraction you input but only returns an irreducible fraction up to a `/64` precision.

## MIT License

Do what you want with this. Feel free to contribute, fork, love, hate...

## Contribute

- Fork this repository
- Write a failing test case
- Update the documentation if needed 
- Make a PR with a description that gives as much context as possible

**IMPORTANT**: I will not merge a PR without proper testing or documentation.
