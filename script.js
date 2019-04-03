function trackRender(ctx, pat) {

    var pat = ctx.createPattern(img, "repeat")

    //podłoŻe
    ctx.fillStyle = pat
    ctx.fillRect(0, stoProcentH * 0.2, stoProcentW, stoProcentH * 0.8)

    //tor
    function bandy(wymiar, fill = false) {
        ctx.beginPath()
        ctx.strokeStyle = "white"
        ctx.lineWidth = stoProcentH / 100
        ctx.arc((stoProcentW * 0.4), (stoProcentH * 0.6), wymiar * 0.35, Math.PI * 0.5, Math.PI * 1.5)
        ctx.arc((stoProcentW * 0.6), (stoProcentH * 0.6), wymiar * 0.35, Math.PI * 1.5, Math.PI * 0.5)
        ctx.closePath()
        if (fill) {
            ctx.fillStyle = "gray"
            ctx.fill()
        } else {
            ctx.fillStyle = pat
            ctx.fill()
        }
        ctx.stroke()
    }

    bandy(stoProcentH, true)
    bandy(stoProcentH / 2.25)

    //meta
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.lineWidth = stoProcentH / 100
    ctx.moveTo((stoProcentW * 0.5), stoProcentH * 0.75)
    ctx.lineTo((stoProcentW * 0.5), stoProcentH * 0.95)
    ctx.stroke()

    //zasady i wynik
    ctx.font = "15px Helvetica"
    ctx.fillText("OkrąŻenie: ", stoProcentW * 0.05, stoProcentH * 0.05)

}

function race(ctx, startPos, key, color) {
    xSpeed = 0
    ySpeed = 0
    xPos = startPos[0]
    yPos = startPos[1]

    document.addEventListener("keydown", (e) => {
        if (e.key == key) {
            if(xSpeed > Math.PI/2){
            xSpeed = -Math.PI/2
            }
            xSpeed += (Math.PI/33)
        }
    })

    frame = () => {      

        x = Math.cos(xSpeed)
        y = -(1 - x)
        console.log("y: " + y, "x: " + x)
        
        ctx.strokeStyle = color
        xPos += x
        yPos += y
        ctx.lineTo(xPos, yPos)
        ctx.stroke()

        requestAnimationFrame(frame)
    }

    frame()
}

function start(){
    playerNumber = 0
    p1 = new Player(1, "green", "q")
    race(ctx, p1.startPos, p1.klawsz, p1.kolor)
}

class Player {
    constructor(numer, kolor, klawisz) {
        this.numer = numer
        this.kolor = kolor
        this.klawsz = klawisz
        this.init()
    }

    init() {
        this.startPos = [stoProcentW * 0.5, stoProcentH * 0.78 + (playerNumber * stoProcentH * 0.03)]
    }
}

document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        stoProcentH = window.innerHeight
        stoProcentW = window.innerWidth
        document.body.innerHTML = '';
        var canvas = document.createElement("canvas")
        canvas.height = stoProcentH
        canvas.width = stoProcentW
        canvas.id = "canvas"
        document.body.appendChild(canvas)
        ctx = document.getElementById("canvas")
        ctx = ctx.getContext("2d")
        img = new Image()
        img.src = "img/grass.jpg"
        img.addEventListener("load", () => {
            trackRender(ctx, img)
        })
    }
}

window.onresize = () => {
    stoProcentH = window.innerHeight
    stoProcentW = window.innerWidth
    document.body.innerHTML = '';
    var canvas = document.createElement("canvas")
    canvas.height = stoProcentH
    canvas.width = stoProcentW
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    ctx = document.getElementById("canvas")
    ctx = ctx.getContext("2d")
    trackRender(ctx)
    img = new Image()
    img.src = "img/grass.jpg"
    img.addEventListener("load", () => {
        trackRender(ctx, img)
    })
}