fetch("https://quran-endpoint.vercel.app/quran")
  .then((response) => response.json())
  .then((data) => {
    for (i = 0; i <= 114; i++) {
      let surah_english = data.data[i].asma.en.short;
      let surah_arabic = data.data[i].asma.ar.short;
      let surah_type = data.data[i].type.en;
      let surah_ayahs = data.data[i].ayahCount;
      let surah_number = data.data[i].number;
      let list = document.getElementById("list");
      let list_item = document.createElement("a")
      list_item.id = surah_number
      list_item.classList.add(`${surah_english}`)
        list_item.addEventListener('click', e => {
          play(e);
        });
      list_item.innerHTML = `
            <div id="${surah_number}" class="list_left">
              <div id="${surah_number}" class="number">
                <img id="${surah_number}" src="/icons/muslim (1) 1.svg" alt="">
                <h3 id="${surah_number}"">${surah_number}</h3>
              </div>
              <div class="surah_name">
                <h3 id="${surah_number}" class="surah_name_heading">${surah_english}</h3>
                <h3 id="${surah_number}" class="surah_name_detail">${surah_type} : ${surah_ayahs} Verses</h3>
              </div>
              </div>
                <div id="${surah_number}" class="list_right">
                  <h3 id="${surah_number}">${surah_arabic}</h3>
                </div>
            </div>`;

      list.append(list_item);
    }
  });

if (localStorage.getItem("new") == undefined) {
  document.getElementById("popup").classList.remove("hide");
  document.getElementById("home").classList.add("hide");
} else {
  document.getElementById("last_surah").innerText = localStorage.getItem('last_read')
  document.getElementById("last_ayat").innerText = localStorage.getItem('last_ayat')
    document.getElementById("name").innerText = localStorage.getItem('name')
    localStorage.setItem('imam',1)
  document.getElementById("home").classList.remove("fade");
  document.getElementById("home").classList.remove("hide");
}

function splashExit() {
  setTimeout(() => {
    var name = prompt("Enter Your Name")
    if(name !== null){

      localStorage.setItem('imam',1)
      localStorage.setItem("new", 1);
      document.getElementById("last_surah").innerText = localStorage.getItem('last_read')
      document.getElementById("popup").classList.add("fade");
      document.getElementById("popup").classList.add("hide");
      localStorage.setItem( 'name' , name)
      document.getElementById("name").innerText = name
      document.getElementById("home").classList.remove("hide");
      document.getElementById("home").classList.remove("fade");
    }
  }, 500);
}

var last_played = 'Al-Faatiha' ;
var last_played_id;

function play(e){
    last_played_id = e.target.id

    set_player()
}

