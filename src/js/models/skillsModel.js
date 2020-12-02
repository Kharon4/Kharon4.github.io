import {THREE,compCols,highLightCol,grey,whiteMat,blackMat,greyMat,hlMat,noSections} from './globals.js';

function SkillsModel(){
    let model = new THREE.Group();

    // model.add(new THREE.Mesh(new THREE.BoxGeometry(0.2,0.2,0.2),hlMat));

    const texPaths = [
        'c.png',
        'c++.png',
        'CSS.png',
        'cuda.png',
        'electron.svg',
        'git.png',
        'github.png',
        'HTML.png',
        'jQuery.png',
        'JS.png',
        'mongodb.png',
        'node.png',
        'opencv.png',
        'socket.io.png',
        'three-js.png',
        'webrtc.png'
    ];
    let loader = new THREE.TextureLoader();
    for(let i = 0 ; i < texPaths.length ; ++i){
        loader.load( 
            './src/images/techs/'+texPaths[i],(texture)=>{
            let mat = new THREE.SpriteMaterial({map : texture});
            let sprite = new THREE.Sprite( mat );
            sprite.scale.y = 0.2;
            sprite.scale.x = sprite.scale.y * texture.image.width/texture.image.height;
            sprite.position.set(
            (i%4)*0.5-0.5,
            Math.trunc(i/4)*0.5 -1,
            Math.random()*0.1/sprite.scale.x-0.25
            );
            model.add(sprite);},undefined,
            (err)=>{console.log(err);}
        );
        
    }


    model.updateAction=(mouse)=>{
        for(let i = 0 ; i < model.children.length ; ++i){
            if(model.children[i].updateAction != undefined){
                model.children[i].updateAction();
            }
        }
        let pg = mouse.fraction*(noSections-1);
        let sc;
        if(pg<2.5)sc = 0;
        else if(pg<3)sc = 2*pg-5;
        else if(pg<3.5)sc = 1;
        else if (pg<4)sc = 8-2*pg;
        else sc = 0;
        model.scale.set(sc,sc,sc);

    }
    return model;
}

export {SkillsModel};