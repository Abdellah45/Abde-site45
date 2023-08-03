
 document.querySelectorAll(".search_btn").forEach((btn)=>{
  btn.addEventListener("click",()=>{
    if(window.innerWidth <= 767){
      btn.parentElement.classList.toggle("clicked");
      if(btn.children[0].classList.contains("fa-magnifying-glass")){
        btn.children[0].classList.add("fa-arrow-left");
        btn.children[0].classList.remove("fa-magnifying-glass");
      }else{
        btn.children[0].classList.remove("fa-arrow-left");
        btn.children[0].classList.add("fa-magnifying-glass");
      }
    }else{
      return 0
    }
  });
 });
 
setTimeout(()=>{
  document.querySelector(".loading span").remove();
  document.querySelector(".loading").remove();
  document.body.classList.remove("load");
},3000)



 function searchNote(text,parent){

  let Obj = JSON.parse(localStorage.getItem("dataObject"));
  let timesArr = [];
  let gereralInfo = [];
  let sortedDays = [];


  Object.keys(Obj[parent]).forEach((day)=>{

    let wholeString = "";
    let re = new RegExp(text,"ig");

    if (Obj[parent][day]["title"].match(re) !== null || Obj[parent][day]["text"].match(re) !== null){
      wholeString = `${Obj[parent][day]["title"]} ${Obj[parent][day]["text"]}`;
      timesArr.push(wholeString.match(re).length);
      gereralInfo.push({[day]:wholeString.match(re).length});
    }

  });

  if (timesArr.length !== 0){
    timesArr.sort((a,b)=> b - a).forEach(n => {

      gereralInfo.forEach(o=> {
        if (o[Object.keys(o)[0]] === n && sortedDays.includes(Object.keys(o)[0]) === false){
          sortedDays.push(Object.keys(o)[0]);
        }
      })

    })
    return sortedDays;
  }else{
    return false
  }

 }

 document.querySelectorAll(".search_box input").forEach(s=>{

  let Obj = JSON.parse(localStorage.getItem("dataObject"));


  s.oninput = function (){
    let searchOrdre = searchNote(s.value,s.dataset.target);


    if (s.value.length === 0){
      createDays();
      if (s.parentElement.parentElement.parentElement.querySelector(".ch_content").classList.contains("no_item_found")){
        s.parentElement.parentElement.parentElement.querySelector(".ch_content").classList.remove("no_item_found");
      }
    }else{


      s.parentElement.parentElement.parentElement.querySelector(".days_container").innerHTML = "";


      if (searchOrdre === false){
        s.parentElement.parentElement.parentElement.querySelector(".ch_content").classList.add("no_item_found");

      }
     if (searchOrdre !== false){
      searchOrdre.forEach((day) => {
        let dayDiv = document.createElement("div");
        let spanNum = document.createElement("span");
        let numText = day.length === 4 ? document.createTextNode(`0${day.substring(3,day.length)}`): document.createTextNode(day.substring(3,day.length));
        let spanTitle = document.createElement("span");
        let titleText = document.createTextNode(Obj[s.dataset.target][day]["title"]);
        let spanTitleBox = document.createElement("span");
        let spanTitleDate = document.createElement("span");
        let dateText = document.createTextNode(Obj[s.dataset.target][day]["date"]);
     
        dayDiv.classList.add("day");
        dayDiv.dataset.storageDay = day;
        dayDiv.dataset.storageCatey = s.dataset.target;
        spanNum.classList.add("numb");
        spanTitle.classList.add("title");
        spanTitleBox.classList.add("title_box");
        spanTitleDate.classList.add("write_date");
     
        spanNum.appendChild(numText);
        dayDiv.appendChild(spanNum);
        spanTitleBox.appendChild(titleText);
        spanTitle.appendChild(spanTitleBox);
        spanTitleDate.appendChild(dateText);
        spanTitle.appendChild(spanTitleDate);
        dayDiv.appendChild(spanTitle);
        
        s.parentElement.parentElement.parentElement.querySelector(".days_container").appendChild(dayDiv);
      })
     }


    }
    noteGenerate();
  }

 })


// start progress board

// let unice = Math.floor(((new Date).getTime() + 3600000) / 86400000);

const theSpan = document.querySelector(".done_btn");

document.querySelector(".done_btn").onclick = function (){
  this.classList.remove("done_btn");
  this.classList.add("done_btn_clicked");
  localStorage.setItem("miliSec",Math.floor(((new Date).getTime())/ 86400000) * 86400000);
  this.dataset.title = "Reset";
  defaultSett();
  reset();
}

