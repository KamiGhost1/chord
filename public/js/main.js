let Nodes
let ringSize = 8
let ringBit = 3
let generate_size = 2

class Node{

    constructor(id) {
        this.id = id
        this.status = false
        this.fingers = []
        this.succ = null
        this.pred = null
        this.pub = Math.pow(id,2)
    }

    connect(id){
        let freeNodes = []
        for(let i = 0; i < ringSize; i++){
            if(!Nodes[i].status){
                freeNodes.push(i)
            }
        }
        if(freeNodes.length === 0){
            alert("all nodes work")
        }else{
            let index = Math.floor(Math.random() * freeNodes.length)
            Nodes[freeNodes[index]].status = true

        }
    }

    disconnect(){
        this.status = false
        this.fingers = []
        this.succ = null
        this.pred = null
    }

    stabilize(){}

    find_successor(){
        if(this.status){
            for(let i = 1; i < ringSize; i++){
                let succ = (this.id + i)%ringSize
                if(Nodes[succ].status){
                    this.succ = succ
                    break
                }
            }
        }

    }
    find_pred(){
        if(this.status){
            for(let i = 1; i < ringSize; i++){
                let pred = this.mod((this.id - i),ringSize)
                // console.log(pred)
                if(Nodes[pred].status){
                    this.pred = pred
                    break
                }
            }
        }
    }

    closest_preceding_node(){}

    fix_fingers(){
        if(this.status){
            this.fingers = []
            for(let i = 0; i < ringBit; i++){
                for(let j =0; j < ringSize; j++){
                    let finger = (this.id + Math.pow(2,i) + j )%ringSize;
                    // console.log({i,j,id:this.id, bit:Math.pow(2,i)})
                    if(Nodes[finger].status){
                        this.fingers.push(finger)
                        break
                    }
                }
            }
        }
    }

    analyze_path(path){
        for(let i in path){
            if(path[i].from === this.id){
                console.log("death loop")
                return false
            }
        }
        return true;
    }

    ping(From, To, path){
        let check = this.analyze_path(path)
        path.push({from:From, to: To})
        if(To === this.id){
            console.log("nice")
            return path
        }
        if(!check){
            return path
        }
        if(From === To && From === this.id){
            console.log("nice")
            return path
        }
        let diff = {}
        for(let i in this.fingers){
            let buf = To - this.fingers[i]
            // buf = buf > 0 ? buf : this.fingers[i] - To
            buf = Math.abs(buf)
            diff[i] = this.mod(buf, ringSize)
        }
        let min = ringSize
        let ind
        for(let i in this.fingers){
            if(min > diff[i]){
                min = diff[i]
                ind = this.fingers[i]
            }
        }
        console.log(this.id +" next " + ind)
        return Nodes[ind].ping(this.id, To, path)
    }

    mod(n, p)
    {
        if ( n < 0 )
            n = p - (n*-1) % p;

        return n % p;
    }
}

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
    drawCircle(ctx, canvas.width/2 + canvas.width/4, canvas.height/2, rSmall, 'white', 'red', 2)
    drawCircle(ctx, canvas.width/2, canvas.height/2  + canvas.width/4, rSmall , 'white', 'red', 2)
    drawCircle(ctx, canvas.width/2 - canvas.width/4, canvas.height/2, rSmall, 'white', 'red', 2)
    drawCircle(ctx, canvas.width/2, canvas.height/2 - canvas.width/4, rSmall, 'white', 'red', 2)
    drawCircle(ctx, canvas.width/2 + r*pi4, canvas.height/2 + r*pi4, rSmall, 'white', 'red', 2)
    drawCircle(ctx, canvas.width/2 - r*pi4, canvas.height/2 + r*pi4, rSmall , 'white', 'red', 2)
    drawCircle(ctx, canvas.width/2 - r*pi4, canvas.height/2 - r*pi4, rSmall , 'white', 'red', 2)
    drawCircle(ctx, canvas.width/2 + r*pi4, canvas.height/2 - r*pi4, rSmall , 'white', 'red', 2)

    updater();
}

updateRender = ()=>{
    let canvas = document.querySelector("#canvas")
    let ctx = canvas.getContext('2d');
    let pi4 = 1/Math.sqrt(2)
    let r = canvas.width/4
    let rSmall = canvas.width/32

    drawCircle(ctx, canvas.width/2 + canvas.width/4, canvas.height/2, rSmall, Nodes[2].status ? "green":"white", 'red', 2) //2
    drawCircle(ctx, canvas.width/2, canvas.height/2  + canvas.width/4, rSmall , Nodes[4].status ? "green":"white", 'red', 2) //4
    drawCircle(ctx, canvas.width/2 - canvas.width/4, canvas.height/2, rSmall, Nodes[6].status ? "green":"white", 'red', 2) //6
    drawCircle(ctx, canvas.width/2, canvas.height/2 - canvas.width/4, rSmall, Nodes[0].status ? "green":"white", 'red', 2) //0
    drawCircle(ctx, canvas.width/2 + r*pi4, canvas.height/2 + r*pi4, rSmall, Nodes[3].status ? "green":"white", 'red', 2) //3
    drawCircle(ctx, canvas.width/2 - r*pi4, canvas.height/2 + r*pi4, rSmall , Nodes[5].status ? "green":"white", 'red', 2)//5
    drawCircle(ctx, canvas.width/2 - r*pi4, canvas.height/2 - r*pi4, rSmall , Nodes[7].status ? "green":"white", 'red', 2)//7
    drawCircle(ctx, canvas.width/2 + r*pi4, canvas.height/2 - r*pi4, rSmall , Nodes[1].status ? "green":"white", 'red', 2)//1

}

