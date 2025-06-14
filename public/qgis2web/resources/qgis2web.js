
// Script principal qgis2web
var map = new ol.Map({
    target: 'map',
    layers: layersList,
    view: new ol.View({
        center: ol.proj.fromLonLat([6.6147, 36.365]),
        zoom: 13
    })
});

// Contrôles de la carte
map.addControl(new ol.control.Zoom());
map.addControl(new ol.control.Attribution({
    collapsible: false
}));

// Layer Switcher
var layerSwitcher = new LayerSwitcher({
    tipLabel: 'Légende'
});
map.addControl(layerSwitcher);

// Popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

if (container && content && closer) {
    addPopupHandler(map, container, content, closer);
}

// Zoom initial sur Constantine
map.getView().setCenter(ol.proj.fromLonLat([6.6147, 36.365]));
map.getView().setZoom(13);

console.log('Carte interactive chargée avec succès');
