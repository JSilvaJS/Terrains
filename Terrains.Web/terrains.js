var terrains;
(function() {
  terrains = {
    canvas: null,
    processing: null,
    vertices: null,

    initialize: function() {
      this.canvas = $("canvas");
      var width = this.canvas.width();
      var height = this.canvas.height();
      var domCanvas = this.canvas.get(0);
      this.processing = new Processing(domCanvas, function(processing) {
        processing.size(width, height);
        processing.draw = function() { terrains.drawFrame() };
      });

      this.generateMountains();

      $("#regenerateButton").click(function(e) {
        e.preventDefault();
        terrains.generateMountains();
      });
    },

    generateMountains: function() {
      var width = this.processing.width;
      var horizonY = this.processing.height / 2;

      this.vertices = [
        [0, horizonY],
        [width, horizonY]
      ];
    },

    drawFrame: function() {
      this.drawMountains();
    },

    drawMountains: function() {
      this.processing.background(0xffffff);

      for (var i = 0; i < this.vertices.length - 1; i++) {
        var x0 = this.vertices[i][0];
        var y0 = this.vertices[i][1];
        var x1 = this.vertices[i + 1][0];
        var y1 = this.vertices[i + 1][1];
        this.processing.line(x0, y0, x1, y1);
      }
    }
  };

  window.onload = function() { terrains.initialize(); };
})();
