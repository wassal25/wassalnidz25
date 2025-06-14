
// Fonctions utilitaires pour qgis2web

function createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth) {
    if (labelText == '') {
        return;
    }
    
    var textStyle = new ol.style.Text({
        font: labelFont,
        text: labelText,
        textAlign: 'center',
        textBaseline: 'middle',
        fill: new ol.style.Fill({
            color: labelFill
        }),
        placement: placement
    });
    
    if (bufferWidth > 0) {
        textStyle.setStroke(new ol.style.Stroke({
            color: bufferColor,
            width: bufferWidth
        }));
    }
    
    return textStyle;
}

// Configuration globale des variables
var size = 0;
var placement = 'point';

// Fonction pour le zoom sur une couche
function zoomToLayer(layer) {
    var extent = layer.getSource().getExtent();
    map.getView().fit(extent, {duration: 1000});
}

// Gestionnaire de popup
function addPopupHandler(map, container, content, closer) {
    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(overlay);

    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    map.on('singleclick', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
            return feature;
        });
        
        if (feature) {
            var coordinates = evt.coordinate;
            content.innerHTML = '<h3>' + (feature.get('nom') || 'Point') + '</h3>' +
                              '<p>Type: ' + (feature.get('type') || 'Non défini') + '</p>';
            overlay.setPosition(coordinates);
        } else {
            overlay.setPosition(undefined);
        }
    });
}
