'use strict';

(function() {

  var storageKey = "codeprep_bookcover_builder";
  var samples = [{
    background: [{
      rect: "0, 0, 300, 300",
      color: "#30DACC"
    }, {
      rect: "0, 300, 300, 100",
      color: "#176D60"
    }],
    text: [{
      color: "#FFF",
      font: "56px sans-serif",
      pos: "40, 160",
      text: "CSSの色"
    }, {
      color: "#FFF",
      font: "32px sans-serif",
      pos: "70, 210",
      text: "を理解する"
    }, {
      color: "#FFF",
      font: "24px sans-serif",
      pos: "30, 360",
      text: "CSS色の理論を学ぼう!"
    }]
  }, {
    background: [{
      rect: "0, 0, 300, 300",
      color: "#58BEC2"
    }, {
      rect: "0, 300, 300, 100",
      color: "#2C5F62"
    }],
    text: [{
      color: "#FFF",
      font: "32px sans-serif",
      pos: "30, 160",
      text: "オブジェクト指向"
    }, {
      color: "#FFF",
      font: "28px sans-serif",
      pos: "40, 210",
      text: "の基礎を理解する"
    }, {
      color: "#FFF",
      font: "20px sans-serif",
      pos: "30, 360",
      text: "オブジェクト指向を学ぼう!"
    }]
  }, {
    background: [{
      rect: "0, 0, 300, 300",
      color: "#DAA13C"
    }, {
      rect: "0, 300, 300, 100",
      color: "#6D5018"
    }],
    text: [{
      color: "#FFF",
      font: "40px sans-serif",
      pos: "40, 160",
      text: "Animate.css"
    }, {
      color: "#FFF",
      font: "16px sans-serif",
      pos: "70, 210",
      text: "を使ってみる"
    }, {
      color: "#FFF",
      font: "24px sans-serif",
      pos: "30, 360",
      text: "Animate.cssを学ぼう!"
    }]
  }];

  var canvas, ctx, subCanvas, subCtx;

  function parsePos(str) {
    var array = str.split(",");
    return {
      x: parseInt(array[0].trim(), 10),
      y: parseInt(array[1].trim(), 10)
    };
  }
  function parseRect(str) {
    var array = str.split(",");
    return {
      x: parseInt(array[0].trim(), 10),
      y: parseInt(array[1].trim(), 10),
      w: parseInt(array[2].trim(), 10),
      h: parseInt(array[3].trim(), 10)
    };
  }

  function toggleDummyCanvas() {
    var subCanvas = document.getElementById('sub-canvas');
    if(subCanvas.classList.contains("hide")) {
      drawAditionalline();
      subCanvas.classList.remove("hide");
    } else {
      clearAditionalline();
      subCanvas.classList.add("hide");
    }
  }

  function clearAditionalline() {
    var h = subCanvas.height;
    var w = subCanvas.width;
    subCtx.clearRect(0, 0 , w, h);
  }

  function drawAditionalline() {
    var h = subCanvas.height;
    var w = subCanvas.width;

    subCtx.beginPath();
    for(var i = 50; i < w; i = i + 50) {
      subCtx.moveTo(i, 0);
      subCtx.lineTo(i, h);
    }

    for(var i = 50; i < h; i = i + 50) {
      subCtx.moveTo(0, i);
      subCtx.lineTo(w, i);
    }

    subCtx.strokeStyle = 'rgba(55, 55, 55, 0.5)';
    subCtx.strokeWidth = 1;
    subCtx.stroke();

    subCtx.beginPath();
    subCtx.moveTo(w / 2, 0);
    subCtx.lineTo(w / 2, h);
    subCtx.moveTo(0, h / 2);
    subCtx.lineTo(w, h / 2);
    subCtx.strokeStyle = 'rgba(221, 81, 76, 0.8)';
    subCtx.stroke();

  }

  function drawBackground(data) {
    var r = parseRect(data.rect);
    ctx.fillStyle = data.color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
  }

  function drawText(data) {
    var pos = parsePos(data.pos);
    ctx.fillStyle = data.color;
    ctx.font = data.font;
    ctx.fillText(data.text, pos.x, pos.y);
  }

  function draw(data) {
    var background = data.background || [];
    background.forEach(v => drawBackground(v));
    var text = data.text || [];
    text.forEach(v => drawText(v));
  }

  function downloadImage() {
    this.href = canvas.toDataURL();
  }

  function getJson() {
    var text = document.getElementById('text').value;
    return JSON.parse(text);
  }
  function generate() {
    try {
      var json = getJson();
      draw(json);
    } catch (e) {
      alert("Can not parse JSON");
    }
  }

  function sample() {
    var index = parseInt(this.dataset.index);
    var text = document.getElementById('text');
    text.value = JSON.stringify(samples[index], null, 2);
    generate();
  }

  window.addEventListener("load", function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    subCanvas = document.getElementById('sub-canvas');
    subCtx = subCanvas.getContext('2d');

    document.getElementById("download").addEventListener("click", downloadImage);
    var generateBtn = document.getElementById("generate");
    generateBtn.addEventListener("click", generate);
    [0, 1, 2].forEach(function(i) {
      var el = document.getElementById("sample" + (i + 1));
      el.addEventListener("click", sample);
    });

    var text = document.getElementById('text');
    text.addEventListener("input", function(e) {
      localStorage.setItem(storageKey ,e.target.value);
    });

    var storedBookJson = localStorage.getItem(storageKey)
    if(storedBookJson) {
      text.value = storedBookJson;
      generateBtn.click();
    } else {
      document.getElementById("sample1").click();
    }

    document.getElementById("additional-line").addEventListener("change", toggleDummyCanvas);

  });
})();
