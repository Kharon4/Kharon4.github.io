const rate = 20;

let listnerEnable = true;

const scrollTo= (dest,up)=>{
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    if(up){
        window.scrollTo(0,scroll-rate);
        if(scroll-rate > dest){
            setTimeout(scrollTo,0,dest,up);
        }else{
            listnerEnable = true;
        }
    }else{
        window.scrollTo(0,scroll+rate);
        if(scroll+rate < dest){
            setTimeout(scrollTo,0,dest,up);
        }else{
            listnerEnable = true;
        }
    }
}

window.addEventListener("scroll", ()=>{
    if(listnerEnable){
        let scroll = document.documentElement.scrollTop || document.body.scrollTop;
        let page = scroll/(window.innerHeight);
        let diff = page - Math.round(page);
        if(diff > 0.15){
            listnerEnable = false;
            scrollTo((Math.round(page)+1)*window.innerHeight,false);
        }
        if(diff <-0.15){
            listnerEnable = false;
            scrollTo((Math.round(page)-1)*window.innerHeight,true);
        }
    }
    
});

const smoothLinks=[
    [document.getElementById('navAB'),0],
    [document.getElementById('navAbout'),1],
    [document.getElementById('navEdu'),2],
    [document.getElementById('navSkills'),3],
    [document.getElementById('navContact'),4]
];

for(let i = 0; i <smoothLinks.length; ++i){
    smoothLinks[i][0].addEventListener('click',()=>{
        listnerEnable=false;
        let to = smoothLinks[i][1]*window.innerHeight;
        let up = false;
        if(to < (document.documentElement.scrollTop || document.body.scrollTop))up=true;
        scrollTo(smoothLinks[i][1]*window.innerHeight,up);
    });
}