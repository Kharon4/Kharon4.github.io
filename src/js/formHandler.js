let form = document.getElementById("contactForm");


let fields = {
    name:document.getElementById("nameField"),
    stage2:document.getElementById("formStage2"),
    comments:document.getElementById("commentsField"),
    thnx:document.getElementById("thnxField"),
    bits:document.getElementById("bitsField"),
    krm:document.getElementById("krmField"),
    gbs:document.getElementById("gbsField"),
    fiitjee:document.getElementById("fiitjeeField"),
    other:document.getElementById("otherField")
};

let fieldSecs = [fields.name,fields.stage2,fields.comments,fields.thnx];

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
    else fieldSecs[3].style.display="block";
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
        case 2:
            data.comments = fields.comments.value;
    }
    console.log(state);
    console.log(data);
}

changeFormState();

function handleForm(event) { 
    event.preventDefault();
    getInput();
    console.log(state);
    state++;
    changeFormState();
}

form.addEventListener('submit', handleForm);
