function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = stroke
        ctx.stroke()
    }
}


ren = ()=> {
    let canvas = document.querySelector("#canvas")
    let ctx = canvas.getContext('2d');
    let pi4 = 1/Math.sqrt(2)
    let r = canvas.width/4
    let rSmall = canvas.width/32
    drawCircle(ctx, canvas.width/2, canvas.height/2, r, '', 'red', 2)
    drawCircle(ctx, canvas.width/2 + canvas.width/4, canvas.height/2, rSmall, '', 'red', 2)
    drawCircle(ctx, canvas.width/2, canvas.height/2  + canvas.width/4, rSmall , '', 'red', 2)
    drawCircle(ctx, canvas.width/2 - canvas.width/4, canvas.height/2, rSmall, '', 'red', 2)
    drawCircle(ctx, canvas.width/2, canvas.height/2 - canvas.width/4, rSmall, '', 'red', 2)
    drawCircle(ctx, canvas.width/2 + r*pi4, canvas.height/2 + r*pi4, rSmall, '', 'red', 2)
    drawCircle(ctx, canvas.width/2 - r*pi4, canvas.height/2 + r*pi4, rSmall , '', 'red', 2)
    drawCircle(ctx, canvas.width/2 - r*pi4, canvas.height/2 - r*pi4, rSmall , '', 'red', 2)
    drawCircle(ctx, canvas.width/2 + r*pi4, canvas.height/2 - r*pi4, rSmall , '', 'red', 2)
}
