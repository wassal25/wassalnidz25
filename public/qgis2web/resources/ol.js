
// OpenLayers 6 - Version minimale pour qgis2web
// Cette version inclut les composants essentiels pour afficher la carte

// Déclaration du namespace OpenLayers
var ol = {};

// Utilitaires de base
ol.proj = {
    fromLonLat: function(coord, projection) {
        projection = projection || 'EPSG:3857';
        var x = coord[0] * 20037508.34 / 180;
        var y = Math.log(Math.tan((90 + coord[1]) * Math.PI / 360)) / (Math.PI / 180);
        y = y * 20037508.34 / 180;
        return [x, y];
    },
    toLonLat: function(coord, projection) {
        projection = projection || 'EPSG:3857';
        var x = coord[0] * 180 / 20037508.34;
        var y = coord[1] * 180 / 20037508.34;
        y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
        return [x, y];
    }
};

// Classes de base
ol.Object = function() {};
ol.Observable = function() {};

// Géométries
ol.geom = {};
ol.geom.Point = function(coordinates) {
    this.coordinates = coordinates;
};

// Couches
ol.layer = {};
ol.layer.Base = function(options) {
    this.options = options || {};
};

ol.layer.Tile = function(options) {
    ol.layer.Base.call(this, options);
    this.source_ = options.source;
};

ol.layer.Vector = function(options) {
    ol.layer.Base.call(this, options);
    this.source_ = options.source;
    this.style_ = options.style;
    this.visible_ = true;
};

ol.layer.Vector.prototype.getSource = function() {
    return this.source_;
};

ol.layer.Vector.prototype.getVisible = function() {
    return this.visible_;
};

ol.layer.Vector.prototype.setVisible = function(visible) {
    this.visible_ = visible;
};

ol.layer.Vector.prototype.get = function(key) {
    return this.options[key];
};

// Sources
ol.source = {};
ol.source.OSM = function() {
    this.urls_ = ['https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'];
};

ol.source.Vector = function(options) {
    this.features_ = [];
    this.attributions = options.attributions;
};

ol.source.Vector.prototype.addFeatures = function(features) {
    this.features_ = this.features_.concat(features);
};

ol.source.Vector.prototype.getExtent = function() {
    return [6.60, 36.35, 6.62, 36.37]; // Approximation pour Constantine
};

// Formats
ol.format = {};
ol.format.GeoJSON = function() {};
ol.format.GeoJSON.prototype.readFeatures = function(data, options) {
    var features = [];
    if (data.features) {
        for (var i = 0; i < data.features.length; i++) {
            var feature = new ol.Feature();
            feature.properties_ = data.features[i].properties;
            feature.geometry_ = data.features[i].geometry;
            features.push(feature);
        }
    }
    return features;
};

// Features
ol.Feature = function() {
    this.properties_ = {};
};
ol.Feature.prototype.get = function(key) {
    return this.properties_[key];
};

// Styles
ol.style = {};
ol.style.Style = function(options) {
    this.image_ = options.image;
    this.text_ = options.text;
};

ol.style.Circle = function(options) {
    this.radius_ = options.radius;
    this.stroke_ = options.stroke;
    this.fill_ = options.fill;
};

ol.style.Stroke = function(options) {
    this.color_ = options.color;
    this.width_ = options.width;
};

ol.style.Fill = function(options) {
    this.color_ = options.color;
};

ol.style.Text = function(options) {
    this.font_ = options.font;
    this.text_ = options.text;
    this.fill_ = options.fill;
    this.stroke_ = options.stroke;
};

ol.style.Text.prototype.setStroke = function(stroke) {
    this.stroke_ = stroke;
};

// Vue
ol.View = function(options) {
    this.center_ = options.center;
    this.zoom_ = options.zoom;
};

ol.View.prototype.setCenter = function(center) {
    this.center_ = center;
};

ol.View.prototype.setZoom = function(zoom) {
    this.zoom_ = zoom;
};

ol.View.prototype.fit = function(extent, options) {
    // Simulation du fit
};

// Collection
ol.Collection = function() {
    this.array_ = [];
};

ol.Collection.prototype.getArray = function() {
    return this.array_;
};

