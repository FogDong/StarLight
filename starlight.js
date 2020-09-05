const StarLight = function () {
  const colors = [
    ["#b03941", "#843f43", "#c56077", "#f27c73", "#e6c4c1"], //orange pink
    ["#74af9d", "#6dd2c5", "#b3c3c3", "#c1cec4", "#cdeeed"], //green blue
    ["#599af5", "#375aa6", "#2c3c6c", "#54478f", "#090b18"], //purple blue
    ["#0d4b74", "#6691ab", "#213a55", "#bed0cb", "#7f486b"], //pink blue
    ["#642329", "#671b23", "#984d4a", "#6d4f40", "#251a19"], //dark pink
    ["#402b21", "#966a57", "#934a3f", "#24201c", "#d1987e"], //dark orange
    ["#161114", "#333433", "#424348", "#9d9d97", "#ababaa"], //dark grey
    ["#27424d", "#344243", "#364143", "#203f49", "#021623"]  //dark blue
  ]
  const color = colors[Math.floor(Math.random()*8)]
  const setting = {
    width: screen.width,
    height: screen.height,
    requestID: null,
    canvas: null,
    content: null,
    maxStar: 100,
    newStar: 6,
    starArr: [],
    number: 100
  }
  function init (canvas, w, h) {
    setting.canvas = document.getElementById(canvas)
    setting.canvas.setAttribute("width", w)
    setting.canvas.setAttribute("height", h)
    setting.width = w
    setting.height = h
    setting.content = setting.canvas.getContext("2d")
  }
  function updateStar() {
    setting.content.clearRect(0, 0, setting.width, setting.height)
    setting.content.save()
    for (let i = 0; i < setting.starArr.length; i++) {
      let h = 0.35*setting.starArr[i].scale
      setting.starArr[i].x += Math.tan(setting.starArr[i].deg*Math.PI/180)*h/2
      setting.starArr[i].y = setting.starArr[i].y + h
      
      if (setting.starArr[i].x < 0 || setting.starArr[i].x > setting.width || setting.starArr[i].y > setting.height) {
        setting.starArr.splice(i--, 1)
        continue;
      }
      
      setting.content.beginPath()
      for (let j = 0; j < 5; j++) {
        setting.content.lineTo(Math.cos((18+j*72)/180*Math.PI)*10+setting.starArr[i].x,
          -Math.sin((18+j*72)/180*Math.PI)*10+setting.starArr[i].y)
        setting.content.lineTo(Math.cos((54+j*72)/180*Math.PI)*5+setting.starArr[i].x,
          -Math.sin((54+j*72)/180*Math.PI)*5+setting.starArr[i].y)
      }
      setting.content.closePath();
      setting.content.globalAlpha = setting.starArr[i].alpha
      setting.content.shadowOffsetX = 2
      setting.content.shadowOffsetY = 2
      setting.content.shadowBlur = 4
      setting.content.shadowColor = "rgba(0, 0, 0, 0.15)"
      setting.content.fillStyle = color[setting.starArr[i].c]
      setting.content.fill()
    }
    setting.content.restore()
    setting.requestID = window.requestAnimationFrame(updateStar)
  }
  function createNewStar() {
    setTimeout(function() {
      if (setting.starArr.length < setting.maxStar) {
        for (let i = 0; i < setting.newStar; i++) {
          let minus = Math.random() < 0.5?-1:1;
          setting.starArr.push({
            x: Math.random()*setting.width,
            y: 0,
            c: Math.floor(Math.random()*6),
            deg: Math.random()*6*minus,
            scale: 3+Math.random()*3,
            alpha: 0.5+Math.random()*0.1
          })
        }
      }
      createNewStar()
    }, Math.random()*200 + 500)
  }
  function star () {
    for (let i = 0; i < setting.number; i++) {
      let minus = Math.random() < 0.5?-1:1;
      setting.starArr.push({
        x: Math.random()*setting.width,
        y: Math.random()*setting.height,
        c: Math.floor(Math.random()*6),
        deg: Math.random()*6*minus,
        scale: 3+Math.random()*3,
        alpha: 0.5+Math.random()*0.1
      })
    }
    updateStar()
    createNewStar()
  }
  function set (number, maxStar, newStar) {
    setting.number = number
    setting.maxStar = maxStar
    setting.newStar = newStar
    window.cancelAnimationFrame(setting.requestID);
  }
  return {
    init: init,
    star: star,
    set: set
  }
}()