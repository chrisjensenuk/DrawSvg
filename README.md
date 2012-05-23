Draw SVG Game
=============

This project/experiment stemmed from an idea I had for a iPad game.  
I couldn't work out whether it would work as a game so I ended up building it to find out.
I'm still not sure it works as a game as such but it was a good excuse to have a play with some javascript libraries and iPads.

PLAY THE GAME
=============

Rules
--------
You need to get the coloured balls from the top of the screen to the bottom in the right order. 
You create paths by joining the nodes together by drawing a path (mmm 'nodes' yeah sounds fun) 
You can only connect one path to a node. 
Touck/click a path to delete it.
Click the green square to start/reset the balls.

Testing
-------
Works on iPad and Google Chrome 19.  Probably works in other browsers but not tested.

Technologies and Libraries
==========================

Raphael.js
__________
The game uses SVG to draw the shapes and the paths.  I've used Raphael.js to help create the SVG paths.  
I've added my own function to Raphael.js called getPointPath this quickly converts an SVG path to an array of x,y coordinates. I needed to do this for perfoomance reasons

Backbone.js
___________
I've not played with Backbone before but the MVC(ish) pattern is really good.  This is how you should 

Underscore.js
_____________
Required by Backbone.js but I've also used some of its functions instead of jQuery

jQuery.js
_________
Its there as I'm sure I'll use it at some point but don't think I make use of it

require.js
__________
Using something like the AMD pattern helps keep your classes/object loosely coupled and provides a sort of Dependency injection/service location.  I haven't bothered optimising as this is only an experiment.
Raphael.js, Underscore.js and Backbone.js require a little bit of work to 'ninja'fy them and get them to work with Require.js.

Instructions on minfying/optimising the javascript files
________________________________________________________
I'm using Windows so these instructions are for this platform.
see http://requirejs.org/docs/optimization.html for require.js optimisation info
- Install node.js if not already done so http://nodejs.org/#
- Reboot (for environemnt variables to take effect)
- From a cmd.  navigate to project directory \scripts folder  
- c:\path-to-project\optimize\> npm install requirejs
- c:\path-to-project\optimize\> node r.js -o app.build.js





