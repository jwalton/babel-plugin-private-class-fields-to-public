`_` is the new `_`!

## Description

There's this [TC39 proposal](https://github.com/tc39/proposal-class-fields) to
add private properties to javascript classes, which are "hard private" - you
can't access them from other scopes.

This is a babel plugin which adds getters and setters for all private properties,
so now you _can_ access them from other scopes.  Given a class like:

```js
class MyClass {
    #secret = "you can't see me!";
}
```

This plugin will transform the class to:

```js
class MyClass {
    #secret = "you can't see me!";
    get _secret() {return this.#secret;}
    set _secret(secret) {this.#secret = secret;}
}
```

## Uses

* Use this in your development builds to easily access private properties from
  tests and when debugging.
* Compile [third party dependencies](https://babeljs.io/blog/2018/06/26/on-consuming-and-publishing-es2015+-packages#selective-compilation-with-overrides)
  with babel to gain access to private properties.

## Pitfalls

At present, the proposal is still stage 3, so this plugin is really a "proof
of concept".  A package author could guard against this plugin by doing something
like redefining the `_secret` property in the constructor.  We could get around
this by tring to detect it and picking a different name, or by allowing a custom
prefix for the accessor functions in the plugin configuration.

## Motivation

There's a lot of decisions being made in the TC 39 class fields proposal based
on the notion that private fields should be "hard private".  There are pros and
cons to "hard private" fields, but unfortunately I don't think Javascript is
capable of supporting such a notion.  This plugin is meant as a proof-of-concept
to demonstrate an easy way to turn "hard private" into "soft private".