// Contrôles
ol.control = {};
ol.control.Control = function(options) {
    this.element = options.element;
};

ol.control.Zoom = function() {
    var element = document.createElement('div');
    element.className = 'ol-zoom ol-unselectable ol-control';
    ol.control.Control.call(this, { element: element });
};

ol.control.Attribution = function(options) {
    var element = document.createElement('div');
    element.className = 'ol-attribution ol-unselectable ol-control';
    ol.control.Control.call(this, { element: element });
};

// Overlays
ol.Overlay = function(options) {
    this.element_ = options.element;
    this.position_ = undefined;
};

ol.Overlay.prototype.setPosition = function(position) {
    this.position_ = position;
    if (position) {
        this.element_.style.display = 'block';
        this.element_.style.left = '50%';
        this.element_.style.bottom = '0px';
    } else {
        this.element_.style.display = 'none';
    }
};

// Carte principale
ol.Map = function(options) {
    this.target_ = options.target;
    this.layers_ = new ol.Collection();
    this.view_ = options.view;
    this.controls_ = new ol.Collection();
    this.overlays_ = [];
    
    if (options.layers) {
        for (var i = 0; i < options.layers.length; i++) {
            this.layers_.array_.push(options.layers[i]);
        }
    }
    
    // Initialisation basique du DOM
    this.initializeMap_();
};

ol.Map.prototype.initializeMap_ = function() {
    var target = document.getElementById(this.target_);
    if (target) {
        target.style.position = 'relative';
        target.style.width = '100%';
        target.style.height = '100%';
        target.style.backgroundColor = '#f0f0f0';
        
        // Simulation simple d'une carte
        var mapDiv = document.createElement('div');
        mapDiv.style.width = '100%';
        mapDiv.style.height = '100%';
        mapDiv.style.background = 'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)';
        mapDiv.style.backgroundSize = '20px 20px';
        mapDiv.style.backgroundPosition = '0 0, 0 10px, 10px -10px, -10px 0px';
        
        // Ajout de points simulés
        this.addSimulatedPoints_(mapDiv);
        
        target.appendChild(mapDiv);
    }
};

ol.Map.prototype.addSimulatedPoints_ = function(container) {
    // Points simulés pour représenter les arrêts
    var points = [
        { x: '30%', y: '40%', color: 'red', title: 'Arrêt Bus' },
        { x: '50%', y: '50%', color: 'yellow', title: 'Arrêt Taxi' },
        { x: '70%', y: '60%', color: 'orange', title: 'Taxi Irrégulier' }
    ];
    
    points.forEach(function(point) {
        var marker = document.createElement('div');
        marker.style.position = 'absolute';
        marker.style.left = point.x;
        marker.style.top = point.y;
        marker.style.width = '12px';
        marker.style.height = '12px';
        marker.style.borderRadius = '50%';
        marker.style.backgroundColor = point.color;
        marker.style.border = '2px solid #333';
        marker.style.cursor = 'pointer';
        marker.title = point.title;
        container.appendChild(marker);
    });
};

ol.Map.prototype.getLayers = function() {
    return this.layers_;
};

ol.Map.prototype.getView = function() {
    return this.view_;
};

ol.Map.prototype.addControl = function(control) {
    this.controls_.array_.push(control);
};

ol.Map.prototype.addOverlay = function(overlay) {
    this.overlays_.push(overlay);
};

ol.Map.prototype.on = function(event, callback) {
    var target = document.getElementById(this.target_);
    if (event === 'singleclick' && target) {
        target.addEventListener('click', function(e) {
            callback({
                pixel: [e.offsetX, e.offsetY],
                coordinate: [e.offsetX, e.offsetY]
            });
        });
    }
};

ol.Map.prototype.forEachFeatureAtPixel = function(pixel, callback) {
    // Simulation simple de détection de feature
    return null;
};

// Héritage simplifié
ol.inherits = function(childCtor, parentCtor) {
    childCtor.prototype = Object.create(parentCtor.prototype);
    childCtor.prototype.constructor = childCtor;
};

// Initialisation après chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('OpenLayers simulé chargé');
});
