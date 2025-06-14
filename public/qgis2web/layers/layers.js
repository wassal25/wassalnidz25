
// Configuration des couches
var wms_layers = [];

var format_ARRETBUS_1 = new ol.format.GeoJSON();
var features_ARRETBUS_1 = format_ARRETBUS_1.readFeatures(json_ARRETBUS_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ARRETBUS_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ARRETBUS_1.addFeatures(features_ARRETBUS_1);

var lyr_ARRETBUS_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_ARRETBUS_1, 
                style: style_ARRETBUS_1,
                popuplayertitle: "ARRETBUS",
                interactive: true,
                title: '<img src="styles/legend/ARRETBUS_1.png" /> ARRETBUS'
            });

var format_ARRETTAXI_2 = new ol.format.GeoJSON();
var features_ARRETTAXI_2 = format_ARRETTAXI_2.readFeatures(json_ARRETTAXI_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ARRETTAXI_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ARRETTAXI_2.addFeatures(features_ARRETTAXI_2);

var lyr_ARRETTAXI_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_ARRETTAXI_2, 
                style: style_ARRETTAXI_2,
                popuplayertitle: "ARRETTAXI",
                interactive: true,
                title: '<img src="styles/legend/ARRETTAXI_2.png" /> ARRETTAXI'
            });

var format_AREETTAXIIRRIGULIER_3 = new ol.format.GeoJSON();
var features_AREETTAXIIRRIGULIER_3 = format_AREETTAXIIRRIGULIER_3.readFeatures(json_AREETTAXIIRRIGULIER_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AREETTAXIIRRIGULIER_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AREETTAXIIRRIGULIER_3.addFeatures(features_AREETTAXIIRRIGULIER_3);

var lyr_AREETTAXIIRRIGULIER_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AREETTAXIIRRIGULIER_3, 
                style: style_AREETTAXIIRRIGULIER_3,
                popuplayertitle: "AREETTAXIIRRIGULIER",
                interactive: true,
                title: '<img src="styles/legend/AREETTAXIIRRIGULIER_3.png" /> AREETTAXIIRRIGULIER'
            });

// Couche de base OSM
var lyr_OSMStandard_0 = new ol.layer.Tile({
                            source: new ol.source.OSM(),
                            title: "OSM Standard"
                        });

var layersList = [lyr_OSMStandard_0,lyr_ARRETBUS_1,lyr_ARRETTAXI_2,lyr_AREETTAXIIRRIGULIER_3];
