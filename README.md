# conveyance
## Node.js Express Server Framework


The goal here is to provide a ready-built, extensible server framework based on Express.  It has built-in support for logging, error handling, static resources, and custom registered routes.

## Server Start Up
See the "simple" example for instantiation of conveyance.   When you start up the server, if you have a resources/ directory in the working directory, and you have not specified the "noResourceCopy" override parameter in your custom server config, THEN any files in the conveyance module under resources will be (non-destructively) copied into your own resources directory for serving.  You can force resource copying (destructively) using the "forceResourceCopy" option in your server config.

## Customization
The local working directory when you start the server is considered as the user's "base" directory.  That directory is where you put your own resources, overrides, etc.

### Custom Configuration
Custom configurations are .json files located in a directory (path) under the working directory.  The currently supported configurations are:
    config/server/*.json - merged overrides/additions (loaded in alpha-sort order) to the built-in conveyace server config.
    config/static/*.json - merged overrides/additions (loaded in alpha-sort order) to the build-in static resource map

### Custom Resources
Just create a resources directory in your working directory.  The following sub-directories are supported (see the config/static/base.json file in conveyance source for the default configuration):
+ "/js" url path maps to "resources/js", normally used for browser application level JS files
+ "/lib" url path maps to "resources/lib", normally used for browser library level JS files
+ "/css" url path maps to "resources/css", used for style sheets
+ "/html" url path maps to "resources/html", used for static HTML files
+ "/img" url path maps to "resources/img", used for photos/images
+ "/media" url path maps to "resources/media", used for other media and documents

Note that these are fairly universal conventions and will currently always be loaded as static resource routes.  If you add additional directories, you will need to create a path mapping in your own JSON file(s) in "config/static/" rooted in the server startup working directory.

## Routers
Your application activities should be registered as "routers" using the latest Express.Router() object.  Once you have a router defined, register it with conveyance (conveyance.routers.register(path, router)) and it should work. Best practice is that REST endpoints should be added as routers with proper path specification.


## Version 0.x Caveats
The framework is version 0.x because the designs for things may change.  We will be reworking error handlers, router interface, configuration interface, and providing examples of middleware installation.  We will also be adding additional functionality.

Target version 1.0.x will bear the final API contract for version 1.0.   There is NO OFFICE API CONTRACT for v.0.x

See "examples" for current API examples.

