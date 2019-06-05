var keymap = {}
var winner = null

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
        ctx.arc((stoProcentW * 0.4), (stoProcentH * 0.6), wymiar, Math.PI * 0.5, Math.PI * 1.5)
        ctx.arc((stoProcentW * 0.6), (stoProcentH * 0.6), wymiar, Math.PI * 1.5, Math.PI * 0.5)
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

    bandy(stoProcentH * 0.35, true)
    bandy((stoProcentH * 0.35) / 2.25)

    //meta
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.lineWidth = stoProcentH / 100
    ctx.moveTo((stoProcentW * 0.5), stoProcentH * 0.75)
    ctx.lineTo((stoProcentW * 0.5), stoProcentH * 0.95)
    ctx.stroke()
    
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.rect(0, 0, stoProcentW, stoProcentH* 0.2);
    ctx.fill()
    //this.ctx.font = (~~(stoProcentH / 20)).toString() + "px Helvetica"
}

class Player {
    constructor(numer, kolor, klawisz) {
        this.numer = numer
        this.kolor = kolor
        this.rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(kolor)
        this.klawsz = klawisz
        this.stepsTab = []
        this.okrazenie = 0
        this.gradient = null
        this.init()
    }

    init() {
        this.startPos = [stoProcentW * 0.5, stoProcentH * 0.78 + (this.numer * stoProcentH * 0.03)]
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
        this.speed = 3.25
        this.xPos = this.startPos[0]
        this.yPos = this.startPos[1]
        this.x = 0
        this.y = 0
        var newLap = false
        this.ctx.fillStyle = this.kolor
        this.ctx.font = (~~(stoProcentH / 20)).toString() + "px Helvetica"
        this.ctx.fillText("Gracz " + this.numer.toString() + ": " + this.okrazenie.toString() + " okrazenie", (stoProcentW * 0.05) + (this.numer * stoProcentW * 0.1), stoProcentH * 0.05)

        document.onkeydown = document.onkeyup = (e) => {
            keymap[e.key] = (e.type == 'keydown')
        }

        // document.addEventListener("keydown", (e) => {
        //     if (e.key == this.klawsz) {
        //         this.angle += (Math.PI / 45)
        //     }
        // })

        this.frame = () => {
            if (keymap[this.klawsz]) {
                this.angle += (Math.PI / 90)
            }
            this.x = Math.cos(this.angle) * this.speed
            this.y = Math.sin(-this.angle) * this.speed
            this.ctx.strokeStyle = this.kolor.toString() + "aa"
            this.ctx.lineWidth = (stoProcentH / 100) * 2
            this.xPos += this.x
            this.yPos += this.y
            if ((((Math.pow(this.xPos - (stoProcentW * 0.6), 2) + Math.pow(this.yPos - (stoProcentH * 0.6), 2) < Math.pow(stoProcentH * 0.34, 2) && this.xPos > stoProcentW * 0.6) || (Math.pow(this.xPos - (stoProcentW * 0.4), 2) + Math.pow(this.yPos - (stoProcentH * 0.6), 2) < Math.pow(stoProcentH * 0.34, 2) && this.xPos < stoProcentW * 0.4)) &&
                    ((Math.pow(this.xPos - (stoProcentW * 0.6), 2) + Math.pow(this.yPos - (stoProcentH * 0.6), 2) > Math.pow((stoProcentH / 2.25) * 0.36, 2)) && (Math.pow(this.xPos - (stoProcentW * 0.4), 2) + Math.pow(this.yPos - (stoProcentH * 0.6), 2) > Math.pow((stoProcentH / 2.25) * 0.36, 2)))) || (
                    (this.yPos > stoProcentH * 0.76 && this.yPos < stoProcentH * 0.94 && this.xPos >= stoProcentW * 0.4 && this.xPos <= stoProcentW * 0.6) ||
                    (this.yPos > stoProcentH * 0.26 && this.yPos < stoProcentH * 0.44 && this.xPos >= stoProcentW * 0.4 && this.xPos <= stoProcentW * 0.6)) && this.okrazenie < iloscOkrazen) {

                if ((this.xPos > stoProcentW * 0.49 && this.xPos < stoProcentW * 0.51) && (this.yPos > stoProcentH * 0.76 && this.yPos < stoProcentH * 0.94) && this.x > 0) {
                    if (newLap) {
                        this.okrazenie++
                        console.log(this, " " + this.okrazenie);
                        newLap = false
                        this.ctx.fillStyle = "white"
                        this.ctx.beginPath();
                        //this.ctx.font = (~~(stoProcentH / 20)).toString() + "px Helvetica"
                        this.ctx.font = "20px Arial"
                        this.ctx.fillText("Gracz " + this.numer + ": " + this.okrazenie + " okrążenie", (stoProcentW * 0.05) + (this.numer * stoProcentW / 10), stoProcentH * 0.05)
                        this.ctx.fill()
                        //this.ctx.fillText("Gracz " + this.numer + ": " + this.okrazenie + " okrążenie", 0, 0)
                    }
                } else {
                    newLap = true
                }
                if (this.stepsTab.length < 64) {
                    this.stepsTab.push([this.xPos, this.yPos])
                } else {
                    this.stepsTab.shift()
                    this.stepsTab.push([this.xPos, this.yPos])
                }
                this.ctx.clearRect(0, 0, stoProcentW, stoProcentH)

                for (let i = 0; i < this.stepsTab.length - 2; i++) {
                    this.ctx.strokeStyle = `rgba(
                        ${parseInt(this.rgb[1], 16)},
                        ${parseInt(this.rgb[2], 16)},
                        ${parseInt(this.rgb[3], 16)},
                        ${(1/this.stepsTab.length)*i}
                    )`
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.stepsTab[i][0], this.stepsTab[i][1])
                    this.ctx.lineTo(this.stepsTab[i + 2][0], this.stepsTab[i + 2][1])
                    this.ctx.stroke()
                }

                this.ctx.strokeStyle = this.kolor.toString()
                this.ctx.beginPath()
                this.ctx.lineWidth = (stoProcentH / 100)
                this.ctx.arc(this.xPos, this.yPos, (stoProcentH / 200), 0, Math.PI * 2)
                this.ctx.stroke()
                this.ctx.fillStyle = "black"
                this.ctx.font = (~~(stoProcentH / 50)).toString() + "px Helvetica"
                this.ctx.fillText(this.numer, this.xPos - stoProcentW / 390, this.yPos + stoProcentH / 190)
                this.ctx.fillStyle = "white"
                this.ctx.font = (~~(stoProcentH / 60)).toString() + "px Helvetica"
                this.ctx.fillText(this.numer, this.xPos - stoProcentW / 390, this.yPos + stoProcentH / 190)

                requestAnimationFrame(this.frame)
            } else if (winner == null && this.okrazenie >= iloscOkrazen) {
                winner = this
                window.alert("Gracz " + this.numer + " wygrywa!")
            } else if (this.okrazenie >= iloscOkrazen) {
                window.alert("Gracz " + this.numer + " ukoczył wyścig!")
            } else {
                window.alert("Gracz " + this.numer + " WYPADASZ!")
                console.log(this.stepsTab);
            }
        }
        console.log(keymap);

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
    if (playerNumber < 4) {
        playerDiv = document.createElement("div")
        playerDiv.id = "p" + playerNumber
        kolor = document.createElement("input")
        kolor.className = "kolor"
        kolor.type = "color"
        playerDiv.appendChild(kolor)
        numer = document.createElement("input")
        numer.className = "numer"
        numer.type = "text"
        numer.value = playerNumber + 1
        numer.disabled = true
        playerDiv.appendChild(numer)
        klawisz = document.createElement("input")
        klawisz.className = "key"
        klawisz.onkeyup = function (e) {
            this.value = e.key
        }
        klawisz.type = "text"
        playerDiv.appendChild(klawisz)
        document.body.appendChild(playerDiv)
        playerNumber++
    }
}

function mapStart() {
    iloscOkrazen = parseInt(document.getElementById("okr").value)
    playingTab = []
    var playersTab = []
    for (let i = 0; i < playerNumber; i++) {
        var dzieci = document.getElementById("p" + i).children
        playersTab.push({
            kolor: dzieci[0].value,
            numer: dzieci[1].value,
            klawisz: dzieci[2].value
        })
    }
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
        trackRender(ctx, img, playersTab)
        window.setTimeout((e) => {
            for (let i = 0; i < playersTab.length; i++) {
                playingTab.push(new Player(playersTab[i].numer, playersTab[i].kolor, playersTab[i].klawisz))
            }
        }, 3000)
    })
}

window.onresize = () => {
    stoProcentH = window.innerHeight
    stoProcentW = window.innerWidth
    canvas = document.getElementById("canvas")
    canvas.innerHTML = '';
    mapStart()
}