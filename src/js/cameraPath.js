
let camPathL = [
    [-0.25,-0.25,1,0,0,0],
    [0.5,-1.6,1,0,0,0],
    [0.5,-4,1,0,0,0],
    [0,-6,1,0,0,0],
    [0,-8,1,0,0,0]
];

let camPathP = [
    [-0.25,-0.25,1,0,0,0],
    [0,-1.6,1,0,0,0],
    [1,-3.8,1,0,0,0],
    [-0.25,-6,1,0,0,0],
    [0,-8,1,0,0,0]
];

let camPath;

const correctPath=()=>{
    if(window.innerwidth>768){
        camPath=camPathL;
        console.log('L');
    }else{
        camPath=camPathP;
        console.log('p');
    }
}

correctPath();
window.addEventListener('resize',correctPath);

export  {camPath};