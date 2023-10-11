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
        if(Math.hypot(this.x - this.target.x,this.y - this.target.y) > 5){
            this.move();
        }
        if(this.img == G3Pimg && this.target.x == 320 && this.target.y == 580.75 && Math.hypot(this.x - this.target.x, this.y - this.target.y) < 9 && combstage >= 1){
            this.target = {"x":795,"y":580.75};
        }
        if(this.img == G3Pimg && this.target.x == 1270 && this.target.y == 580.75 && Math.hypot(this.x - this.target.x, this.y - this.target.y) < 9 && combstage >= 1){
            this.target = {"x":795,"y":580.75};
        }
        if(this.img == G3Pimg && this.target.x == 320 && this.target.y == 556.75 && Math.hypot(this.x - this.target.x, this.y - this.target.y) < 9 && combstage >= 2){
            this.target = {"x":795,"y":580.75};
        }
        if(this.img == G3Pimg && this.target.x == 1270 && this.target.y == 556.75 && Math.hypot(this.x - this.target.x, this.y - this.target.y) < 9 && combstage >= 2){
            this.target = {"x":795,"y":580.75};
        }
        if(this.img == G3Pimg && this.target.x == 795 && this.target.y == 498 && Math.hypot(this.x - this.target.x, this.y - this.target.y) < 9 && combstage >= 3){
            this.target = {"x":795,"y":556.75};
        }
        if(this.img == G3Pimg && this.target.x == 795 && this.target.y == 522 && Math.hypot(this.x - this.target.x, this.y - this.target.y) < 9 && combstage >= 3){
            this.target = {"x":795,"y":556.75};
        }

        // TOP RIGHT ENDS AT (1270,498) and (1270,522)
        if(this.img == G3Pimg && this.target.x == 1270 && this.target.y == 498 && Math.hypot(this.x - this.target.x, this.y - this.target.y) < 9 && combstage >= 4){
            this.target = {"x":795,"y":556.75};
        }
        if(this.img == G3Pimg && this.target.x == 1270 && this.target.y == 522 && Math.hypot(this.x - this.target.x, this.y - this.target.y) < 9 && combstage >= 4){
            this.target = {"x":795,"y":556.75};
        }

        
    }
    move(){
        this.angle = atan2((this.target.y) - (this.y), (this.target.x) - (this.x));
        let xspeed = cos(this.angle) * 3.7;
        let yspeed = sin(this.angle) * 3.7;
        this.x += xspeed;
        this.y += yspeed;

    }
}
class NADPH extends Molecule{
    constructor(x,y,target){
        super(NADPHimg,x,y,30,target);
        this.speed = 3.3;
    }
    move(){
        this.angle = atan2((this.target.y) - (this.y), (this.target.x) - (this.x));
        let xspeed = cos(this.angle) * this.speed;
        let yspeed = sin(this.angle) * this.speed;
        this.x += xspeed;
        this.y += yspeed;
    }
}
class ATP extends Molecule{
    constructor(x,y,target){
        super(ATPimg,x,y,30,target);
        this.speed = 3.3;
    }
    move(){
        this.angle = atan2((this.target.y) - (this.y), (this.target.x) - (this.x));
        let xspeed = cos(this.angle) * this.speed;
        let yspeed = sin(this.angle) * this.speed;
        this.x += xspeed;
        this.y += yspeed;
    }
}

class O extends Molecule{
    constructor(x,y,s){
        super(oimg,x,y,s,{})
    }
    move(){
        this.y -= 5;
        if(this.y < 0){
            molecules.splice(molecules.indexOf(this),1);
        }
    }
    update(){
        this.draw();
        this.move();
    }
}




