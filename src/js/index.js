import {load} from './load.js';

//DOM
let navElements = document.getElementsByClassName('menItem');

//canvas
//import * as THREE from '../../node_modules/three/build/three.module.js';
import {THREE,compCols,textures,highLightCol,grey,whiteMat,blackMat,greyMat,hlMat,noSections} from './models/globals.js';
import {camPath} from './cameraPath.js';



const generateTextGeo = (callBack)=>{
    const fontLoader = new THREE.FontLoader();
    //'./node_modules/three/examples/fonts/helvetiker_regular.typeface.json'
    fontLoader.load('src/threejsSrc/fonts/Consolas_Regular.json',
        (font)=>{
            let fontGeo=[];
            let j = 0;
            const loadF = ()=>{
                if(j<96){
                    fontGeo.push(new THREE.TextGeometry(
                                String.fromCharCode(j),
                                {
                                    font:font,
                                    size:1,
                                    height:0.1
                                }
                            )
                        );
                    j++;
                    load(loadF,`Getting Stuff Ready`);
                }else{
                    if(callBack!=undefined)callBack(fontGeo);
                }
            }
            load(loadF,'Getting Stuff Ready')
        }
    );
}


import {Monitor} from './models/monitor.js';
import {KeyBoard} from './models/keyboard.js';
import {SelectionBox} from './models/selectionBox.js'
import {AboutModel} from './models/aboutModel.js';
import {EducationModel} from './models/educationModel.js';
import {ContactModel} from './models/contactModel.js'
import {SkillsModel} from './models/skillsModel.js'

let eduState={display:false};

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
    keyBoard.position.set(-0.75,-0.75,0.7);
    rVal.push(keyBoard);


    //Selection box
    let selectBox = SelectionBox();
    selectBox.scale.set(0.2,0.2,0.2);
    selectBox.position.set(0,-2,0);
    rVal.push(selectBox);
    
    //about model
    let aboutModel = AboutModel(fontGeo);
    aboutModel.position.set(0,-2,0);
    rVal.push(aboutModel);

    let eduModel = EducationModel(fontGeo);
    eduModel.position.set(1,-4.1,0);
    eduModel.updateAction =()=>{
        eduModel.updateActionSec();
        if(eduState.display){
            if(eduModel.sc <= 10){
                eduModel.sc+=0.1;
                eduModel.scale.set(eduModel.sc,eduModel.sc,eduModel.sc);
                eduModel.position.y += 0.01;
            }
        }else{
            if(eduModel.sc > 1){
                eduModel.sc-=0.1;
                eduModel.scale.set(eduModel.sc,eduModel.sc,eduModel.sc);
                eduModel.position.y-=0.01;
            }
        }
    }
    // eduModel.rotation.y = -Math.PI/10;
    rVal.push(eduModel);

    let contactModel = ContactModel(fontGeo);
    contactModel.position.set(0,-8,1);
    contactModel.rotation.y = 0;//-Math.PI;
    rVal.push(contactModel);

    let skModel = SkillsModel();
    skModel.position.set(-0.5,-6,0);
    rVal.push(skModel);

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

    
    const bitsDom = document.getElementById('EduBITS');
    const krmDom = document.getElementById('EduKRM');

    let eduTexId = 0;
    let hop = 1500;
    let mesh;
    //edu screen
    {
        let geo = new THREE.PlaneGeometry(1,hop);
        let mat = new THREE.MeshBasicMaterial({map:textures[0]});
        mat.depthFunc = THREE.GreaterEqualDepth;
        mat.side = THREE.DoubleSide;
        mesh = new THREE.Mesh(geo,mat);
        mesh.renderOrder = 0;
        mesh.show = false;
        mesh.position.set(0,0,-450);
        mesh.updateAction=(mouse)=>{
            let page = mouse.fraction*(noSections-1);
            if(page<1.8 || page>2.2 )mesh.show=false;
            if(mesh.show)mesh.visible=true;
            else{
                mesh.visible=false;
                eduState.display=false;
                bitsDom.style.color='white';
                krmDom.style.color='white';
                return;
            }
            mat.map=textures[eduTexId];
            if(textures[eduTexId].image != undefined)mesh.scale.x = hop*textures[eduTexId].image.width/textures[eduTexId].image.height;
            mesh.position.y = mouse.fraction*(noSections-1)*hop - 2*hop;
        }
        rVal.push(mesh);
    }

    
    bitsDom.addEventListener('mouseover',
        ()=>{
        eduTexId=0;
        mesh.show = true;
        eduState.display=true;
        bitsDom.style.color = 'orangeRed';
        krmDom.style.color = 'white';
    });

    krmDom.addEventListener('mouseover',
        ()=>{
        mesh.show = true;
        eduState.display=true;
        eduTexId=1;
        bitsDom.style.color = 'white';
        krmDom.style.color = 'orangeRed';
    });


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
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
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
        this.updateCamPos();
    }

    this.updateTouchPos = (e)=>{
        let lastTouch =e.changedTouches[e.changedTouches.length-1];
        this.mouse.x = ( lastTouch.pageX / window.innerWidth ) * 2 - 1
        this.updateCamPos();
    }
    window.addEventListener( 'mousemove', this.updateMousePos, false );
    window.addEventListener('touchmove',this.updateTouchPos,false);
    
    const websiteContentDom = document.getElementById('websiteContent');

    websiteContentDom.addEventListener('scroll',()=>{
        this.mouse.scroll = websiteContentDom.scrollTop;//document.documentElement.scrollTop || document.body.scrollTop;
        this.mouse.fraction = this.mouse.scroll/((noSections-1)*window.innerHeight);
        this.updateNavEle();
        this.updateCamPos();
    });

    this.updateCamPos();

    return this;
}


generateTextGeo((fontGeo)=>{
    let sceneArr;
    let bgArr;
    let rd;

    load(()=>{sceneArr=generateScene(fontGeo);},'Setting Up Scene');
    load(()=>{bgArr = generateBackGround();},'Setting Up Background');
    load(()=>{rd = new renderer(sceneArr,bgArr)},'Done');
})

