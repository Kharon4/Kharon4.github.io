import {THREE,compCols,highLightCol,grey,whiteMat,blackMat,greyMat,hlMat,noSections} from './globals.js';

function KeyBoard(fontGeo){
    let keyBoard = new THREE.Group();
    {
        const keyWidth = 0.1;
        const keyHeight = keyWidth*0.8;
        const r1HM = 0.1;
        const r2HM = 0.2;
        const r3HM = 0.3;
        const r4HM = 0.4;
        const minHK = 0.3;
        let matArr =[whiteMat,whiteMat,blackMat,blackMat,greyMat,greyMat];
        for(let i = 0 ; i < 20; ++i){//z row
            let height = Math.random()*r1HM+minHK;
            let g = new THREE.BoxGeometry(keyWidth,height,keyHeight);
            let mesh = new THREE.Mesh(g,matArr);
            mesh.position.set(i*keyWidth*1.1,-height/2,0);
            keyBoard.add(mesh);
        }
        for(let i = 0 ; i < 21; ++i){//a row
            let height = Math.random()*r2HM+minHK;
            let g = new THREE.BoxGeometry(keyWidth,height,keyHeight);
            let mesh = new THREE.Mesh(g,matArr);
            mesh.position.set(i*keyWidth*1.1-keyWidth*1.1/2,-height/2,-keyHeight*1.1);
            keyBoard.add(mesh);
        }
        for(let i = 0 ; i < 22; ++i){//q row
            let height = Math.random()*r3HM+minHK;
            let g = new THREE.BoxGeometry(keyWidth,height,keyHeight);
            let mesh = new THREE.Mesh(g,matArr);
            mesh.position.set(i*keyWidth*1.1-keyWidth*1.1*2/3,-height/2,-keyHeight*1.1*2);
            keyBoard.add(mesh);
        }
        for(let i = 0 ; i < 26; ++i){//` row
            let height = Math.random()*r4HM+minHK;
            let g = new THREE.BoxGeometry(keyWidth,height,keyHeight);
            let mesh = new THREE.Mesh(g,matArr);
            mesh.position.set(i*keyWidth*1.1-keyWidth*1.1*2,-height/2,-keyHeight*1.1*3.2);
            keyBoard.add(mesh);
        }
        for(let i = 0 ; i < 26; ++i){//esc row
            let height = Math.random()*r4HM+minHK;
            let g2 = new THREE.BoxGeometry(keyWidth*0.8,height,keyHeight * 0.6);
            let mesh = new THREE.Mesh(g2,matArr);
            mesh.position.set(i*keyWidth*1.1-keyWidth*1.1*2,-height/2,-keyHeight*1.1*4.2);
            keyBoard.add(mesh);
        }
        //shift
        {   let height = Math.random()*r1HM+minHK;
            let g2 = new THREE.BoxGeometry(keyWidth*2.5,height,keyHeight);
            let mesh = new THREE.Mesh(g2,matArr);
            mesh.position.set(-keyWidth*1.8,-height/2,0);
            keyBoard.add(mesh);

        }
        //caps
        {   let height = Math.random()*r2HM+minHK;
            let g2 = new THREE.BoxGeometry(keyWidth*1.6,height,keyHeight);
            let mesh = new THREE.Mesh(g2,matArr);
            mesh.position.set(-keyWidth*2,-height/2,-keyHeight*1.1);
            keyBoard.add(mesh);

        }
        //tab
        {   let height = Math.random()*r3HM+minHK;
            let g2 = new THREE.BoxGeometry(keyWidth*1.4,height,keyHeight);
            let mesh = new THREE.Mesh(g2,matArr);
            mesh.position.set(-keyWidth*2.2,-height/2,-keyHeight*1.1*2);
            keyBoard.add(mesh);

        }
        //a
        const keyNameScale = 0.05;
        const adx = -0.025;
        const adz = 0.025;
        {
            let keyName = new THREE.Mesh(fontGeo["A".charCodeAt(0)],hlMat);
            keyName.scale.set(keyNameScale,keyNameScale,keyNameScale/4);
            keyName.rotation.x = -Math.PI/2;
            keyName.position.set(-keyWidth*1.1/2+adx,0,-keyHeight*1.1+adz);
            keyBoard.add(keyName);
        }
        //s
        {
            let keyName = new THREE.Mesh(fontGeo["S".charCodeAt(0)],hlMat);
            keyName.scale.set(keyNameScale,keyNameScale,keyNameScale/4);
            keyName.rotation.x = -Math.PI/2;
            keyName.position.set(keyWidth*1.1-keyWidth*1.1/2+adx,0,-keyHeight*1.1+adz);
            keyBoard.add(keyName);
        }
        //d
        {
            let keyName = new THREE.Mesh(fontGeo["D".charCodeAt(0)],hlMat);
            keyName.scale.set(keyNameScale,keyNameScale,keyNameScale/4);
            keyName.rotation.x = -Math.PI/2;
            keyName.position.set(keyWidth*1.1*2-keyWidth*1.1/2+adx,0,-keyHeight*1.1+adz);
            keyBoard.add(keyName);
        }
        //w
        {
            let keyName = new THREE.Mesh(fontGeo["W".charCodeAt(0)],hlMat);
            keyName.scale.set(keyNameScale,keyNameScale,keyNameScale/4);
            keyName.rotation.x = -Math.PI/2;
            keyName.position.set(keyWidth*1.1-keyWidth*1.1*2/3+adx,0,-keyHeight*1.1*2+adz);
            keyBoard.add(keyName);
        }
    }
    return keyBoard;
}

export {KeyBoard};