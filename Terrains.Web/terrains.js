var terrains;
(function() {
  terrains = {
    horizontalGutter: 64,
    verticalGutter: 32,

    initialize: function() {
      var processing = new Processing("drawingCanvas", terrains.initializeProcessing);
    },

    initializeProcessing: function(processing) {
      processing.draw = function() { terrains.drawFrame(this) };
    },

    drawFrame: function(processing) {
      this.autoResize(processing);
      this.drawHorizon(processing);
    },

    autoResize: function(processing) {
      var width = window.innerWidth - this.horizontalGutter;
      var height = window.innerHeight - this.verticalGutter;
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
