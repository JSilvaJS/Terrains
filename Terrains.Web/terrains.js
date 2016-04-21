var terrains;
(function() {
  terrains = {
    horizontalGutter: 64,
    verticalGutter: 32,

    processing: null,
    resized: false,

    initialize: function() {
      this.processing = new Processing("drawingCanvas", function(processing) { terrains.initializeProcessing(processing); });
    },

    initializeProcessing: function(processing) {
      processing.draw = function() { terrains.drawFrame() };
    },

    drawFrame: function() {
      this.autoResize();
      if (this.resized)
        this.drawHorizon();
    },

    autoResize: function() {
      var width = window.innerWidth - this.horizontalGutter;
      var height = window.innerHeight - this.verticalGutter;
      this.resized = this.processing.width !== width || this.processing.height !== height;
      if (this.resized)
        this.processing.size(width, height);
    },

    drawHorizon: function() {
      var width = this.processing.width;
      var height = this.processing.height;
      var horizonY = height / 2;
      this.processing.line(0, horizonY, width, horizonY);
    }
  };

  window.onload = function() { terrains.initialize(); };
})();
