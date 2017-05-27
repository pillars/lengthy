# Lengthy

I was born in France but leave in Montreal. Construction in America relies a lot on the imperial mesuring system ([which makes me extremely sad](http://www.funnyjunk.com/Baby+steps+america/funny-pictures/5224677#744572_5224233)). I wanted a way to easily convert units on my website for readers that are only comfortable with one format. You can see the package at work at [karelledru.com](https://karelledru.com).

## Features

- Support fractions like `1/2"` (half an inch)
- Support unit combinations like `6ft 4in`
- Small and focus (you might be able to do some of that with math.js but it is big!)

Limitations:

- Since `'` and `"` are respectively the shorthands for foot and inch, you cannot use these to separate thousands (like 1'000)
- Decimal number are expected to use a dot (10.5) and not a colon (10,5)

## Usage

Install via yarn/npm:

```
yarn add lengthy
```

Or as a script tag:

```html
<script src="lengthy.min.js"></script>
```

## `parse()`

The library can parse single units:

- `10cm`
- `10 cm`
- `28 m`
- `6' 4"`

As well as combined units and fractions:

- `6' 4"`
- `5" 1/2`

The supported units are:

- Meters: `m`, `meter`, `meters`
- Kilometers: `km`, `kilometer`, `kilometers`
- Centimeters: `cm`, `centimeter`, `centimeters`
- Millimeters: `mm`, `millimeter`, `millimeters`
- Feet: `'`, `ft`, `foot`, `feet`
- Inch: `"`, `in`, `inch`, `inches`

## MIT License

Do what you want with this. Feel free to contribute, fork, love, hate...

## Contribute

