import * as THREE from './../three.module.js';

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

let textures = [
    new THREE.TextureLoader().load( './src/images/BITS.jpg' ),
    new THREE.TextureLoader().load( './src/images/KRM2.jpg' )
];



export {THREE,compCols,highLightCol,grey,whiteMat,blackMat,greyMat,hlMat,noSections,textures};