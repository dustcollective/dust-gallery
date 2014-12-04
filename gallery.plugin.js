(function($){

	var Gallery = function(element, options) {
		var elem = $(element);
		var _this = this;

		var settings = $.extend({
			'previewContainerSelector' : '.js-galleryImage',
			'previewSelector' : '.js-galleryImage img',
			'thumbnailSelector' : '.js-galleryThumbnails a',
			'thumbnailActiveSelector' : '.js-galleryThumbnails li',
			'thumbnailActiveClass' : 'is-active',
			'preloadTrigger' : {
				'element' : 'document',
				'event' : 'ready'
			},
			'linkInteractionSeletors' : {
				'prev' : '.gallery__preview-control--prev',
				'next' : '.gallery__preview-control--next'
			},
			'keyboardInteractions' : {
				'prev' : 37,
				'next' : 39
			}
		}, options || {});

		var previewElem = elem.find(settings.previewContainerSelector);
		var previewImg = elem.find(settings.previewSelector);
		var thumbnailElems = elem.find(settings.thumbnailSelector);

		var currentImageIndex = 0;

		this.init = function() {
			var _this = this;

			_this.bindActions();

			settings.preloadTrigger = false;
			if (settings.preloadTrigger) {
				$(settings.preloadTrigger.element).one(settings.preloadTrigger.event, function() {
					_this.loadImages();
					$(this).unbind(settings.preloadTrigger.event);
				});
			}

			return _this;
		}

		this.bindActions = function() {
			var _this = this;

			// when a thumbnail is clicked...
			thumbnailElems.click(function(e) {

				// ...don't follow the link...
				e.preventDefault();

				// ...but instead, grab the href of the full size image...
				var href = $(this).attr('href');

				if (href != _this.getSelectedImage()) {

					// ...show it in the preview <img>...
					_this.updatePreview(href);

					// ...and add/remove active class to/from thumbnails.
					_this.selectThumbnail($(this));

					// ...then set it as the currently selected image.
					currentImageIndex = $(this).attr('data-galleryIndex');

				}

			});

			elem.find(settings.linkInteractionSeletors.next).click(function(e) {
				e.preventDefault();
				_this.nextImage();
			});

			elem.find(settings.linkInteractionSeletors.prev).click(function(e) {
				e.preventDefault();
				_this.prevImage();
			});

			var keyboardInteractions = true;
			if (keyboardInteractions) {

				elem.keyup( function(e) {

					if (e.keyCode == settings.keyboardInteractions.next) {
						_this.nextImage();
					} else if (e.keyCode == settings.keyboardInteractions.prev) {
						_this.prevImage();
					}

				} );

			}

			return _this;
		}

		/**
		updates the preview element with the selected image.
		**/
		this.updatePreview = function(href) {
			var _this = this;

			var done = false;

			// adding a short timeout before adding loading classes so that
			// if the image loads almost instantly there's no glitchiness.
			window.setTimeout(function() {
				if (!done) {
					previewElem.addClass('no-image').addClass('has-throbber--on');
				}
			}, 20)

			// window.setTimeout(function() { // added timeout for testing.

			    previewImg.one("load", function() {
			        previewElem.removeClass('no-image').removeClass('has-throbber--on');
					done = true;
			    }).attr("src", href);

				return _this;

			// }, 2000); // added timeout for testing.

		}

		/**
		adds active class to selected thumbnail, and removes it from the others.
		**/
		this.selectThumbnail = function(element) {

			elem.find(settings.thumbnailActiveSelector + '.' + settings.thumbnailActiveClass).removeClass(settings.thumbnailActiveClass);

			element.parents(settings.thumbnailActiveSelector).addClass(settings.thumbnailActiveClass);

		}

		/**
		returns the href of the currently selected image.
		**/
		this.getSelectedImage = function() {
			return previewImg.attr('src');
		}

		/**
		loads the full size images of all the thumbnails. Used for preloading
		to reduce waiting time.
		**/
		this.loadImages = function() {
			$('body').append('<div class="image-preloader"></div>');

			thumbnailElems.each(function() {
				var href = $(this).attr('href');
				$('.image-preloader').load( href );
			});

			$('.image-preloader').remove();

		}

		this.prevImage = function() {

			var lastIndex = (thumbnailElems.length - 1);
			var nextIndex = parseInt(currentImageIndex) - 1;

			if (nextIndex < 0) {
				nextIndex = lastIndex;
			}

			$('[data-galleryIndex=' + nextIndex + ']').click();
		}

		this.nextImage = function() {

			var lastIndex = (thumbnailElems.length - 1);
			var nextIndex = parseInt(currentImageIndex) + 1;

			if (nextIndex > lastIndex) {
				nextIndex = 0;
			}

			$('[data-galleryIndex=' + nextIndex + ']').click();
		}
	};

	$.fn.gallery = function(options) {
		return this.each(function() {
			var element = $(this);

			// Return early if this element already has a plugin instance
			if (element.data('gallery')) return;

			// pass options to plugin constructor
			var gallery = new Gallery(this, options);

			gallery.init();

			// Store plugin object in this element's data
			element.data('gallery', gallery);
		});
	};
})(jQuery);
