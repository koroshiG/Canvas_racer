function render() {
    document.body.innerHTML = '';
    var canvas = document.createElement("canvas")
    stoProcentH = window.innerHeight
    stoProcentW = window.innerWidth
    canvas.height = stoProcentH
    canvas.width = stoProcentW
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    ctx = document.getElementById("canvas")
    ctx = ctx.getContext("2d")


    //podłoŻe
    var img = document.createElement("img")
    img.src = "img/grass.jpg"
    var PatImg = img
    var pat = ctx.createPattern(PatImg, "repeat")
    ctx.fillStyle = pat
    ctx.fillRect(0, stoProcentH * 0.2, stoProcentW, stoProcentH * 0.8)

    //tor
    function bandy(wymiar, fill = false) {
        ctx.beginPath()
        ctx.strokeStyle = "white"
        ctx.lineWidth = stoProcentH/100
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
    ctx.lineWidth = stoProcentH/100
    ctx.moveTo((stoProcentW * 0.5), stoProcentH * 0.75)
    ctx.lineTo((stoProcentW * 0.5), stoProcentH * 0.95)
    ctx.stroke()

    //zasady i wynik
    ctx.font = "15px Helvetica"
    ctx.fillText("OkrąŻenie: ", stoProcentW*0.05, stoProcentH*0.05)
}

class Player{
    constructor(numer, kolor, klawisz){
        this.numer = numer
        this.kolor = kolor
        this.klawsz = klawisz
        this.init()
    }

    init(){

    }
}

document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        render()
    }
}

window.onresize = () => {
    stoProcentH = window.innerHeight
    stoProcentW = window.innerWidth
    render()
}