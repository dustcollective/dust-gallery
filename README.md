dust-gallery
============

A jQuery gallery plugin

## Usage
todo.

## Options

**previewContainerSelector**
String.
The selector for the container of the preview img. This is where loaded classes are added.
Default: 

**previewSelector**
String.
The selector for the preview img. This is where the selected img is displayed.
Default:
 
**thumbnailSelector**
String.
The selector for a thumbnail link. This is where the href of the full size img is.
Default:
 
**thumbnailActiveSelector**
String.
Ancestor of the thumbnail. This is what active class is applied to.
Default:

**thumbnailActiveClass**
String.
The class to add to a thumbnail when it is active (selected).
Default:
 
**preloadTrigger**
Object.
The event that triggers image preloading.
* **element** String. The element that the preload trigger event is attached to.
* **event** String. The event that will fire the reload trigger. <br />
Default: { 'element' : 'document', 'event' : 'ready' }

**linkInteractionSeletors**
Object.
The selectors for the previous and next controls.
* **prev** String. The selector for the previous button.
* **next** String. The selector for the next button. <br />
Default: { 'prev' : '.gallery__preview-control--prev', 'next' : '.gallery__preview-control--next' }

**keyboardInteractions**
Object.
The keycodes for the previous and next controls.
* **prev** String. The keycode for the previous image.
* **next** String. The keycode for the next image. <br />
Default: { 'prev' : 37, 'next' : 39 } (left and right arrow keys)