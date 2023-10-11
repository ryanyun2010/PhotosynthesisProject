var startimg;
var conveyerimgs = [];
var conveyerimgframe = 0;
var curframe = 0;
var currentlyOtherFrame = false;
var himg, eimg, oimg,lightimg,eeimg,NADPimg,NADPHimg,ATPimg,ADPimg;
var stage = 2;
var hs = [];
var es = [];
var os = [];
var ls = [];
var nadps = [];
var adps = [];
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
class Molecule{
    constructor(img,x,y,s,target){
        this.x = x;
        this.y = y;
        this.s = s;
        this.target = target;
        this.img = img;
    }
    draw(){
        image(this.img,this.x,this.y,this.s,this.s)
    }
    update(){
        this.draw();
        if(Math.hypot(this.x - this.target.x,this.y - this.target.y) > 1){
            this.move();
        }
    }
    move(){
        this.angle = atan2((this.target.y) - (this.y), (this.target.x) - (this.x));
        let xspeed = cos(this.angle) * 1.7;
        let yspeed = sin(this.angle) * 1.7;
        this.x += xspeed;
        this.y += yspeed;
    }
}
class H extends Molecule{
    constructor(x,y,s,hydrolosis){
        if(hydrolosis){
            super(himg,x,y,s,{"x":Math.random() * 700 + 500,"y":Math.random() * 150 + 500})
        }else{
            super(himg,x,y,s,{"x":Math.random() * 700 + 500,"y":Math.random() * 150 + 50})
        }
        this.lastMoved = 0;

    }
    update(){
        this.lastMoved --;
        this.draw();
        if(Math.hypot(this.x - this.target.x,this.y - this.target.y) > 1){
            this.move();
        }
        if(this.target.x == 530 && this.target.y == 365 && Math.hypot(this.x - this.target.x,this.y - this.target.y) < 2){
            console.log("E")
            this.target = {"x":530,"y":440};
        }
        if(this.target.x == 530 && this.target.y == 440 && Math.hypot(this.x - this.target.x,this.y - this.target.y) < 2){
            console.log("E")
            this.target = {"x":Math.random() * 700 + 500,"y":Math.random() * 150 + 500};
        }
        if(this.y > 400 && Math.hypot(this.target.x - this.x,this.target.y - this.y) < 10){
            this.target = {"x":1122,"y":500};
        }
        if(this.target.x == 1122 && this.target.y == 500 && Math.hypot(this.target.x - this.x,this.target.y - this.y) < 10){
            this.target = {"x":1112,"y":335};
            adps.push(new ADP());
            this.lastMoved = 100000000;
        }
        if(this.target.x == 1112 && this.target.y == 335 && Math.hypot(this.target.x - this.x,this.target.y - this.y) < 2){
            console.log("testttt");
            for(var adp of adps){
                if(Math.hypot(this.x - adp.x, this.y - adp.y) < 2 && adp.img == ADPimg){
                    adp.img = ATPimg;
                    hs.splice(hs.indexOf(this),1);
                    adp.target.y -= 1000;
                    return;
                }
            }
        }

    }
}

class LightPS1 extends Molecule{
    constructor(x,y){
        super(lightimg,x,y,20,{"x":346,"y":410});
    }
}
class LightPS2 extends Molecule{
    constructor(x,y){
        super(lightimg,x,y,20,{"x":758,"y":404});
    }
    move(){
        this.angle = atan2((this.target.y) - (this.y), (this.target.x) - (this.x));
        let xspeed = cos(this.angle) * 1.52;
        let yspeed = sin(this.angle) * 1.52;
        this.x += xspeed;
        this.y += yspeed;
    }
}


class E extends Molecule{
    constructor(x,y,s){
        super(eimg,x,y,s,{"x":346,"y":410})
    }
    update(){
        this.draw();
        if(Math.hypot(this.x - this.target.x,this.y - this.target.y) > 1){
            this.move();
          
        }
        for(var l of ls){
            if(Math.hypot(this.x - l.x,this.y-l.y) < 2 && Math.hypot(this.x - 346,this.y-410) < 2){
                this.img = eeimg;
                ls.splice(ls.indexOf(l),1);
                this.target = {"x":469,"y":404}
            }
            if(stage == 2){
                stage = 3;
            } 
            
        }
        if(Math.hypot(this.x - 469,this.y - 404) < 2 && this.target.x == 469 && this.target.y == 404){
            this.target = {"x":758,"y":404}
            for(var h of hs){
                if(h.y < 400 && h.lastMoved < 0 && Math.hypot(h.target.x - h.x,h.target.y - h.y) < 10){
                    h.lastMoved = 500;
                    h.target = {"x":530,"y":365};
                    break;
                }
            }
        }
       
        
        if(Math.hypot(this.x - 639,this.y - 404) < 2){
            this.img = eimg;
        }
        if(Math.hypot(this.x - 758, this.y - 404) < 2){
            if(stage == 3){
                stage ++;
            }
            for(var l of ls){
                if(Math.hypot(this.x - l.x,this.y-l.y) < 2){
                    this.img = eeimg;
                    ls.splice(ls.indexOf(l),1);
                    this.target.x += 134;
                    this.target.y += 6;
                }
            }
        }
        if(Math.hypot(this.x - 892,this.y - 410) < 2){
            this.target = {"x":960,"y":350}
        }
        if(Math.hypot(this.x - 960, this.y - 350) < 2){
            for(var nadp of nadps){
                if(Math.hypot(this.x - nadp.x,this.y-nadp.y) < 2){
                    es.splice(es.indexOf(this),1);
                    nadp.img = NADPHimg;
                    nadp.target.y -= 1000;
                    nadp.speed = 2;
                }
            }
        }
    }
    
}