function reset(){
  if (document.querySelector(".done_btn_clicked") !== null){
    document.querySelector(".done_btn_clicked").onclick = function (){
      this.classList.remove("done_btn_clicked");
      this.classList.add("done_btn");
      localStorage.removeItem("miliSec");
      window.location.reload();
    }
  }
}
if(localStorage.getItem("miliSec") !== null){
  theSpan.classList.remove("done_btn");
  theSpan.classList.add("done_btn_clicked");
  theSpan.dataset.title = "Reset";
}else{
  theSpan.dataset.title = "Start Challenge";
}
function autoProgress(num){
  let dif = ((new Date).getTime() - num) / 77760000;
  document.querySelector(".progress_box .fill").dataset.width = `${dif}`.substring(0,4) + "%";
  document.querySelector(".progress_baner").innerHTML = `${dif}`.substring(0,4) + "%";
  document.querySelector(".progress_box .fill").style.width = `${dif}%`;
  document.querySelector(".progress_board .p_content").dataset.day = `${Math.floor(((new Date).getTime() - num) / 86400000)} day`;
}
function defaultSett(){
  if (localStorage.getItem("miliSec") !== null && ((new Date).getTime() - parseInt(localStorage.getItem("miliSec"))) < 7776000000){
    let funInt =  setInterval(()=>{
      autoProgress(parseInt(localStorage.getItem("miliSec")));
    },1000);
  }if (parseInt(localStorage.getItem("miliSec")) >= 7776000000){
    document.querySelector(".progress_box .fill").dataset.width = "100%";
    document.querySelector(".progress_box .fill").style.width = "100%";
    document.querySelector(".progress_baner").innerHTML = "100%";
    document.querySelector(".progress_board .p_content").dataset.day = "90 day";
  }else{
    document.querySelector(".progress_box .fill").dataset.width = "0%";
    document.querySelector(".progress_box .fill").style.width = "0%";
    document.querySelector(".progress_baner").innerHTML = "0%";
    document.querySelector(".progress_board .p_content").dataset.day = "0 day";
  }
}
window.onload = function (){
  reset();
}


defaultSett();
let days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
document.querySelector(".date").innerHTML = `it's ${days[((new Date).getDay()) - 1]}, ${(new Date).getDate()} ${months[(new Date).getMonth()]}, ${(new Date).getFullYear()}`;

  
// end progress board




// start personal diary



function createDiaryInput(){
  let pop_upMain = document.createElement("div");
  pop_upMain.classList.add("pop_up_outline");
  let popupCreator = document.createElement("div");
  popupCreator.classList.add("the_diary_creator");
  let exitBtn = document.createElement("div");
  exitBtn.classList.add("exit");
  let closeIcon1 = document.createElement("i");
  closeIcon1.classList.add("far","fa-window-close");
  let closeIcon2 = document.createElement("i");
  closeIcon2.classList.add("fas","fa-window-close");
  let dayCont = document.createElement("div");
  dayCont.classList.add("day_container");
  let dayImage = document.createElement("div");
  dayImage.classList.add("image");
  let addImgBtn = document.createElement("div");
  addImgBtn.classList.add("add_img_btn");
  let addImgLabel = document.createElement("label");
  addImgLabel.setAttribute("for","add-img");
  let imgIcon1 = document.createElement("i");
  imgIcon1.classList.add("fa-solid","fa-image");
  let imgIcon2 = document.createElement("i");
  imgIcon2.classList.add("fa-regular","fa-image");
  let imgSpanEmpty = document.createElement("span");
  let imgSpanEmptyText = document.createTextNode("Add Image");
  imgSpanEmpty.classList.add("empty");
  let imgSpanAdded = document.createElement("span");
  let imgSpanAddedText = document.createTextNode("Image Added");
  imgSpanAdded.classList.add("added");
  let uploadInput = document.createElement("input");
  uploadInput.setAttribute("type","file");
  let contentCrea = document.createElement("div");
  contentCrea.classList.add("creao_content");
  let infoForm = document.createElement("form");
  infoForm.setAttribute("action","");
  let titleInput = document.createElement("input");
  titleInput.setAttribute("type","text");
  let textEra = document.createElement("textarea");
  textEra.setAttribute("placeholder","Your text");
  let submitBtn = document.createElement("input");
  submitBtn.setAttribute("type","submit");

   submitBtn.setAttribute("value","Done");
   textEra.setAttribute("cols","30");
   textEra.setAttribute("rows","10");
   textEra.setAttribute("required","");
   titleInput.setAttribute("placeholder","title");
   titleInput.setAttribute("required","");
   titleInput.setAttribute("id","diary_title");
   uploadInput.setAttribute("id","add-img");
   uploadInput.setAttribute("accept","image/*");

  document.querySelector(".diary_days").appendChild(pop_upMain);
  pop_upMain.appendChild(popupCreator);
  popupCreator.appendChild(exitBtn);
  popupCreator.appendChild(dayCont);
  exitBtn.appendChild(closeIcon1);
  exitBtn.appendChild(closeIcon2);
  dayCont.appendChild(dayImage);
  dayCont.appendChild(contentCrea);
  dayImage.appendChild(addImgBtn);
  addImgBtn.appendChild(addImgLabel);
  addImgBtn.appendChild(uploadInput);
  addImgLabel.appendChild(imgIcon1);
  addImgLabel.appendChild(imgIcon2);
  imgSpanEmpty.appendChild(imgSpanEmptyText);
  imgSpanAdded.appendChild(imgSpanAddedText);
  addImgLabel.appendChild(imgSpanEmpty);
  addImgLabel.appendChild(imgSpanAdded);
  contentCrea.appendChild(infoForm);
  infoForm.appendChild(titleInput);
  infoForm.appendChild(textEra);
  submitBtn.classList.add("done")
  infoForm.appendChild(submitBtn);
}




