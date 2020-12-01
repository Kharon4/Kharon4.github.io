import {THREE,compCols,highLightCol,grey,whiteMat,blackMat,greyMat,hlMat,noSections} from './globals.js';


function ContactModel(fontGeo){
    let model = new THREE.Group();
    {
        

        let pts = [
            [-0.5,0.25,0],
            [-0.5,-0.25,0],
            [0.5,-0.25,0],
            [0.5,0.25,0],
            [0,0,0],
            [-0.5,0.25,0],
            [0.5,0.25,0]
        ];
        let points = [];
        for(let i = 0 ; i <pts.length ; ++i){
            points.push(new THREE.Vector3(pts[i][0],pts[i][1],pts[i][2]));
        }

        let line = (new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial( { color: highLightCol, linewidth: 1 } )
        ));
        
        model.add(line);
        
        const lm = [
            new THREE.LineBasicMaterial( { color: highLightCol, linewidth: 1 } ),
            new THREE.LineBasicMaterial( { color: compCols[1], linewidth: 1 } ),
            new THREE.LineBasicMaterial( { color: highLightCol, linewidth: 1 } ),
            new THREE.LineBasicMaterial( { color: grey, linewidth: 1 } )
        ]
        
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,0,-0.2)
        ]);

        for(let i = 0 ; i < pts.length-1; ++i){
            let dx = pts[i][0] - pts[i+1][0];
            let dy = pts[i][1] - pts[i+1][1];
            let dz = pts[i][2] - pts[i+1][2];
            let len = Math.sqrt(dx*dx+dy*dy+dz*dz);
            let no = Math.trunc(len * 500);
            for(let j = 0 ; j < no ; ++j){
                let fraction = j/(no-1.0);
                let col = 1;//Math.trunc(Math.random()+0.99);
                if(i<pts.length-2 && i> pts.length-5)col+=-1;
                let ln = new THREE.Line(lineGeo,lm[col]);
                
                let pObj = new THREE.Group();
                pObj.position.set(
                    pts[i][0]*(1.0-fraction) + pts[i+1][0]*fraction,
                    pts[i][1]*(1.0-fraction) + pts[i+1][1]*fraction,
                    pts[i][2]*(1.0-fraction) + pts[i+1][2]*fraction
                );
                
                pObj.add(ln);
                
                ln.position.z -=0.8;
                
                pObj.sspeed = Math.random()/50;
                pObj.sc = 0;
                pObj.scale.z=0;
                pObj.updateAction = (mouse)=>{
                    pObj.sc += pObj.sspeed;
                    if(pObj.sc > 3)pObj.sc=0;
                    let page = mouse.fraction * (noSections-1);
                    let scF = 2*page-7;
                    if(page < 3.5)scF = 0;
                    if(page > 4)scF = 1;
                     
                    pObj.scale.z = pObj.sc *scF;
                }
                model.add(pObj);
            }
        }
    }

    model.updateAction= (mouse)=>{
        for(let i = 0 ; i < model.children.length;++i){
            if(model.children[i].updateAction != undefined){
                model.children[i].updateAction(mouse);
            }
        }
    }
    return model;
}

export {ContactModel};