import * as gl from './globals.js';
let THREE = gl.THREE;

function Monitor(fontGeo){
    let monitor = new THREE.Group(fontGeo);
    //screen
    {
        const l = 2;
        const l2 = l*1.5;
        const w = 0.025;
        let g = new THREE.BoxGeometry(w,l,w);
        let g2 = new THREE.BoxGeometry(w,l2,w);
        let mesh = new THREE.Mesh(g,gl.whiteMat);
        monitor.add(mesh);
        mesh = new THREE.Mesh(g2,gl.whiteMat);
        mesh.rotation.z = Math.PI/2;
        mesh.position.set((l2-w)/2,(-l+w)/2,0);
        monitor.add(mesh);
        mesh = new THREE.Mesh(g2,gl.whiteMat);
        mesh.rotation.z = Math.PI/2;
        mesh.position.set((l2-w)/2,(+l-w)/2,0);
        monitor.add(mesh);
        mesh = new THREE.Mesh(g,gl.whiteMat);
        mesh.position.set(l2,0,0);
        monitor.add(mesh);
        //stand
        mesh = new THREE.Mesh(
            new THREE.BoxGeometry(12*w,l*0.55,3*w),
            [gl.whiteMat,gl.whiteMat,gl.blackMat,gl.blackMat,gl.greyMat,gl.greyMat]
        );
        mesh.position.set(l2/2,-l*0.55,-2*w);
        monitor.add(mesh);
        //screen
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(l2,l),gl.blackMat);
        mesh.position.set(l2/2,0,0);
        monitor.add(mesh);
        
        //A
        const keyNameScale = 0.05;
        const makeStr = (str,mat)=>{
            
            let string = new THREE.Group();
            for(let i = 0 ; i < str.length ; ++i){
                let code = str.charCodeAt(i);
                if(code<0 || code>=96){;continue;}
                let keyName = new THREE.Mesh(fontGeo[code],mat);
                keyName.scale.set(keyNameScale,keyNameScale,keyNameScale/20);
                keyName.position.set(i*(keyNameScale),0,0);
                string.add(keyName);
            }
            return string;
        }
        const str = [
            " [VERSION 10.0.19041.630]",
            " (C) 2020. ALL RIGHTS RESERVED.",
            " C:\\USERS\\ABHISHEKKHURANA> START TESTPROJECT",
            " HELLO WORLD !!!",
            "",
            "  /\\ /\\",
            " ((@V@))",
            " ():::()",
            "  VV-VV",
            "",
            " C:\\USERS\\ABHISHEKKHURANA>"
        ];
        const mats = [gl.whiteMat,gl.whiteMat,gl.whiteMat,gl.hlMat,gl.hlMat,gl.hlMat,gl.hlMat,gl.hlMat,gl.hlMat,gl.hlMat,gl.whiteMat];
        for(let i = 0 ; i < str.length ; ++i){
            let string = makeStr(str[i],mats[i]);
            string.position.set(0,-keyNameScale*i*2+0.05,0);
            monitor.add(string);
        }
        
    }
    return monitor;
}

export {Monitor};