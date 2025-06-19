+function ($) {
	var pluginName = 'placepicker';
	var defaults = {
		map: '',
		mapOptions: {
			zoom: 17
		},
		autoCompleteOptions: {}
	};

	function PlacePicker(input) {
		var parentContainer = $(input).parents('.s3-json-map-wrapper'),
			element         = $(input),
			coordsInput     = parentContainer.find('.map-coords'),
			coordsToggler   = parentContainer.find('.coords-toggle'),
			mapToggler      = parentContainer.find('.map-toggle'),
			mapContainer    = parentContainer.find('.s3-json-map'),
			mapElement      = mapContainer.get(0),
			hasMarker       = false,
			map_key         = (element.data('key')) ? '&key=' + element.data('key') : '',
			geocoder,
			coordsValue,
			markers = [],
			map,
			mapCoords,
			mapZoom;

		function init() {
			geocoder = new google.maps.Geocoder();

			coordsToggler.on('click', function(){
				if (element.is(':visible')) {
					$(this).addClass('active');
					element.addClass('hidden');
					coordsInput.removeClass('hidden');
				} else {
					$(this).removeClass('active');
					element.removeClass('hidden');
					coordsInput.addClass('hidden');
				}
			});

			/*mapToggler.on('click', function(){
				toggleMap($(this));
			});*/

			element.on('input keypress paste cut', function(){
				geocoder.geocode({
						address : element.val(),
						region: 'no'
					},
					function(results, status) {
						if (status.toLowerCase() == 'ok') {
							coordsValue = new google.maps.LatLng(
								results[0]['geometry']['location'].lat(),
								results[0]['geometry']['location'].lng()
							);
							coordsInput.val(coordsValue.lat() + ',' + coordsValue.lng());

							//updateMap();
						}
					}
				);
			});

			codeLatLng();
		}

		function codeLatLng() {
			var latlngStr = coordsInput.val().split(",", 2),
				lat       = parseFloat(latlngStr[0]),
				lng       = parseFloat(latlngStr[1]),
				latlng    = new google.maps.LatLng(lat, lng);

			geocoder.geocode({
				'latLng': latlng
			}, function(results, status) {
				if (status.toLowerCase() == 'ok') {
					element.val(results[0].formatted_address);

					//updateMap();
				} else {
					if (coordsInput.val() == '') {
						element.val('');
					}
				}
			});

			coordsInput.off();

			coordsInput.on('input keypress paste cut', function(){
				codeLatLng();
			})
		}

		function toggleMap(btn) {
			if (!mapElement) return;

			if (mapContainer.hasClass('opened')) {
				mapContainer.animate({
					height : 0
				}, 500, function() {
					btn.removeClass('active');
					mapContainer.removeClass('opened');
				});
				return;
			}

			btn.addClass('active');
			mapContainer.addClass('opened');

			mapContainer.animate({
				height : 300
			}, 500, function() {
				if (mapContainer.hasClass('initialized')) {
					return;
				}
				initMap();
				mapContainer.addClass('initialized');
			});
		}

		function initMap() {
			if (!mapElement) return;

			if (element.val() == "") {
				mapCoords = '65.07205860435434,97.02196606127107';
				mapZoom   = 2;
			} else {
				hasMarker = true;
				mapCoords = element.val();
				mapZoom   = 17;
			}

			map = new google.maps.Map(mapElement, {
				zoom: mapZoom,
				disableDefaultUI: true
			});

			geocoder.geocode({
					address : mapCoords,
					region: 'no'
				},
				function(results, status) {
					if (status.toLowerCase() == 'ok') {
						map.setCenter(results[0].geometry.location);
						if (hasMarker) {
							marker.setPosition(results[0].geometry.location);
						}
					}
				}
			);

			google.maps.event.addListener(map, 'click', function(e) {
				var pos = e.latLng;
				marker.setPosition(pos);
				map.panTo(pos);
				element.blur();
				coordsInput.val(pos.lat() + ',' + pos.lng());
				codeLatLng();
			});

			if (hasMarker) {
				marker = new google.maps.Marker({
					map: map
				});

				markers.push(marker);
			}
		}

		function updateMap() {
			if (!map) {
				map = new google.maps.Map(mapElement, {
					zoom: mapZoom,
					disableDefaultUI: true
				});
			}

			removeMarkers();

			geocoder.geocode({
					address : element.val(),
					region: 'no'
				},
				function(results, status) {
					if (status.toLowerCase() == 'ok') {
						map.setCenter(results[0].geometry.location);
						map.setZoom(15);
						marker.setPosition(results[0].geometry.location);
					}
				}
			);

			marker = new google.maps.Marker({
				map: map
			});

			markers.push(marker);
		}

		function removeMarkers(){
			for(i = 0; i < markers.length; i++){
				markers[i].setMap(null);
			}
		}

		if (typeof(window['google']) == "undefined") {

			$.getScript( "https://maps.googleapis.com/maps/api/js?v=3.exp"+map_key+"&language=ru&libraries=places" ).done(function( script, textStatus ) {
				init.call(this);
			});
		} else {
			init.call(this);
		}
	}

	var PluginClass = PlacePicker;

	// register plugin
	$.fn[pluginName] = function(options) {
		options = $.extend({}, defaults, options);
		return this.each(function() {
			if (!$(this).data(pluginName)) {
				$(this).data(pluginName, new PluginClass(this, options));
			}
			return $(this);
		});
	};
}( jQuery, window );