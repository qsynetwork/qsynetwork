map.on("load", function () {
  // Load an image from an external URL.
  map.loadImage(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png",
    function (error, image) {
      if (error) throw error;

      // Add the image to the map style.
      map.addImage("cat", image);

      // Add a data source containing one point feature.
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-77.4144, 25.0759],
              },
            },
          ],
        },
      });

      // Add a layer to use the image to represent the data.
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point", // reference the data source
        layout: {
          "icon-image": "cat", // reference the image
          "icon-size": 0.25,
        },
      });
    }
  );
});

fetch('/data.geojson').then(function(res){
  return res.json();
}).then(function(res){
  res.features.forEach(function(marker){
      // Create a DOM element for each marker.
  var el = document.createElement('div');
  el.className = 'marker';

  // Add markers to the map.
  new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .addTo(map);
  })
});