/**
* @file dragresize_init.js
* @brief DragResize settings
* @author Ruslan Osmanov
* @version 2.0
*/
/* Declare  DragResize() object, passing its own name and an object
* whose keys constitute optional parameters/settings.
* Optional settings/properties of the DragResize object are:
* enabled: Toggle whether the object is active.
* handles[]: An array of drag handles to use (see the .js file).
* minWidth, minHeight: Minimum size to which elements are resized (in pixels).
* minLeft, maxLeft, minTop, maxTop: Bounding box (in pixels).
*/
var dragresize = new DragResize('dragresize-transparent',{ 
    minWidth: 250, 
    minHeight: 200, 
    minLeft: 20, 
    minTop: 100, 
    maxLeft: 2000, 
    maxTop: 100000,
    zIndex: 2000,
    handles: ['tl','tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br']
});

// Next, you must define two functions, isElement and isHandle. These are passed
// a given DOM element, and must "return true" if the element in question is a
// draggable element or draggable handle. Here, I'm checking for the CSS classname
// of the elements, but you have have any combination of conditions you like:

dragresize.isElement = function(elm) {
    if (elm.className && typeof elm.className == 'string' && elm.className.indexOf('drsElement') > -1) return true;
    return false;
};
dragresize.isHandle = function(elm) {
    if (elm.className && typeof elm.className == 'string' && elm.className.indexOf('drsMoveHandle') > -1) return true;
    return false;
};

// Define optional functions that are called as elements are dragged/resized.
// Some are passed true if the source event was a resize, or false if it's a drag.
// The focus/blur events are called as handles are added/removed from an object,
// and the others are called as users drag, move and release the object's handles.
// You might use these to examine the properties of the DragResize object to sync
// other page elements, etc.
dragresize.ondragfocus = function() { };
dragresize.ondragstart = function(isResize) {  };
dragresize.ondragmove = function(isResize) { };
dragresize.ondragend = function(isResize) {  
	if (isResize) { 
		// Correct folder tree window dimensions
	 	folderController.correctDimensions();
	}
};
dragresize.ondragblur = function() {};

// Finally, we must apply() the DragResize object to a DOM node; all children of this
// node will then be made draggable. Here, I'm applying to the entire document.
dragresize.apply(document);
