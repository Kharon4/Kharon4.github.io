import {THREE,compCols,highLightCol,grey,whiteMat,blackMat,greyMat,hlMat,noSections} from './globals.js';


function SelectionBox(){
    let selectBox = new THREE.Group();
    {
        let lineMat = new THREE.LineDashedMaterial( {
            color: highLightCol,
            dashSize: 0.1,
            gapSize: 0.05
        } );
        const addF=(pts)=>{
            let lines = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(pts),
                lineMat
            );
            lines.computeLineDistances();
            selectBox.add(lines);
        }
        let points=[
            new THREE.Vector3( -0.5, -0.5, -0.5 ),
            new THREE.Vector3( 0.5, -0.5, -0.5 ),
            new THREE.Vector3( 0.5, 0.5, -0.5 ),
            new THREE.Vector3( -0.5, 0.5, -0.5 ),
            new THREE.Vector3( -0.5, -0.5, -0.5 )
        ];
        addF(points);
        points=[
            new THREE.Vector3( -0.5, -0.5, 0.5 ),
            new THREE.Vector3( 0.5, -0.5, 0.5 ),
            new THREE.Vector3( 0.5, 0.5, 0.5 ),
            new THREE.Vector3( -0.5, 0.5, 0.5 ),
            new THREE.Vector3( -0.5, -0.5, 0.5 )
        ];
        addF(points);
        points=[
            new THREE.Vector3( -0.5, -0.5, 0.5 ),
            new THREE.Vector3( -0.5, -0.5, -0.5)
        ];
        addF(points);
        points=[
            new THREE.Vector3( 0.5, -0.5, -0.5 ),
            new THREE.Vector3( 0.5, -0.5, 0.5 )
        ];
        addF(points);
        points=[
            new THREE.Vector3( 0.5, 0.5, -0.5 ),
            new THREE.Vector3( 0.5, 0.5, 0.5 )
        ];
        addF(points);
        points=[
            new THREE.Vector3( -0.5, 0.5, -0.5 ),
            new THREE.Vector3( -0.5, 0.5, 0.5 )
        ];
        addF(points);
        
    }
    selectBox.updateAction =()=>{
        selectBox.rotation.y += 0.01;
    }
    selectBox.scale.set(0.3,0.3,0.3);
    return selectBox;
}

export {SelectionBox};