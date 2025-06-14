
// Layer Switcher Control for OpenLayers
(function (root, factory) {
  if(typeof exports === "object") {
    module.exports = factory();
  } else if(typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.LayerSwitcher = factory();
  }
}(this, function () {

  var LayerSwitcher = function(opt_options) {
    var options = opt_options || {};
    var tipLabel = options.tipLabel ? options.tipLabel : 'Légende';
    
    var button = document.createElement('button');
    button.setAttribute('title', tipLabel);
    
    var this_ = this;
    var handleClick = function(e) {
      e.preventDefault();
      this_.showPanel();
    };
    
    button.addEventListener('click', handleClick, false);
    
    var element = document.createElement('div');
    element.className = 'layer-switcher ol-unselectable ol-control';
    element.appendChild(button);
    
    var panel = document.createElement('div');
    panel.className = 'panel';
    element.appendChild(panel);
    this.panel = panel;
    
    ol.control.Control.call(this, {
      element: element,
      target: options.target
    });
  };
  
  ol.inherits(LayerSwitcher, ol.control.Control);
  
  LayerSwitcher.prototype.showPanel = function() {
    if (this.element.classList.contains('shown')) {
      this.hidePanel();
    } else {
      this.element.classList.add('shown');
      this.renderPanel();
    }
  };
  
  LayerSwitcher.prototype.hidePanel = function() {
    this.element.classList.remove('shown');
  };
  
  LayerSwitcher.prototype.renderPanel = function() {
    this.panel.innerHTML = '';
    var map = this.getMap();
    var layers = map.getLayers().getArray().slice().reverse();
    
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var layerDiv = document.createElement('div');
      layerDiv.className = 'layer';
      
      var label = document.createElement('label');
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = layer.getVisible();
      
      input.addEventListener('change', function(layer) {
        return function(e) {
          layer.setVisible(e.target.checked);
        };
      }(layer));
      
      label.appendChild(input);
      label.appendChild(document.createTextNode(layer.get('title') || 'Couche'));
      layerDiv.appendChild(label);
      this.panel.appendChild(layerDiv);
    }
  };
  
  return LayerSwitcher;
}));