updateNodes = ()=>{
    for(let i = 0; i < Nodes.length; i++){
        Nodes[i].fix_fingers()
        Nodes[i].find_pred()
        Nodes[i].find_successor()
    }
}

sendMessage = (From, To)=>{
    return Nodes[From].ping(From, To, [])
}

updateHtml = ()=>{
    let connected=[]
    for(let i = 0; i<Nodes.length; i++){
        if(Nodes[i].status){
            connected.push(i)
        }
    }
    let html="";
    //disconnect list
    if(connected.length > 2){
        for(let i in connected){
            html+=`<option discon="${connected[i]}">Node ${connected[i]}</option>`
        }
        document.querySelector("#SelectDisconnect").innerHTML = html
        html="";
    }else {
        document.querySelector("#SelectDisconnect").innerHTML = ""
    }
    //connnectTO
    if(connected.length > 0){
        for(let i in connected){
            html+=`<option con="${connected[i]}">Node ${connected[i]}</option>`
        }
        document.querySelector("#SelectTO").innerHTML = html
        html="";
    }
    // update list of nodes
    let list = document.querySelector("#listNodes")
    for(let i in Nodes){
        html+=`<p>Node ${i}: ${Nodes[i].status ? "ON" : "OFF"}</p>`
    }
    list.innerHTML = html;
    html = "";
    //send module
    let html2 = ""
    for(let i in connected){
        html+=`<option sendFrom="${connected[i]}">Node ${connected[i]}</option>`
    }
    for(let i in Nodes){
        html2 +=`<option sendTo="${Nodes[i].id}">Node ${Nodes[i].id}</option>`
    }
    document.querySelector("#SendFrom").innerHTML = html;
    document.querySelector("#SendTO").innerHTML = html2;

}

updater = ()=>{
    let a = setInterval(updateRender,500)
    // let b = setInterval(updateNodes,500)
    // let c = setInterval(updateHtml,5000)
    updateHtml()
    updateNodes()
}

bindButtons = ()=>{
    document.querySelector("#con_btn").addEventListener('click',()=>{
        let index = document.querySelector("#SelectTO").selectedIndex
        index = document.querySelector("#SelectTO")[index].attributes[0].value
        Nodes[index].connect(index)
        updateNodes()
        updateHtml()
    })
    document.querySelector("#discon_btn").addEventListener('click', ()=>{
        console.log("click on disconnect")
        let index = document.querySelector("#SelectDisconnect").selectedIndex
        index = document.querySelector("#SelectDisconnect")[index].attributes[0].value
        Nodes[index].disconnect()
        updateNodes()
        updateHtml()
    })
    document.querySelector("#sendBtn").addEventListener('click', ()=>{
        let indexFrom = document.querySelector("#SendFrom").selectedIndex
        indexFrom = document.querySelector("#SendFrom")[indexFrom].attributes[0].value
        let indexTo = document.querySelector("#SendTO").selectedIndex
        indexTo = document.querySelector("#SendTO")[indexTo].attributes[0].value
        console.log({indexFrom, indexTo})
        let result = sendMessage(Number(indexFrom), Number(indexTo))
        alert(JSON.stringify(result))
    })
}

let init_Nodes = ()=>{
    Nodes = new Array(8)
    for(let i = 0; i < Nodes.length; i++){
        Nodes[i] = new Node(i);
        if(i % 2 === 1)
            Nodes[i].status = true;
    }
}

let generate_key = (id1, id2, index)=>{
    let l1 = lagrange(id1, id2, index)
    let l2 = lagrange(id2, id1,index)
    console.log("lagrange is: ")
    console.log({l1,l2})
    let salt1 = Math.random()*1e3
    let salt2 = Math.random()*1e3
    l1 += salt1
    l2 += salt2
    console.log("salted lagrange: ")
    console.log({l1, l2})
    l1 = (l1-salt1)
    l2 = (l2-salt2)
    let final = id1*l1 + id2*l2
    console.log("final:")
    console.log({final})
    final = Math.floor(Math.pow(final, 2))
    console.log("final squad:")
    console.log({final})
}

let lagrange = (id1, id2, index)=>{
    return (index-Nodes[id2].pub)/(Nodes[id1].pub-Nodes[id2].pub)
}

init_Nodes()