var startimg,rubpimg,co2img,rubp1img,RuBisCOimg,G3Pimg,glucoseimg,G3P1img,oimg;
var stage = 1;
var combstage = 0;
var framecount = 0;
var molecules = [];
function preload(){
    rubpimg = loadImage("./RUBP.png");
    startimg = loadImage("./CALVIN.png");
    co2img = loadImage("./CO2.png");
    rubp1img = loadImage("./RUBP+CARBON.png");
    RuBisCOimg = loadImage("./RuBisCo.png");
    NADPHimg = loadImage("./NADPH.png");
    ATPimg = loadImage("./ATP.png");
    G3Pimg = loadImage("./G3P.png");
    glucoseimg = loadImage("./Glucose.png")
    G3P1img = loadImage("./G3P+1.png");
    oimg = loadImage("./O2.png");
}
function setup(){
    createCanvas(1423,703);
    imageMode(CENTER);
    rectMode(CENTER);
}
function draw(){
    
    background(230);
    image(startimg,1423/2,703/2,1423,703);
    if(framecount % 800 == 0){
        // TOP LEFT ENDS AT (320,498) and (320,522)
        if(framecount < 800) {molecules.push(new Molecule(rubpimg,120,0,40,{"x":120,"y":120}));}
        molecules.push(new Molecule(co2img,0,120,20,{"x":120,"y":120}));
        molecules.push(new Molecule(RuBisCOimg,0,0,30,{"x":120,"y":120}));

        // TOP MID ENDS AT (795,498) and (795,522)
        if(framecount < 800) {molecules.push(new Molecule(rubpimg,120 + 475,0,40,{"x":120 + 475,"y":120}));}
        molecules.push(new Molecule(co2img,0 + 475,120,20,{"x":120 + 475,"y":120}));
        molecules.push(new Molecule(RuBisCOimg,475,0,30,{"x":120 + 475,"y":120}));

        // TOP RIGHT ENDS AT (1270,498) and (1270,522)
        if(framecount < 800) {molecules.push(new Molecule(rubpimg,120 + 475 * 2,0,40,{"x":120 + 475 * 2,"y":120}));}
        molecules.push(new Molecule(co2img,0 + 475 * 2,120,20,{"x":120 + 475 * 2,"y":120}));
        molecules.push(new Molecule(RuBisCOimg,475 * 2,0,30,{"x":120 + 475 * 2,"y":120}));

        // BOT LEFT ENDS AT (320,556.75) and (320,580.75)
        if(framecount < 800) { molecules.push(new Molecule(rubpimg,120,0 + 235,40,{"x":120,"y":120 + 235}));}
        molecules.push(new Molecule(co2img,0,120 + 235,20,{"x":120,"y":120 + 235}));
        molecules.push(new Molecule(RuBisCOimg,0,235,30,{"x":120,"y":120 + 235}));

        // BOT MID ENDS AT (795,556.75) and (795,580.75)
        if(framecount < 800) {molecules.push(new Molecule(rubpimg,120 + 475,0 + 235,40,{"x":120 + 475,"y":120 + 235}));}
        molecules.push(new Molecule(co2img,475,120 + 235,20,{"x":120 + 475,"y":120 + 235}));
        molecules.push(new Molecule(RuBisCOimg,475,235,30,{"x":120 + 475,"y":120 + 235}));

        // BOT RIGHT ENDS AT (1270,556.75) and (1270,580.75)
        if(framecount < 800) {molecules.push(new Molecule(rubpimg,120 + 475 * 2,0 + 235,40,{"x":120 + 475 * 2,"y":120 + 235}));}
        molecules.push(new Molecule(co2img,475 * 2,120 + 235,20,{"x":120 + 475 * 2,"y":120 + 235}));
        molecules.push(new Molecule(RuBisCOimg,475 * 2,235,30,{"x":120 + 475 * 2,"y":120 + 235}));
    }
    if((framecount + 660) % 800 == 0 && (framecount + 670) > 800){
        // TOP LEFT
        molecules.push(new ATP(200,0,{"x":300,"y":120}));
        molecules.push(new NADPH(400,0,{"x":300,"y":120}));
        
        // TOP MID
        molecules.push(new ATP(200 + 475,0,{"x":300 + 475,"y":120}));
        molecules.push(new NADPH(400 + 475,0,{"x":300 + 475,"y":120}));

        // TOP RIGHT
        molecules.push(new ATP(200 + 475 * 2,0,{"x":300 + 475 * 2,"y":120}));
        molecules.push(new NADPH(400 + 475 * 2,0,{"x":300 + 475 * 2,"y":120}));

        // BOT LEFT
        molecules.push(new ATP(200,235,{"x":300,"y":120 + 235}));
        molecules.push(new NADPH(400,235,{"x":300,"y":120 + 235}));

        // BOT MID
        molecules.push(new ATP(200 + 475,235,{"x":300 + 475,"y":120 + 235}));
        molecules.push(new NADPH(400 + 475,235,{"x":300 + 475,"y":120 + 235}));

        // BOT RIGHT
        molecules.push(new ATP(200 + 475 * 2,235,{"x":300 + 475 * 2,"y":120 + 235}));
        molecules.push(new NADPH(400 + 475 * 2,235,{"x":300 + 475 * 2,"y":120 + 235}));
    }
    for(var molecule of molecules){
        molecule.update();
    }
    for(var molecule of molecules){
        if(molecule.img == co2img){
            for(var molecule2 of molecules){
                if(molecule2.img == rubpimg){
                    if(Math.hypot(molecule.x - molecule2.x,molecule.y - molecule2.y) < 9){
                        for(var molecule3 of molecules){
                            if(Math.hypot(molecule.x - molecule3.x, molecule.y - molecule3.y) < 9 && molecule3.img == RuBisCOimg){
                                molecule2.img = rubp1img;
                                molecules.splice(molecules.indexOf(molecule),1);
                                molecules.splice(molecules.indexOf(molecule3),1);
                                molecules.push(new O(molecule.x,molecule.y,20))
                                molecule2.target.x += 180;
                                molecule2.s = 48;
                            }
                        }
                    }
                }
            }
        }
    }
    for(var molecule of molecules){
        if(molecule.img == rubp1img){
            for(var molecule2 of molecules){
                if(molecule2.img == NADPHimg){
                    if(Math.hypot(molecule.x - molecule2.x,molecule.y - molecule2.y) < 9){
                        for(var molecule3 of molecules){
                            if(Math.hypot(molecule.x - molecule3.x, molecule.y - molecule3.y) < 9 && molecule3.img == ATPimg){
                                molecule.img = G3Pimg;
                                molecules.splice(molecules.indexOf(molecule2),1);
                                molecules.splice(molecules.indexOf(molecule3),1);
                                molecule.target.x += 20;
                                molecule.target.y /= 4;
                                molecule.target.y += 480 - 12;
                                molecule.s = 24;
                                molecules.push(new Molecule(G3Pimg,molecule.x,molecule.y + 12,24,{"x":molecule.target.x,"y":molecule.target.y + 24}))
                            }
                        }
                    }
                }
            }
        }
    }
    for(var molecule of molecules){
        if(molecule.img == G3Pimg && molecule.target.x == 320 && molecule.target.y == 498){
            var index = molecules.indexOf(molecule);
            for(var molecule2 of molecules){
                if(molecule2.img == G3Pimg && index != molecules.indexOf(molecule2) && molecule2.target.x == 320 && molecule2.target.y == 522){
                    if(Math.hypot(molecule.x - molecule2.x,molecule.y - molecule2.y) < 30 && Math.hypot(molecule.x - 320, molecule.y - 498) < 9 ){
                        molecule.target = {"x":320, "y":522};
                    }
                }
            }
        }
    }
    for(var molecule of molecules){
        if(molecule.img == G3Pimg && molecule.target.x == 320 && molecule.target.y == 522){
            var index = molecules.indexOf(molecule);
            for(var molecule2 of molecules){
                if(molecule2.img == G3Pimg && index != molecules.indexOf(molecule2) && molecule2.target.x == 320 && molecule2.target.y == 522){
                    if(Math.hypot(molecule.x - molecule2.x,molecule.y - molecule2.y) < 9 && Math.hypot(molecule.x - 320, molecule.y - 522) < 9 ){
                        molecule.img = glucoseimg;
                        molecule.s = 48;
                        molecules.splice(molecules.indexOf(molecule2),1);
                        molecule.target.x -= 1000;
                        if(combstage == 0){
                            combstage = 1;
                        }
                    }
                }
            }
        }
    }

    for(var molecule of molecules){
        if(molecule.img == G3Pimg && molecule.target.x == 795 && molecule.target.y == 580.75 && combstage >= 0){
            var index = molecules.indexOf(molecule);
            for(var molecule2 of molecules){
                if(molecule2.img == G3Pimg && index != molecules.indexOf(molecule2) && molecule2.target.x == 795 && molecule2.target.y == 580.75){
                    var index2 = molecules.indexOf(molecule2);
                    for(var molecule3 of molecules){
                        if(molecule3.img == G3Pimg && molecules.indexOf(molecule3) != index2 && molecules.indexOf(molecule3) != index && molecule3.target.x == 795 && molecule3.target.y == 580.75)
                            if(Math.hypot(molecule.x - molecule2.x,molecule.y - molecule2.y) < 9 && Math.hypot(molecule.x - 795, molecule.y - 580.75) < 9 && Math.hypot(molecule.x - molecule3.x,molecule.y - molecule3.y) < 9){
                                molecule.img = rubpimg;
                                molecule.s = 40;
                                molecules.splice(molecules.indexOf(molecule2),1);
                                molecule.target = {"x":120,"y":120};
                                molecule3.img = G3P1img;
                                molecule3.s = 26 + 2/3;
                                if(combstage < 2){
                                    combstage = 2;
                                }
                            }
                    }
                }
            }
        }
    }
    for(var molecule of molecules){
        if(molecule.img == G3Pimg && molecule.target.x == 795 && molecule.target.y == 580.75 && combstage >= 0){
            var index = molecules.indexOf(molecule);
            for(var molecule2 of molecules){
                if(molecule2.img == G3Pimg && index != molecules.indexOf(molecule2) && molecule2.target.x == 795 && molecule2.target.y == 580.75){
                    var index2 = molecules.indexOf(molecule2);
                    for(var molecule3 of molecules){
                        if(molecule3.img == G3P1img && molecules.indexOf(molecule3) != index2 && molecules.indexOf(molecule3) != index && molecule3.target.x == 795 && molecule3.target.y == 580.75)
                            if(Math.hypot(molecule.x - molecule2.x,molecule.y - molecule2.y) < 9 && Math.hypot(molecule.x - 795, molecule.y - 580.75) < 9 && Math.hypot(molecule.x - molecule3.x,molecule.y - molecule3.y) < 9){
                                molecule.img = rubpimg;
                                molecule.s = 40;
                                molecules.splice(molecules.indexOf(molecule3),1);
                                molecule.target = {"x":120 + 475,"y":120};
                                molecule2.img = rubpimg;
                                molecule2.s = 40;
                                molecule2.target = {"x":120 + 475 + 475, "y":120};
                                if(combstage < 3){
                                    combstage = 3;
                                }
                            }
                    }
                }
            }
        }
    }

    for(var molecule of molecules){
        if(molecule.img == G3Pimg && molecule.target.x == 795 && molecule.target.y == 556.75 && combstage >= 3){
            var index = molecules.indexOf(molecule);
            for(var molecule2 of molecules){
                if(molecule2.img == G3Pimg && index != molecules.indexOf(molecule2) && molecule2.target.x == 795 && molecule2.target.y == 556.75){
                    var index2 = molecules.indexOf(molecule2);
                    for(var molecule3 of molecules){
                        if(molecule3.img == G3Pimg && molecules.indexOf(molecule3) != index2 && molecules.indexOf(molecule3) != index && molecule3.target.x == 795 && molecule3.target.y == 556.75)
                            if(Math.hypot(molecule.x - molecule2.x,molecule.y - molecule2.y) < 9 && Math.hypot(molecule.x - 795, molecule.y - 556.75) < 9 && Math.hypot(molecule.x - molecule3.x,molecule.y - molecule3.y) < 9){
                                molecule.img = rubpimg;
                                molecule.s = 40;
                                molecules.splice(molecules.indexOf(molecule2),1);
                                molecule.target = {"x":120,"y":120 + 235};
                                molecule3.img = G3P1img;
                                molecule3.s = 26 + 2/3;
                                if(combstage < 4){
                                    combstage = 4;
                                }
                            }
                    }
                }
            }
        }
    }
    
    for(var molecule of molecules){
        if(molecule.img == G3Pimg && molecule.target.x == 795 && molecule.target.y == 556.75 && combstage >= 4){
            var index = molecules.indexOf(molecule);
            for(var molecule2 of molecules){
                if(molecule2.img == G3Pimg && index != molecules.indexOf(molecule2) && molecule2.target.x == 795 && molecule2.target.y == 556.75){
                    var index2 = molecules.indexOf(molecule2);
                    for(var molecule3 of molecules){
                        if(molecule3.img == G3P1img && molecules.indexOf(molecule3) != index2 && molecules.indexOf(molecule3) != index && molecule3.target.x == 795 && molecule3.target.y == 556.75)
                            if(Math.hypot(molecule.x - molecule2.x,molecule.y - molecule2.y) < 9 && Math.hypot(molecule.x - 795, molecule.y - 556.75) < 9 && Math.hypot(molecule.x - molecule3.x,molecule.y - molecule3.y) < 9){
                                molecule.img = rubpimg;
                                molecule.s = 40;
                                molecules.splice(molecules.indexOf(molecule3),1);
                                molecule.target = {"x":120 + 475,"y":120 + 235};
                                molecule2.img = rubpimg;
                                molecule2.s = 40;
                                molecule2.target = {"x":120 + 475 + 475, "y":120 + 235};
                                if(combstage){
                                    combstage = 1;
                                }
                            }
                    }
                }
            }
        }
    }

    framecount++;
}