let mainDiaryObject = localStorage.getItem("dataObject") !== null ? JSON.parse(localStorage.getItem("dataObject")) :  {
  offChallenge:{},
  duringChallenge:{}
};



function checkItems (){
  if (document.querySelectorAll(".diary_days .ch_content .day").length === 0){
    document.querySelector(".diary_days .ch_content").classList.add("no_item");
  }else{
    if(document.querySelector(".diary_days .ch_content").classList.contains("no_item")){
      document.querySelector(".diary_days .ch_content").classList.remove("no_item");
    }
  }
  if (document.querySelectorAll(".master_challenge .ch_content .day").length === 0){
    document.querySelector(".master_challenge .ch_content").classList.add("no_item");
  }else{
    if(document.querySelector(".master_challenge .ch_content").classList.contains("no_item")){
      document.querySelector(".master_challenge .ch_content").classList.remove("no_item");
    }
  }
}



function dataSave(){
  if(localStorage.getItem("ver") === null || localStorage.getItem("pers") === "90"){
    mainDiaryObject["offChallenge"][`day${Object.keys(mainDiaryObject["offChallenge"]).length + 1}`] = {
      title: document.querySelector("#diary_title").value,
      text: document.querySelector("textarea").value,
      image: document.querySelector("#add-img").value.substring(12,document.querySelector("#add-img").value.length),
      date: `${(new Date).getDate()}/${(new Date).getMonth()+1}/${(new Date).getFullYear()}`
    }
  }else{
    mainDiaryObject["duringChallenge"][`day${Object.keys(mainDiaryObject["duringChallenge"]).length + 1}`] = {
      title: document.querySelector("#diary_title").value,
      text: document.querySelector("textarea").value,
      image: document.querySelector("#add-img").value.substring(12,document.querySelector("#add-img").value.length),
      date: `${(new Date).getDate()}/${(new Date).getMonth()+1}/${(new Date).getFullYear()}`
    };
    mainDiaryObject["offChallenge"][`day${Object.keys(mainDiaryObject["offChallenge"]).length + 1}`] = {
      title: document.querySelector("#diary_title").value,
      text: document.querySelector("textarea").value,
      image: document.querySelector("#add-img").value.substring(12,document.querySelector("#add-img").value.length),
      date: `${(new Date).getDate()}/${(new Date).getMonth()+1}/${(new Date).getFullYear()}`
    }
  }
  let localOne = JSON.stringify(mainDiaryObject);
  localStorage.setItem("dataObject",localOne);
}


