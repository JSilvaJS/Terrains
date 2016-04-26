var terrains;
(function() {
  terrains = {
    subdivisionChance: .25,
    subdivisionIterations: 50,
    subdivisionDelay: 6,
    windowMoveSpeed: 24,

    canvas: null,
    processing: null,
    vertices: null,
    windowYOffset: 0,
    currentSubdivisionCounter: 0,
    currentIteration: 0,

    initialize: function() {
      this.canvas = $("canvas");
      var width = this.canvas.parent().width();
      var height = this.canvas.parent().height();
      var domCanvas = this.canvas.get(0);
      this.processing = new Processing(domCanvas, function(processing) {
        processing.size(width, height);
        processing.draw = function() { terrains.drawFrame() };
      });

      this.randomizeSeed();
      this.generateMountains();

      $("#randomSeedButton").click(function(e) {
        e.preventDefault();
        terrains.randomizeSeed();
        terrains.windowYOffset = 0;
        terrains.generateMountains();
      });

      $("#regenerateButton").click(function(e) {
        e.preventDefault();
        terrains.generateMountains();
      });

      $(window).keydown(function(e) {
        switch (e.keyCode) {
          case 38: // Up arrow
            terrains.windowUp();
            break;
          case 40: // Down arrow
            terrains.windowDown();
            break;
        }
      });
    },

    randomizeSeed: function() {
      $("#seedTextbox").val(Math.floor(this.processing.random(65535)));
    },

    generateMountains: function() {
      var seed = $("#seedTextbox").val();
      this.processing.randomSeed(seed);

      this.currentIteration = 0;
      this.vertices = this.getBaseVertices();
    },

    getBaseVertices: function() {
      var width = this.processing.width;
      var westY = this.processing.random(this.processing.height);
      var eastY = this.processing.random(this.processing.height);

      return [
        [0, westY],
        [width, eastY]
      ];
    },

    subdivideVertices: function(vertices, iteration) {
      var newVertices = [];

      for (var i = 0; i < vertices.length; i++) {
        var v0 = vertices[i];
        newVertices.push(v0);
        var shouldSubdivide = i < vertices.length - 1 && this.probabilityRoll(this.subdivisionChance);
        if (shouldSubdivide) {
          var v1 = vertices[i + 1];
          var intermediatePoint = this.getIntermediatePoint(v0, v1, iteration);
          newVertices.push(intermediatePoint);
        }
      }

      return newVertices;
    },

    getIntermediatePoint: function(v0, v1, iteration) {
      var x0 = v0[0];
      var y0 = v0[1];
      var x1 = v1[0];
      var y1 = v1[1];

      var x = this.processing.random(x0, x1);
      var width = x1 - x0;
      var yScale = .5 * Math.pow(.75, iteration);
      var maxYDelta = yScale * width;
      var delta = this.deltaRoll(maxYDelta);
      var y = (y0 + y1) / 2 + delta;
      return [x, y];
    },

    probabilityRoll: function(chance) {
      return this.processing.random(1) < chance;
    },

    deltaRoll: function(maxMagnitude) {
      return this.processing.random(-maxMagnitude, maxMagnitude);
    },

    windowUp: function() {
      this.windowYOffset += this.windowMoveSpeed;
    },

    windowDown: function() {
      this.windowYOffset -= this.windowMoveSpeed;
    },

    drawFrame: function() {
      this.currentSubdivisionCounter++;

      if (this.currentIteration < this.subdivisionIterations &&
          this.currentSubdivisionCounter > this.subdivisionDelay)
      {
        this.vertices = this.subdivideVertices(this.vertices, this.currentIteration);
        this.currentIteration++;
        this.currentSubdivisionCounter = 0;
      }

      this.drawMountains();
    },

    drawMountains: function() {
      this.processing.background(0xffffff);

      for (var i = 0; i < this.vertices.length - 1; i++) {
        var x0 = this.vertices[i][0];
        var y0 = this.vertices[i][1] + this.windowYOffset;
        var x1 = this.vertices[i + 1][0];
        var y1 = this.vertices[i + 1][1] + this.windowYOffset;
        this.processing.line(x0, y0, x1, y1);
      }
    }
  };

  window.onload = function() { terrains.initialize(); };
})();
