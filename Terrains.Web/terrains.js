var terrains;
(function() {
  terrains = {
    initialize: function() {
      var processing = new Processing("drawingCanvas", terrains.initializeProcessing);
    },

    initializeProcessing: function(processing) {
      processing.draw = function() { terrains.drawFrame(this) };
    },

    drawFrame: function(processing) {
      terrains.autoResize(processing);
      terrains.drawHorizon(processing);
    },

    autoResize: function(processing) {
      var width = window.innerWidth - 64;
      var height = window.innerHeight - 32;
      if (processing.width !== width || processing.height !== height)
        processing.size(width, height);
    },

    drawHorizon: function(processing) {
      var width = processing.width;
      var height = processing.height;
      var horizonY = height / 2;
      processing.line(0, horizonY, width, horizonY);
    }
  };

  window.onload = terrains.initialize;
})();