function back(){
  is_playing = 0
  click = 0
  document.getElementById("namaz").classList.add("hide")
    document.getElementById("home").classList.remove("hide");
    document.getElementById("player").classList.add("hide");
    document.getElementById("banner").innerHTML = '<img src="/icons/Frame 33.png">'
    document.getElementById("ayat_list").innerHTML = ""
    document.getElementById("ayat_list").innerHTML = `<div class="full_surah">
    <div class="verse_list_top full">
        <h3>Full Surah</h3>
        <div class="verse_right">
            <audio id="playfull" src=""></audio>
<button id="full" class="btn" onclick='document.getElementById("playfull").play();autoplay(this)'><img class="play_btn" width="25px" src="/icons/Frame.svg"></button>
            <!-- <img src="/icons/Frame.svg"> -->
            <img src="/icons/Frame(1).svg">
        </div>
    </div>
    <br>
</div>`
document.getElementById("namaz_list").innerHTML = ""
}
let click = 0
function set_player(){
  if(click == 0 ){
    click = 1
    fetch(`https://quran-endpoint.vercel.app/quran/${last_played_id}`)
  .then((response) => response.json())
  .then((data) => {
    let surah_english = data.data.asma.en.short;
    last_played = surah_english
    localStorage.setItem('last_read',last_played)
    document.getElementById("last_surah").innerText = localStorage.getItem('last_read')
    let surah_meaning = data.data.asma.translation.en;
    let surah_type = data.data.type.en;
    let surah_ayahs = data.data.ayahCount;
    if(last_played.length !== 0){
      document.getElementById("home").classList.add("hide");
        document.getElementById("player").classList.remove("hide");
        let surah_data = document.createElement("div")
        surah_data.classList.add("player_banner_text")
        surah_data.innerHTML = `<h1>${surah_english}</h1>
        <p>${surah_meaning}</p>
        <div class="line"></div>
        <p>${surah_type} : ${surah_ayahs} Verses</p>
        <img src="/icons/Frame.png" alt="">`
        let banner = document.getElementById("banner")
        banner.append(surah_data)

        
          fetch(`https://quran-endpoint.vercel.app/quran/${last_played_id}?imamId=${localStorage.getItem('imam')}`)
  .then((response) => response.json())
  .then((e) =>{
    let full_surah = e.data.recitation.full
    let audio = document.getElementById("playfull")
    audio.src = full_surah
    for(a=0 ; a<=e.data.ayahs.length; a++){
      let url = e.data.ayahs[a].audio.url
      let ayat_ar = e.data.ayahs[a].text.ar
      let ayat_en = e.data.ayahs[a].translation.en
      let num = e.data.ayahs[a].number.insurah
    let new_ayat = document.createElement("div")
    new_ayat.classList.add("verse_list")
    let ayat_list = document.getElementById("ayat_list")
    new_ayat.innerHTML = `<div class="verse_list_top">
    <h3>${num}</h3>
    <div class="verse_right">
        <audio id="play${a}" src="${url}"></audio>
        <button id="${a + 1}" class="btn" onclick='autoplay(this,${a})'><img width="25px" id="${num}" class="play_btn" src="/icons/Group.png"></button>
        <button id="verse" onclick="copy(this)"><img width="25px" src="/icons/Frame(1).png"></button>
    </div>
</div>
<div class="verse_list_bottom">
    <p class="ar">${ayat_ar}</p>
    <p class="en">${ayat_en}</p>
</div>`
ayat_list.append(new_ayat)}
  })
        }
      })}
  }

  function show_sidebar(){
    document.getElementById("side_bar").classList.remove('hide')

    fetch('https://quran-endpoint.vercel.app/imam')
    .then((response) => response.json())
  .then((data) =>{
    for(i=0;i<=53;i++){
      let options = document.getElementById("imam")
      let new_option = document.createElement("option")
      new_option.value = data.data[i].id
      new_option.innerText = data.data[i].name

      if(new_option.innerText == "Abdurrahmaan As-Sudais"){
        new_option.selected
      }

      options.append(new_option)
    }
  })
  }

  function menu_exit(){
    document.getElementById("side_bar").classList.add('hide')
  }

  localStorage.setItem('last_read',last_played)
  localStorage.setItem('last_ayat', 1)

  var is_playing = 0 ;
  
  
  function autoplay(a,b){
    
    if(is_playing == 0){
      if(a.id == "full"){
        document.getElementById("playfull").play()
        let last_ayat = a.id
      localStorage.setItem('last_ayat',last_ayat)
      document.getElementById("last_ayat").innerHTML = localStorage.getItem('last_ayat')
      start(a)
      is_playing = 1
      }else{
        document.getElementById(`play${b}`).play();
        let last_ayat = a.id
        localStorage.setItem('last_ayat',last_ayat)
        document.getElementById("last_ayat").innerHTML = localStorage.getItem('last_ayat')
        start(a)
        is_playing = 1
      }
    }
    
  }

  function clear(){
    setTimeout(() => {
      console.clear();
    },1500)
  }

  function search(){
    let input = document.getElementById("input_element")
    if(input.classList[1] == "hide"){
      input.classList.remove("hide")
    }else{
      input.classList.add("hide")
    }
  }


  document.addEventListener('keydown', (e)=>{
    if(document.getElementById("input_element").classList[1] !== "hide" ){

      if(e.key == "Enter"){
      }else{
      }
    }
  })


  function filter(){
    let input = document.getElementById("input").value.toUpperCase()
    for (i=1;i<=114;i++){
      let name = document.getElementById(i).classList[0].toUpperCase()

      if(name.indexOf(input) == -1){
        document.getElementById(i).style.display = "none"
      }else{
        document.getElementById(i).style.display = ""
      }
      }
    }

    let my_audio = false;
    let last_img;
    function start(a){
      if(a.id == "full"){
        last_img = a.childNodes[0].src
        a.childNodes[0].src = "/icons/icons8-pause-30.png"
      }else{
        last_img = a.childNodes[0].src
        a.childNodes[0].src = "/icons/icons8-pause-30(1).png"
      }
      let b = a.childNodes[0]
      my_audio = a.previousElementSibling
      ended(b)
    }
    function ended(b){
      let img = b
      
      setTimeout(() => {
        if(my_audio.ended == true){
          if(img.id == "full"){
            console.log(img.id)
            img.src = last_img
            is_playing = 0
          }else{
            console.log(img.id)
            is_playing = 0
            img.src = last_img
          }
        }else{
          ended(img)
        }
      },1500)
    }












    function copy(a) {

      if(a.id == "full_surah"){
        navigator.clipboard.writeText("https://alsirajapp.netlify.app");
        alert("Copied To The ClipBoard")
      }else{
        let ar = a.previousElementSibling.parentNode.parentElement.nextElementSibling.children[0].innerText;

      let en = a.previousElementSibling.parentNode.parentElement.nextElementSibling.children[1].innerText;
        navigator.clipboard.writeText(ar+en);
        alert("Copied To The ClipBoard")
      }
    } 

    

function change_imam(){
  let id = document.getElementById("imam").value
  localStorage.setItem('imam',id)
}

function change_name(){
  let id = document.getElementById("input_name").value
  localStorage.setItem('name',id)
  document.getElementById("name").innerText = localStorage.getItem('name')
}

function clear_storage(){
  let a = prompt("This Will Clear Your Data Linked To This Website. Type Clear To Delete Your Data").toUpperCase()
  console.log(a)
  if(a == "CLEAR"){
    localStorage.clear()
    location.reload()
  }
}