Draw SVG Game
=============

An exploration of JavaScript libraries, SVG & touch.

PLAY THE GAME
=============
[Play the game](http://chrisjensenuk.github.com/DrawSvg)

Glossary
========
Arrangement - The layout of a game level
Node - the 'node' where a Connector can start from or end at
Connector - Connects 2 nodes together. Can be specified in the Arrangment or be drawn by the user
Path - the shape of the Connector
Sprite - The ball that moves down the Connectors
Marker - Defines the start and end positions of a Sprite

Architecture
============
Each level is based on an 'Arrangement' which is loaded by the main engine 'view/BoardView.js'.  See 'level0.js' as an example of an Arrangement.
BoardView is not aware of the different types of nodes that exist, it just orchestrates the level and raises events that the Nodes/Connectors/Sprites etc can react to.
Take the FlipFlopEndNode for example.  This node switches the path a Sprite joins as it passes it.  The FlipFlopEndNode contains all the logic neccessary to do this.
This allows us to create new Nodes and extend the application easily without needing to update the heart of the application.

Testing
=======
Works on iPad and Google Chrome 19.  Probably works in other browsers but not tested.

Technologies and Libraries
==========================

Raphael
__________
The game uses SVG to draw the shapes and the paths.  I've used Raphael.js to help create the SVG paths.  
I've added my own function to Raphael.js called getPointPath this quickly converts a SVG path to an array of x,y coordinates. I needed to do this for performance reasons

Backbone.js
___________
I've not played with Backbone before but the MVC(ish) pattern is brilliant. 

Underscore.js
_____________
Required by Backbone.js but I've also used some of its functions directly

jQuery
_________
Its there as I'm sure I'll use it at some point but don't think I make use of it yet.

RequireJS
__________
Using something like the AMD pattern helps keep your classes/object loosely coupled and provides a sort of Dependency injection/service location.
Raphael.js, Underscore.js and Backbone.js require a little bit of work to 'ninja'fy them and get them to work with Require.js.

Instructions on minfying/optimising the javascript files (Windows)
==================================================================
As each Module is in its own file its best to compact these down into a few files for optimization.  RequireJS 

I'm using Windows so these instructions are for this platform.
see http://requirejs.org/docs/optimization.html for require.js optimisation info
- Install node.js if not already done so http://nodejs.org/#
- Reboot (for environemnt variables to take effect)
- From a cmd.  navigate to project directory \path-to-project\optimize\ folder  
- c:\path-to-project\optimize\> npm install requirejs
- c:\path-to-project\optimize\> node r.js -o app.build.js





