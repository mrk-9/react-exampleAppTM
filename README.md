exampleApp
================

Example App using express 4, MarionetteJs, BackboneJs, DustJs, and the Tastemade Api.

## Installation

Make sure that the following are installed on your system:

* node v0.10.30, or use nvm to install: [https://github.com/creationix/nvm](https://github.com/creationix/nvm)
* Gruntjs - http://gruntjs.com/getting-started
* Bower - http://bower.io/
* Webpack - http://webpack.github.io/docs/installation.html

Fork the repo, go into the project's directory, and from a command line prompt:

    $npm install

next run:

    $bower install

bower installs all client side code into the public/components folder.

## Starting the app

In terminal, from the root of the project, run:

    $grunt dev

Or:

    $grunt

this will run the dev task. This will start a few things needed for development:

* grunt-nodemon - this will monitor changes for server side files and restart the express app
* grunt-webpack - this will watch the client side files and rebundle the client-side app
* grunt-watch - this will watch the templates and css directory to re-compile the associated files

The app will be running at http://localhost:8000

## Running tests

Karma test runner is used to execute the tests, which are written using mocha, chai, and sinonjs. To execute the tests, from the root
of the project run:

    $grunt kamra:ci


