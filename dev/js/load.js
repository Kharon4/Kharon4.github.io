const loadBar = document.getElementById('loadingBar');
const loadTitle = document.getElementById('loadingTitle');

const totalItems = 99;

let currentItems = 0;

const update = ()=>{
    currentItems++;
    loadBar.style.width = `${currentItems*100/totalItems}%`;
    if(currentItems==totalItems){
        document.getElementById('loading').style.display='none';
        document.getElementById('websiteContent').style.display='block';
    }
}

const load=(func,title)=>{
    loadTitle.innerText = title;
    let newFunc = ()=>{
        if(func!=undefined)func();
        update();
    };
    requestAnimationFrame(newFunc);
};

export {load};