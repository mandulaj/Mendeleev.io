Mendeleev.io
============
http://mendeleev.io

The online chemistry engine.

##Setup

Install node.js and npm (http://www.nodejs.org)

We use Gulp for amazing convencience!

```bash
$ cd Mendeleev.io
$ npm install

$ sudo npm install -g gulp bower  # if not already installed
$ gulp  # compile the LESS files to CSS. Check JavaScript for errors.

$ cd app
$ bower install

$ gulp dev  # start a server on localhost
```

`gulp dev` will automatically restart the node.js server when it is
modified.

All JavaScript and LESS files are continually watched for errors,
and compiled.

##Why

We were inspired to create something different in Chemistry class while repeatedly solving boring calculations.
It should make it possible for everyone to solve chemical problems simply using a friendly interface.

@zpiman suggested the name mendeleev.io, and right after we found that it was actually not yet taken,
we immediately registered it.

##Status

Mendeleev.io is a very new project, but we are working to make it usable as fast as possible.

##Credits


* [Alexander Selzer](https://github.com/AlexanderSelzer)
* [Jakub Mandula](https://github.com/zpiman)
