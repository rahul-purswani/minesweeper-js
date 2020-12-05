var x=0;
const table = document.querySelector(".table");
let gameplay = true;
let flag_count = 0;
document.getElementById("current").innerHTML = 20;

grid_creator();
bomb_set();
num_set();

function num_set(){
    for(let m=0; m<120; m++){
        if(!document.getElementById(m).classList.contains("bomb")){
            let bom_num = bom_cal(m);
            document.getElementById(m).value = bom_num;
        }
    }
}


function bomb_set(){
    for(var i=0; i<20; i++){
        do{
            x = Math.floor(Math.random() * 120);
        }
        while((document.getElementById(x).classList.contains("bomb")));
        document.getElementById(x).classList.add("bomb");
    }
}

function grid_creator(){    
    for(let i = 0; i<120; i++){
        const sq = document.createElement("div");
        sq.setAttribute("id", i);
        sq.setAttribute("class", "box");
        sq.setAttribute("onmousedown", "start(event,this.id)");
        table.appendChild(sq);
    }
}

function flag(id){
    if(document.getElementById(id).classList.contains("flag")){
        document.getElementById(id).classList.remove("flag");
        flag_count--;
        document.getElementById("current").innerHTML = 20-flag_count;
    }
    else{
        if(flag_count<20){
            document.getElementById(id).classList.add("flag");
            flag_count++;
            document.getElementById("current").innerHTML = 20-flag_count;
            winner();
        }
        else{
            alert("No Flags left to be Placed");
        }
    }
}

function winner(){
    let win_count=0;
    for(let i =0; i<120; i++){
        if(document.getElementById(i).classList.contains("bomb")){
            if(document.getElementById(i).classList.contains("flag")){
                win_count++;
            }
        }
    }
    if(win_count==20){
        alert("Congratulations! You won the Game.")
        setTimeout(function(){location.reload()}, 1000);
    }
}

function display_bombs(){
    for(let i =0; i<120; i++){
        if(document.getElementById(i).classList.contains("bomb")){
            document.getElementById(i).classList.add("bomb_show");
            document.getElementById(i).classList.remove("flag");
        }
    }
}
function start(event,id){
    if(gameplay==true){
        if(parseInt(event.button)==0){
            if(!document.getElementById(id).classList.contains("flag")){
                play(id);
            }
            else{
                alert("You have placed a flag in the selected block. ");
            }
        }
        if(parseInt(event.button)==1){
            if(!document.getElementById(id).classList.contains("number")){
                flag(id);
            }
            else{
                alert("Invalid Move!")
            } 
        }
    }
}
function play(id){
    if(document.getElementById(id).classList.contains("bomb")){
        document.getElementById(id).classList.add("bomb_show");
        display_bombs();
        gameplay= false;
        alert("You lost! Please reload the page to start a new Game.");        
    }
    else{
        document.getElementById(id).classList.add("number");
        let val = document.getElementById(id).value;
        document.getElementById(id).innerHTML = val;
        if(val == 1){
            document.getElementById(id).style.color = "blue";
        }
        if(val == 2){
            document.getElementById(id).style.color = "red";
        }
        if(val == 3){
            document.getElementById(id).style.color = "green";
        }
        if(val == 4){
            document.getElementById(id).style.color = "purple";
        }
        recur_play(id);
    }
}

function recur_play(id){
    const leftEdge = (id % 12 == 0);
    const rightEdge= (id % 12 == 11);
    let val = document.getElementById(id).value;
    if (val==null){
               if(!leftEdge && !document.getElementById(parseInt(id)-1).classList.contains("number") && !document.getElementById(parseInt(id)-1).classList.contains("flag")){
                   new_id= parseInt(id)-1;
                   play(new_id);
               }
               if(!rightEdge && !document.getElementById(parseInt(id)+1).classList.contains("number") && !document.getElementById(parseInt(id)+1).classList.contains("flag")){
                   new_id= parseInt(id)+1;
                   play(new_id);
               }
               if(id>11 && !document.getElementById(parseInt(id)-12).classList.contains("number") && !document.getElementById(parseInt(id)-12).classList.contains("flag")){
                   new_id= parseInt(id)-12;
                   play(new_id);
               }
               if(id<108 && !document.getElementById(parseInt(id)+12).classList.contains("number") && !document.getElementById(parseInt(id)+12).classList.contains("flag")){
                   new_id= parseInt(id)+12;
                   play(new_id);
               }
               if(!leftEdge && id>11 && !document.getElementById(parseInt(id)-13).classList.contains("number") && !document.getElementById(parseInt(id)-13).classList.contains("flag")){
                   new_id= parseInt(id)-13;
                   play(new_id);
               }
               if(!rightEdge && id>11 && !document.getElementById(parseInt(id)-11).classList.contains("number") && !document.getElementById(parseInt(id)-11).classList.contains("flag")){
                   new_id= parseInt(id)-11;
                   play(new_id);
               }
               if(!leftEdge && id<108 && !document.getElementById(parseInt(id)+11).classList.contains("number") && !document.getElementById(parseInt(id)+11).classList.contains("flag")){
                   new_id= parseInt(id)+11;
                   play(new_id);
               }
               if(!rightEdge && id<108 && !document.getElementById(parseInt(id)+13).classList.contains("number") && !document.getElementById(parseInt(id)+13).classList.contains("flag")){
                   new_id= parseInt(id)+13;
                   play(new_id);
               }
    }
}

function bom_cal(id){
   let count = 0;
    let leftEdge = (id % 12 == 0);
    let rightEdge= (id % 12 == 11);

    if(!leftEdge && document.getElementById(id-1).classList.contains("bomb")){
        count++;
    }
    if(!rightEdge && document.getElementById(id+1).classList.contains("bomb")){
        count++;
    }
    if(id>11 && document.getElementById(id-12).classList.contains("bomb")){
        count++;
    }
    if(id<108 && document.getElementById(id+12).classList.contains("bomb")){
        count++;
    }
    if(!leftEdge && id>11 && document.getElementById(id-13).classList.contains("bomb")){
        count++;
    }
    if(!rightEdge && id>11 && document.getElementById(id-11).classList.contains("bomb")){
        count++;
    }
    if(!leftEdge && id<108 && document.getElementById(id+11).classList.contains("bomb")){
        count++;
    }
    if(!rightEdge && id<108 && document.getElementById(id+13).classList.contains("bomb")){
        count++;
    }
    if(count==0){
        return null;
    }
    else{
        return count;
    }
}