class O extends Molecule{
    constructor(x,y,s){
        super(oimg,x,y,s,{})
    }
    move(){
        this.y -= 5;
        if(this.y < 0){
            os.splice(os.indexOf(this),1);
        }
    }
    update(){
        this.draw();
        this.move();
    }
}

class NADP extends Molecule{
    constructor(x,y){
        super(NADPimg,984,-10,30,{"x":960,"y":350});
        this.speed = 4;
    }
    move(){
        this.angle = atan2((this.target.y) - (this.y), (this.target.x) - (this.x));
        let xspeed = cos(this.angle) * this.speed;
        let yspeed = sin(this.angle) * this.speed;
        this.x += xspeed;
        this.y += yspeed;
    }
}
class ADP extends Molecule{
    constructor(x,y){
        super(ADPimg,1423,360,30,{"x":1112,"y":335});
        this.speed = 2.7;
    }
    move(){
        this.angle = atan2((this.target.y) - (this.y), (this.target.x) - (this.x));
        let xspeed = cos(this.angle) * this.speed;
        let yspeed = sin(this.angle) * this.speed;
        this.x += xspeed;
        this.y += yspeed;
    }
}







function preload(){
    startimg = loadImage("./PART1.png");
    eimg = loadImage("./electron.png");
    himg = loadImage("./H+.png");
    oimg = loadImage("./O2.png");
    lightimg = loadImage("./light.png");
    eeimg = loadImage("./ee.png");
    NADPimg = loadImage("./NADP.png");
    NADPHimg = loadImage("./NADPH.png");
    ADPimg = loadImage("./ADP.png");
    ATPimg = loadImage("./ATP.png");
    for(var i = 1; i < 25; i++){
        if(i < 10){
            conveyerimgs.push(loadImage("../conveyerimg/Conveyer-0" +i + ".png"));
        }else{
            conveyerimgs.push(loadImage("../conveyerimg/Conveyer-" +i + ".png"));
        }
    }
    conveyerimgs.push(loadImage("../conveyerimg/Conveyer-42.png"));
    conveyerimgs.push(loadImage("../conveyerimg/Conveyer-43.png"));
    
}
function setup(){
    createCanvas(1423,703);
}
function draw(){
    background(230);
    curframe ++;
    if(stage >= 3){
        if(curframe % 52 == 0){
            ls.push(new LightPS2(300,200));
        }
    }
    if(stage >= 2){
        if(curframe % 52 == 0){
            ls.push(new LightPS1(300,200));
        }
    }
    if(stage >= 4){
        if(curframe % 52 == 0){
            nadps.push(new NADP());
        }
    }
    if(curframe % 52 == 0){
        hs.push(new H(711.5,2,20,false))
    }

    currentlyOtherFrame = (currentlyOtherFrame) ? false : true;
    image(startimg,0,0,1423,703);
    if(stage >= 1){
        fill("white");
        noStroke();
        image(conveyerimgs[conveyerimgframe],205.5,502,250,125.7)
        if(currentlyOtherFrame){
            conveyerimgframe++;
        }
        if(conveyerimgframe == conveyerimgs.length - 2 && currentlyOtherFrame){
            hs.push(new H(426.5,566,20,true))
            hs.push(new H(398,577,20,true))
            es.push(new E(416.5,581,16));
            os.push(new O(377.4,578,20));
        }
        if(conveyerimgframe > conveyerimgs.length - 1){
            conveyerimgframe = 0;
        }
    }
    for(var h of hs){
        h.update();
    }
    for(var e of es){
        e.update();
    }
    for(var o of os){
        o.update();
    }
    for(var l of ls){
        l.update();
    }
    for(var nadp of nadps){
        nadp.update();
    }
    for(var adp of adps){
        adp.update();
    }
}

