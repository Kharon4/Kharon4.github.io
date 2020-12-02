import {THREE,compCols,highLightCol,grey,whiteMat,blackMat,greyMat,hlMat,noSections} from './globals.js';


function EducationModel(fontGeo){
    let model = new THREE.Group();

    let wMatD = new THREE.MeshBasicMaterial({color:compCols[1]});
    let gMatD = new THREE.MeshBasicMaterial({color:grey});
    let hMatD = new THREE.MeshBasicMaterial({color:highLightCol});

    wMatD.side = THREE.DoubleSide;
    gMatD.side = THREE.DoubleSide;
    hMatD.side = THREE.DoubleSide;

    {//graduation cap
        let gCap = new THREE.Group();
        gCap.add(new THREE.Mesh(new THREE.BoxGeometry(0.5,0.01,0.5),wMatD));
        let mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,0.15,10,10),gMatD);
        mesh.position.y = -0.075;
        gCap.add(mesh);
        let height = 0.25*1.2;
        mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,height,8,8),hMatD);
        mesh.rotation.y = -Math.PI/4;
        mesh.rotation.z = Math.PI/2;
        mesh.position.set(-height/2,0.005,-height/2);
        gCap.add(mesh);
        mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,0.15,8,8),hMatD);
        mesh.position.set(-0.25,-0.075,-0.25);
        gCap.add(mesh);

        mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.02,0.05,8,8),wMatD);
        mesh.position.set(-0.25,-0.1,-0.25);
        gCap.add(mesh);

        model.add(gCap);
    }

    {//degree
        let deg = new THREE.Group();
        
        let mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.02,0.25,8,8),wMatD);
        mesh.rotation.x = Math.PI/2;
        mesh.position.set(0.4,-0.1,0.125);
        deg.add(mesh);

        mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.02,0.25,8,8),wMatD);
        mesh.rotation.x = -Math.PI/2;
        mesh.position.set(0.4,-0.1,-0.125);
        deg.add(mesh);

        mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.021,0.021,0.4,8,8),hMatD);
        mesh.rotation.x = -Math.PI/2;
        mesh.position.set(0.4,-0.1,0);
        deg.add(mesh);

        model.add(deg);
    }

    model.updateActionSec=()=>{
        model.rotation.y -= 0.01
    }

    model.sc = 1;

    return model;
}

export {EducationModel};