import {THREE,compCols,highLightCol,grey,whiteMat,blackMat,greyMat,hlMat,noSections} from './globals.js';


function AboutModel(fontGeo){
    let model = new THREE.Group();
    {
        let centerMesh = new THREE.Mesh(new THREE.SphereGeometry(0.05,6,6),blackMat);
        model.add(centerMesh);

        const keyNameScale = 0.04;
        const makeStr = (str,mat)=>{
            
            let string = new THREE.Group();
            for(let i = 0 ; i < str.length ; ++i){
                let code = str.charCodeAt(i);
                if(code<0 || code>=96){;continue;}
                let keyName = new THREE.Mesh(fontGeo[code],mat);
                keyName.scale.set(keyNameScale,keyNameScale,keyNameScale);
                keyName.position.set(i*(keyNameScale),0,0);
                string.add(keyName);
            }
            return string;
        }
        // let strs = ['GIT','GITHUB','JAVASCRIPT','NODEJS','THREEJS','ELECTRON','MONGODB','REACT','MERN','C++','C','CUDA'];
        let strs = ['PHYSICS','MATH','PROGRAMMING'];
        const maxSpeed = 0.03;
        for(let i = 0 ; i < strs.length*10 ; ++i){
            let str = makeStr(strs[i%strs.length],blackMat);
            let grp = new THREE.Group();
            grp.add(str);
            grp.RP = {x:Math.random()-0.5,y:Math.random()-0.5,z:Math.random()-0.5};
            grp.RP.x*=maxSpeed;
            grp.RP.y*=maxSpeed;
            grp.RP.z*=maxSpeed;
            grp.updateAction = (mouse)=>{
                let page = mouse.fraction*(noSections-1);
                let sc;
                sc = 3-page*2;
                if(sc > 1)sc=1;
                if(sc<0){sc = 0;grp.visible=false;}
                else grp.visible=true;
                grp.scale.set(sc,sc,sc);
                grp.rotation.x += grp.RP.x;
                grp.rotation.y += grp.RP.y;
                // grp.rotation.z += grp.RP.z;
            }
            str.position.set(0.5,0,0);
            model.add(grp);
        }
    }
    model.updateAction=(mouse)=>{
        for(let i = 0 ; i < model.children.length ; ++i){
            if(model.children[i].updateAction!=undefined){
                model.children[i].updateAction(mouse);
            }
        }
    }
    return model;
}

export{AboutModel};