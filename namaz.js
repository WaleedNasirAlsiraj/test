var logi,lati;
const d = new Date();
let month = d.getMonth();
let year = d.getFullYear();
let date = d.getDate() - 1;
let current_time_hour = d.getHours()
let current_time_min = d.getMinutes()


function namaz() {
  if (localStorage.getItem("logi")) {
    fetch(`https://api.aladhan.com/v1/calendar?latitude=${localStorage.getItem('lati')}&longitude=${localStorage.getItem('logi')}&method=2x&month=${month + 1 }&year=${year}`)
    .then(response => response.json())
    .then((data) => {
            let fajr = data.data[date].timings.Fajr
            let sunrise = data.data[date].timings.Sunrise
            let dhuhr = data.data[date].timings.Dhuhr
            let asr = data.data[date].timings.Asr
            let sunset = data.data[date].timings.Sunset
            let maghrib = data.data[date].timings.Maghrib
            let isha = data.data[date].timings.Isha

            let arr = [fajr,sunrise,dhuhr,asr,sunset,maghrib,isha]

            let arr_name = ["Fajr","Sunrise","Dhuhr","Asr","Sunset","Maghrib","Isha"]
            
            let list = document.getElementById("namaz_list")


            for(i=0;i<= 6;i++){
              let surrah_name = arr_name[i]
              let surrah_time = arr[i]
              let time = arr[i]
              time_sec = time.slice(2,11)
              time = time.slice(0,2)
              if(time > 12){
                surrah_time = "0" + time % 12 + time_sec 
              }
              let span = ""
               if(current_time_hour > time){
                  span = "&#10004;"

               }

              let element = document.createElement("div")

              element.classList.add("items")

              element.innerHTML = `<h2 class="namaz_name"><span class="span">${span}</span>${surrah_name}</h2>
              <h2 class="namaz_time">${surrah_time}</h2>`

              list.append(element)

            }



        
    })
  } else {
    alert(
      `Hey ${localStorage.getItem(
        "name"
      )}, We Need Your Permission To Access Your Location To Show You Data According To Your City`
    );
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
      back();
    }
  }
  document.getElementById("home").classList.add("hide");
    document.getElementById("namaz").classList.remove("hide");
}

var x = document.getElementById("demo");

function showPosition(position) {
    logi = position.coords.longitude
    lati = position.coords.latitude
    localStorage.setItem('logi',logi)
    localStorage.setItem('lati',lati)
    namaz()
}

// http://api.aladhan.com/v1/calendar?latitude=51.508515&longitude=74.2199&method=2&month=10&year=2022
