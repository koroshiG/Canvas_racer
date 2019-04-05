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

class Player {
    constructor(numer, kolor, klawisz) {
        this.numer = numer
        this.kolor = kolor
        this.klawsz = klawisz
        this.init()
    }

    init() {
        this.startPos = [stoProcentW * 0.5, stoProcentH * 0.78 + (playerNumber * stoProcentH * 0.03)]
        playerNumber++

        var canvas = document.createElement("canvas")
        canvas.height = stoProcentH
        canvas.width = stoProcentW
        canvas.style.position = "absolute"
        canvas.style.top = "0px"
        canvas.style.left = "0px"
        canvas.id = "p" + this.numer
        document.body.appendChild(canvas)
        ctx = document.getElementById("p" + this.numer)
        this.ctx = ctx.getContext("2d")

        this.race()
    }

    race() {
        this.angle = 0
        this.speed = .5
        this.xPos = this.startPos[0]
        this.yPos = this.startPos[1]
        this.x = 0
        this.y = 0

        document.addEventListener("keypress", (e) => {
            if (e.key == this.klawsz) {
                this.angle += (Math.PI / 18)
            }
        })

        this.frame = () => {

            this.x = Math.cos(this.angle) * this.speed
            this.y = Math.sin(-this.angle) * this.speed
            //console.log("y: " + this.y, "x: " + this.x)

            this.ctx.lineWidth = stoProcentH / 100
            this.ctx.strokeStyle = this.kolor
            this.xPos += this.x
            this.yPos += this.y
            this.ctx.lineTo(this.xPos, this.yPos)
            this.ctx.stroke()

            requestAnimationFrame(this.frame)
        }

        this.frame()
    }
}

document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        stoProcentH = window.innerHeight
        stoProcentW = window.innerWidth
        playerNumber = 0
        document.getElementById("addPlyr").onclick = addPlayer
        document.getElementById("start").onclick = mapStart
    }
}

function addPlayer() {
    if(playerNumber < 4){
    playerDiv = document.createElement("div")
    playerDiv.id = "p" + playerNumber
    kolor = document.createElement("input")
    kolor.id = "kolor"
    kolor.type = "color"
    playerDiv.appendChild(kolor)
    numer = document.createElement("input")
    numer.id = "numer"
    numer.type = "number"
    numer.max = 4
    numer.min = 1
    playerDiv.appendChild(numer)
    klawisz = document.createElement("input")
    klawisz.id = "key"
    klawisz.onkeyup = function(e){
        this.value = e.key
        console.log(e);
        
    }
    klawisz.type = "text"
    playerDiv.appendChild(klawisz)
    document.body.appendChild(playerDiv)
    playerNumber++
    }
}

function mapStart() {
    
    document.body.innerHTML = '';
    canvas = document.createElement("canvas")
    canvas.height = stoProcentH
    canvas.width = stoProcentW
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    img = new Image()
    img.src = "img/grass.jpg"
    img.addEventListener("load", () => {
        trackRender(ctx, img)
        for(var i = 0; i < playerNumber; i++){
            var player = new Player
        }
    })
}

window.onresize = () => {
    stoProcentH = window.innerHeight
    stoProcentW = window.innerWidth
    canvas = document.getElementById("canvas")
    canvas.innerHTML = '';
}