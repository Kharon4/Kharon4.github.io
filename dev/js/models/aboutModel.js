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
        let mainGrp = new THREE.Group();
        let strs = ['PHYSICS','MATH','PROGRAMMING','ELECTRONICS','COMPUTERS'];
        const maxSpeed = 0.03;
        for(let i = 0 ; i < strs.length*6 ; ++i){
            let str = makeStr(strs[i%strs.length],hlMat);
            let grp = new THREE.Group();
            grp.add(str);
            grp.RP = {x:Math.random()-0.5,y:Math.random()-0.5,z:Math.random()-0.5};
            grp.RP.x*=maxSpeed;
            grp.RP.y*=maxSpeed;
            grp.RP.z*=maxSpeed;
            grp.updateAction = ()=>{
                grp.rotation.x += grp.RP.x;
                grp.rotation.y += grp.RP.y;
            }
            str.position.set(0.4,0,0);
            mainGrp.add(grp);
        }

        mainGrp.updateAction = (mouse)=>{
            let page = mouse.fraction*(noSections-1);
            let sc;
            sc = 3-page*2;
            if(sc > 1)sc=1;
            if(sc<0){sc = 0;mainGrp.visible=false;}
            else mainGrp.visible=true;
            mainGrp.scale.set(sc,sc,sc);
            for(let i = 0 ; i < mainGrp.children.length ; ++i){
                mainGrp.children[i].updateAction();
            }
        }
        model.add(mainGrp);
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