function createDays(){
  let mainObj = JSON.parse(localStorage.getItem("dataObject"));
  let offCh = mainObj["offChallenge"];
  let duringCh = mainObj["duringChallenge"];
  let parentArr = [".diary_days .days_container",".master_challenge .days_container"];
  
  Object.keys(mainObj).forEach((catey,index)=>{


    document.querySelector(parentArr[index]).innerHTML = "";
    Object.keys(mainObj[catey]).forEach((day) => {
      let dayDiv = document.createElement("div");
      let spanNum = document.createElement("span");
      let numText = day.length === 4 ? document.createTextNode(`0${day.substring(3,day.length)}`): document.createTextNode(day.substring(3,day.length));
      let spanTitle = document.createElement("span");
      let titleText = document.createTextNode(mainObj[catey][day]["title"]);
      let spanTitleBox = document.createElement("span");
      let spanTitleDate = document.createElement("span");
      let dateText = document.createTextNode(mainObj[catey][day]["date"]);
   
      dayDiv.classList.add("day");
      dayDiv.dataset.storageDay = day;
      dayDiv.dataset.storageCatey = catey;
      spanNum.classList.add("numb");
      spanTitle.classList.add("title");
      spanTitleBox.classList.add("title_box");
      spanTitleDate.classList.add("write_date");
   
      spanNum.appendChild(numText);
      dayDiv.appendChild(spanNum);
      spanTitleBox.appendChild(titleText);
      spanTitle.appendChild(spanTitleBox);
      spanTitleDate.appendChild(dateText);
      spanTitle.appendChild(spanTitleDate);
      dayDiv.appendChild(spanTitle);
      
      document.querySelector(parentArr[index]).appendChild(dayDiv);
    })

  })


}

function noteGenerate(){

  let mainObje = JSON.parse(localStorage.getItem("dataObject"));


document.querySelectorAll(".day").forEach((day) => {

  day.addEventListener("click",()=>{

    let parentElement = document.querySelector(".challenge_days");
    let popUpDiv = document.createElement("div");
    let daysGroup = document.createElement("div");
    let exitBtn = document.createElement("div");
    let closeIcon1 = document.createElement("i");
    let closeIcon2 = document.createElement("i");
    let dayCont = document.createElement("div");
    let imgDiv = document.createElement("div");
    let img = document.createElement("img");
    let content = document.createElement("div");
    let spanTitle = document.createElement("span");
    let titleCont = document.createTextNode(mainObje[day.dataset.storageCatey][day.dataset.storageDay]["title"]);
    let paragraph = document.createElement("p");
    let paragraphCont = document.createTextNode(mainObje[day.dataset.storageCatey][day.dataset.storageDay]["text"]);

    popUpDiv.classList.add("pop_up_outline");
    daysGroup.classList.add("the_day_popup");
    exitBtn.classList.add("exit");
    closeIcon1.classList.add("far","fa-window-close");
    closeIcon2.classList.add("fas","fa-window-close");
    dayCont.classList.add("day_container");
    imgDiv.classList.add("image");
    if(mainObje[day.dataset.storageCatey][day.dataset.storageDay]["image"] === ""){
      dayCont.classList.add("no_image");
    }
    img.setAttribute("src",`images/${mainObje[day.dataset.storageCatey][day.dataset.storageDay]["image"]}`);
    content.classList.add("d_content");
    spanTitle.classList.add("title");
    paragraph.classList.add("text_day");
    paragraph.setAttribute("style","direction: rtl;");

    exitBtn.appendChild(closeIcon1);
    exitBtn.appendChild(closeIcon2);
    imgDiv.appendChild(img);
    spanTitle.appendChild(titleCont);
    content.appendChild(spanTitle);
    paragraph.appendChild(paragraphCont);
    content.appendChild(paragraph);
    dayCont.appendChild(imgDiv);
    dayCont.appendChild(content);
    daysGroup.appendChild(exitBtn);
    daysGroup.appendChild(dayCont);
    popUpDiv.appendChild(daysGroup);
    parentElement.appendChild(popUpDiv);

    document.querySelector(".challenge_days .exit").addEventListener("click", () => {
      document.querySelector(".challenge_days .pop_up_outline").remove();
    });

  });


});

}


if (localStorage.getItem("dataObject") !== null){
  createDays();
}

document.querySelector(".diary_days .add_btn").onclick = function (){

  createDiaryInput();

    document.querySelector(".the_diary_creator .exit").addEventListener("click", () => {
      document.querySelector(".diary_days .pop_up_outline").remove();
    });
    document.querySelector(".add_img_btn input").onchange = function() {
      if(this.value !== ""){
        this.previousElementSibling.querySelector(".empty").style.display = "none";
        this.previousElementSibling.querySelector(".added").style.display = "inline";
      }else{
        return 0
      }
    }
    document.querySelector(".diary_days .pop_up_outline .done").onclick = function () {
      dataSave();
      document.querySelector(".diary_days .pop_up_outline").remove();
      createDays();
      noteGenerate();
    }
}




noteGenerate();
 checkItems();

 function  update () {
   var a = document.createElement("a")
   a.href = URL.createObjectURL(
       new Blob([localStorage.getItem("dataObject")], {type:"application/json"})
   )
   a.download = "info.json"
   a.click();
   const myRE = new Request("info.json");
   fetch(myRE).then((response)=> response.json()).then((data) => {localStorage.setItem("dataObject",JSON.stringify(data))});
 }
