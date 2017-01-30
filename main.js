'use strict';

(function() {

  var storageKey = "codeprep_bookcover_builder";
  var samples = [{
    "background": [{
        "rect": "0, 0, 300, 290",
        "color": "#FFF"
      },
      {
        "rect": "0, 290, 300, 110",
        "color": "#48ACF0"
      }
    ],
    "text": [{
        "color": "#4e504f",
        "font": "37px HiraKakuPro-W6",
        "pos": "60, 140",
        "text": "はじめての"
      },
      {
        "color": "#48ACF0",
        "font": "bold 68px HiraKakuProN-W6",
        "pos": "45, 210",
        "text": "HTML"
      },
      {
        "color": "#FFF",
        "font": "20px HiraKakuProN-W3",
        "pos": "20, 330",
        "text": "実際にコーディングしながら"
      },
      {
        "color": "#FFF",
        "font": "20px HiraKakuProN-W3",
        "pos": "45, 360",
        "text": "HTMLの基礎を学べる!!"
      }
    ]
  }, {
    "background": [{
        "rect": "0, 0, 300, 300",
        "color": "#30DACC"
      },
      {
        "rect": "0, 290, 300, 110",
        "color": "#176D60"
      }
    ],
    "text": [{
        "color": "#FFF",
        "font": "56px HiraKakuProN-W6",
        "pos": "32, 160",
        "text": "CSSの色"
      },
      {
        "color": "#FFF",
        "font": "28px HiraKakuProN-W3",
        "pos": "125, 210",
        "text": "を理解する"
      },
      {
        "color": "#FFF",
        "font": "24px HiraKakuProN-W3",
        "pos": "30, 355",
        "text": "CSS色の理論を学ぼう!"
      }
    ]
  }, {
    "background": [{
        "rect": "0, 0, 300, 290",
        "color": "#49C6E5"
      },
      {
        "rect": "25, 220, 245, 1",
        "color": "#fff"
      },
      {
        "rect": "25, 100, 245, 1",
        "color": "#fff"
      },
      {
        "rect": "0, 290, 300, 110",
        "color": "#1164B4"
      }
    ],
    "text": [{
        "color": "#FFF",
        "font": "27px HiraKakuProN-W3",
        "pos": "25, 140",
        "text": "HTMLとCSSで作る"
      },
      {
        "color": "#FFF",
        "font": "56px HiraKakuProN-W6",
        "pos": "25, 200",
        "text": "Web名刺"
      },
      {
        "color": "#FFF",
        "font": "20px HiraKakuProN-W3",
        "pos": "10, 340",
        "text": "自分だけのオリジナルの名刺を"
      },
      {
        "color": "#FFF",
        "font": "20px HiraKakuProN-W3",
        "pos": "80, 365",
        "text": "作ってみよう！"
      }
    ]
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
    [25, 50, 75, 225, 250, 275].map(x => {
      subCtx.moveTo(x, 0);
      subCtx.lineTo(x, h);
    });

    [45, 75, 105, 185, 215, 245, 300, 315, 330, 360, 375, 390].map(y => {
      subCtx.moveTo(0, y);
      subCtx.lineTo(w, y);
    });

    subCtx.strokeStyle = 'rgba(55, 55, 55, 0.5)';
    subCtx.strokeWidth = 1;
    subCtx.stroke();

    // 中心線
    subCtx.beginPath();
    subCtx.moveTo(w / 2, 0);
    subCtx.lineTo(w / 2, h);
    subCtx.moveTo(0, 145);
    subCtx.lineTo(w, 145);
    subCtx.moveTo(0, 345);
    subCtx.lineTo(w, 345);
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
    ctx.clearRect(0, 0, 300, 400);
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
      generateBtn.click();
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
