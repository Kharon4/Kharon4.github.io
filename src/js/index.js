//constans
const compCols = [0x000000,0xffffff];
const highLightCol = 0xff4500;
const grey = 0xf0f0f0;

//constant materials
const whiteMat = new THREE.MeshBasicMaterial({color:compCols[1]});
const blackMat = new THREE.MeshBasicMaterial({color:compCols[0]});
const hlMat = new THREE.MeshBasicMaterial({color:highLightCol});
const greyMat = new THREE.MeshBasicMaterial({color:grey});

const noSections = document.getElementsByClassName('sec').length;

//DOM
let navElements = document.getElementsByClassName('menItem');


//canvas
import * as THREE from '../../node_modules/three/build/three.module.js';

import {camPath} from './cameraPath.js';



const generateTextGeo = (callBack)=>{
    const fontLoader = new THREE.FontLoader();
    //'./node_modules/three/examples/fonts/helvetiker_regular.typeface.json'
    fontLoader.load('src/threejsSrc/fonts/Consolas_Regular.json',
        (font)=>{
            let fontGeo=[];
            for(let i = 0; i <96; ++i){
                // console.log(i,String.fromCharCode(i));
                fontGeo.push(
                new THREE.TextGeometry(
                        String.fromCharCode(i),
                        {
                            font:font,
                            size:1,
                            height:0.1
                        }
                    )
                );
            }
            if(callBack!=undefined)callBack(fontGeo);
        }
    );
}


import {Monitor} from './models/monitor.js';
import {KeyBoard} from './models/keyboard.js';
import {SelectionBox} from './models/selectionBox.js'
import {AboutModel} from './models/aboutModel.js';
import {EducationModel} from './models/educationModel.js';
const generateScene = (fontGeo)=>{
    let rVal = [];

    //monitor
    let monitor = Monitor(fontGeo);
    monitor.position.set(-0.5,0.5,0);
    // monitor.visible=false;
    rVal.push(monitor);

    //key board
    let keyBoard = KeyBoard(fontGeo);
    // keyBoard.visible=false;
    keyBoard.position.set(-0.65,-0.75,0.7);
    rVal.push(keyBoard);


    //Selection box
    let selectBox = SelectionBox();
    selectBox.position.set(0,-2,0);
    rVal.push(selectBox);
    
    //about model
    let aboutModel = AboutModel(fontGeo);
    aboutModel.position.set(0,-2,0);
    rVal.push(aboutModel);

    let eduModel = EducationModel(fontGeo);
    eduModel.position.set(1,-4.1,0);
    // eduModel.rotation.y = -Math.PI/10;
    rVal.push(eduModel);



    return rVal;
}

const generateBackGround = ()=>{
    let rVal = [];

    //white screens
    const whitePannels = [1,3];
    const heightOfPannel = 0.2;
    for(let i = 0 ; i < whitePannels.length ; ++i){
        {
            let geo = new THREE.PlaneGeometry(100,heightOfPannel);
            let mat = new THREE.MeshBasicMaterial({color:0xffffff});
            mat.depthWrite = false;
            let mesh = new THREE.Mesh(geo,mat);
            mesh.renderOrder = -1;
            mesh.position.set(0,0,-0.1);
            mesh.updateAction=(mouse)=>{
                mesh.position.y = mouse.fraction*(noSections-1)*heightOfPannel - whitePannels[i]*heightOfPannel;
            }
            rVal.push(mesh);
        }
    }
    return rVal;
}

function renderer(meshArr,staticMesh){
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.mouse = {x:0,y:0,scroll:0,fraction:0};
    this.camOffset = {x:0,y:0,senstivity:0.15};

    this.init = ()=>{
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 100 );
        this.renderer = new THREE.WebGLRenderer({
            antialias:true
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(compCols[0],1);
        this.renderer.domElement.id = 'renderer';
        document.body.appendChild( this.renderer.domElement );
        for(let i = 0 ; i < meshArr.length ; ++i)this.scene.add(meshArr[i]);
        for(let i = 0 ; i < staticMesh.length ; ++i)this.camera.add(staticMesh[i]);
        this.camera.position.z = 0.1;
        this.scene.add(this.camera);
    }

    this.init();

    this.resize = ()=>{
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener('resize',this.resize)

    this.updateCamPos = ()=>{
        //calcute fractional pos
        let fraction = this.mouse.fraction;
        fraction*=camPath.length-1;
        if(fraction >= camPath.length-1)fraction=camPath.length-1.000000001;
        let lL = Math.floor(fraction);
        let uL = lL +1;
        let uF = uL-fraction;
        let lF = fraction-lL;
        this.camOffset.x = this.mouse.x*this.camOffset.senstivity;
        this.camOffset.y = this.mouse.y*this.camOffset.senstivity;
        this.camera.position.x = camPath[lL][0]*uF+camPath[uL][0]*lF+this.camOffset.x;
        this.camera.position.y = camPath[lL][1]*uF+camPath[uL][1]*lF+this.camOffset.y;
        this.camera.position.z = camPath[lL][2]*uF+camPath[uL][2]*lF;
        this.camera.rotation.x = camPath[lL][3]*uF+camPath[uL][3]*lF+this.camOffset.y;
        this.camera.rotation.y = camPath[lL][4]*uF+camPath[uL][4]*lF-this.camOffset.x;
        this.camera.rotation.z = camPath[lL][5]*uF+camPath[uL][5]*lF;
    }


    this.updateNavEle = ()=>{
        let sec = this.mouse.fraction;
        sec*= noSections-1;
        sec = Math.round(sec);
        if(sec >= navElements.length)sec=navElements.length-1;
        for(let i = 0 ; i < navElements.length ; ++i)navElements[i].classList.remove('hlMItem');
        navElements[navElements.length-1-sec].classList.add('hlMItem');

    }

    this.animate = ()=>{
        requestAnimationFrame( this.animate );
        this.mouse.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        this.mouse.fraction = this.mouse.scroll/((noSections-1)*window.innerHeight);
        this.updateNavEle();
        this.updateCamPos();
        for(let i = 0 ; i < meshArr.length ; ++i){
            if(meshArr[i].updateAction != undefined)meshArr[i].updateAction(this.mouse,this.camOffset);
        }
        for(let i = 0 ; i < staticMesh.length; ++i){
            if(staticMesh[i].updateAction != undefined)staticMesh[i].updateAction(this.mouse,this.camOffset);
        }
        this.renderer.render( this.scene, this.camera );
    };
    this.animate();

    

    this.updateMousePos = (e)=>{
        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	    this.mouse.y = -( e.clientY / window.innerHeight ) * 2 + 1;
    }

    this.updateTouchPos = (e)=>{
        let lastTouch =e.changedTouches[e.changedTouches.length-1]; 
        console.log(lastTouch);
        this.mouse.x = ( lastTouch.pageX / window.innerWidth ) * 2 - 1
        //this.mouse.y = ( lastTouch.pageY / window.innerWidth ) * 2 - 1;
    }
    window.addEventListener( 'mousemove', this.updateMousePos, false );
    window.addEventListener('touchmove',this.updateTouchPos,false);
    
    return this;
}


generateTextGeo((fontGeo)=>{
    var rd = new renderer(generateScene(fontGeo),generateBackGround());
})

