Mendeleev.io
============
http://mendeleev.io

The online chemistry engine.

##Setup

Install node.js and npm (http://www.nodejs.org)

```bash
$ cd Mendeleev.io
$ npm install

$ sudo npm install -g gulp bower  # if not already installed.
$ gulp  # compile the LESS files to CSS. Check JavaScript syntax.

$ cd app
$ bower install

$ gulp dev  # start a development server on localhost:8010 (default)
```

`gulp dev` will automatically restart the node.js server when server
files are modified

All JavaScript and LESS files are being watched by the script, and on change,
are checked for errors and compiled.

When running, Nginx will be used as a web server.

##Why

We were inspired to create something different in our Chemistry class while repeatedly solving boring calculations.
Mendeleev.io should make it possible to solve chemical calculations in a simple way using a great interface, and make
looking up detailed information about Elements an ease.

The name was a great fit, and we immediately set out to buy it and plan the concepts of the application

##Status

Mendeleev.io features a complete periodic table.
There is very much for us to implement and enhance.

The application will presumably go online, when the Periodic Table, the custom-sorted Table of Elements,
and parts of the Calculator have been finished.

##Credits


* [Alexander Selzer](https://github.com/AlexanderSelzer)
* [Jakub Mandula](https://github.com/zpiman)
