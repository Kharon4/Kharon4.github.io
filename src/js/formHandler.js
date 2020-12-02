let form = document.getElementById("contactForm");


let fields = {
    stage1:document.getElementById("formStage1"),
    stage2:document.getElementById("formStage2"),
    stage3:document.getElementById("formStage3"),
    name:document.getElementById("nameField"),
    comments:document.getElementById("commentsField"),
    thnx:document.getElementById("thnxField"),
    bits:document.getElementById("bitsField"),
    krm:document.getElementById("krmField"),
    gbs:document.getElementById("gbsField"),
    fiitjee:document.getElementById("fiitjeeField"),
    other:document.getElementById("otherField")
};

let fieldSecs = [fields.stage1,fields.stage2,fields.stage3,fields.thnx];

let state = 0;

let data = {
    name:"",
    bits:false,
    fiitjee:false,
    krm:false,
    gbs:false,
    other:"",
    comments:""
}

function changeFormState(){
    for(let i = 0 ; i < 4; ++i){
        fieldSecs[i].style.display="none";
        fieldSecs[i].disabled = true;
    }
    if(state<3){
        fieldSecs[state].style.display="block";
        fieldSecs[state].disabled = false;
    }
    else {
        fieldSecs[3].style.display="block";
        let url = `https://docs.google.com/forms/d/e/1FAIpQLScnCgWhzznfVSQlm8d7BI2T5gdN6gy-JdhKnqm5eOXy-vrZGA/formResponse?usp=pp_url&entry.2005620554=`;
        url += encodeURI(data.name);
        if(data.bits){
            url += '&entry.1087145370=BITS';
        }
        if(data.fiitjee){
            url += '&entry.1087145370=FIITJEE';
        }
        if(data.krm){
            url += '&entry.1087145370=K.+R.+Mangalam';
        }
        if(data.gbs){
            url += '&entry.1087145370=Gyan+Bharti';
        }
        if(data.other!=''){
            url +=`&entry.1087145370=__other_option__&entry.1087145370.other_option_response=`;
            url += encodeURI(data.other);
        }
        url += `&entry.839337160=`;
        url += encodeURI(data.comments);
        url += '&submit=Submit'
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.send();

        if(data.name!=''){
            fields.thnx.innerText=`Thanks ${data.name}, I have recieved Ur msg and will get back to U asap.`
            ;
        }
    }
}

function getInput(){
    switch(state){
        case 0:
            data.name = fields.name.value;
            break;
        case 1:
            data.bits = fields.bits.checked;
            data.krm = fields.krm.checked;
            data.gbs = fields.gbs.checked;
            data.fiitjee = fields.fiitjee.checked;
            data.other = fields.other.value;
            break;
        case 2:
            data.comments = fields.comments.value;
            if(data.comments=='')state--;
    }
}

changeFormState();

function handleForm(event) { 
    if(event!=undefined)event.preventDefault();
    getInput();
    state++;
    changeFormState();
}

function backForm(){
    getInput();
    state--;
    changeFormState();
}

form.addEventListener('submit', handleForm);


const nextBtns = document.getElementsByClassName('formSbmt');
for(let i = 0 ; i < nextBtns.length; ++i)nextBtns[i].addEventListener('click',()=>{
    handleForm();
});

const backBtns = document.getElementsByClassName('formBack');
for(let i = 0 ; i < backBtns.length; ++i)backBtns[i].addEventListener('click',()=>{
    backForm();
});


wmsg=document.getElementById('warningMsg');
wmsg.style.display='none';
fields.comments.addEventListener('input', ()=>{
    if(fields.comments.value == ''){
        wmsg.style.display="block";
    }else{
        wmsg.style.display="none";
    }
});