let first = document.querySelector(".first");
let reco = document.querySelector(".reco");
let form = document.querySelector("form");
let second = document.querySelector(".second");
let msg = document.querySelector(".msg");
let cityName = "";
let temperatura = "";

let button1 = document.querySelector(".button1");
const apiKey = "02ea76e2b5d3b7c39478de078d480de4";

let reloj = "";
let hora = "";
let minutos = "";

let time = () => {
  reloj = new Date();
  hora = ("0" + reloj.getHours()).slice(-2);
  minutos = ("0" + reloj.getMinutes()).slice(-2);
};

let opciones = () => {
  switch (true) {
    case temperatura <= 0:
      reco.innerHTML =
        "Si estas en alguna zona polar esto es normal para vos, pero para el resto de los mortales esto es mucho frio. Cuidado, podes congelarte.";
      break;
    case temperatura > 0 && temperatura <= 8:
      reco.innerHTML =
        "Si sos de zonas templadas o calidas, abrigate, puede que la pases muy mal afuera. Si trabajas home office, sentite bendecido/a. Si estas acostumbrado a este frio, anda tranqui maquina. Hoy se come un buen guiso.";
      break;
    case temperatura > 8 && temperatura <= 14:
      reco.innerHTML =
        "Hoy podes salir tranqui. Esta fresco, si. Friolento? Friolenta? Abrigate, pero tampoco es para tanto. Es probable que para la tarde tengas que meterte la campera en donde no da el sol. Se procede con unas pastas o algo caliente, sin exagerar.";
      break;
    case temperatura > 14 && temperatura <= 20:
      reco.innerHTML =
        "Lindo dia para ir en el sol pero no en la sombra. Con abrigo pero tampoco para ponerte el ropero encima. Clima ideal para comer lo que quieras pero tampoco una sopa, no hace calor pero tampoco hace frio. Bah, al menos que seas de zonas frias, para ustedes hoy es un dia primaveral";
      break;
    case temperatura > 20 && temperatura <= 26:
      reco.innerHTML =
        "Para mi la mejor temperatura. Remera de dia, algun abrigo liviano de noche. Si es fin de semana, la vas a pasar muy bien. Si vivis en una region fria, debe ser verano extremo. Cualquier menu va con este tiempo, vale todo.";
      break;
    case temperatura > 26 && temperatura <= 32:
      reco.innerHTML =
        "Temperatura polemica. Hace calor. Muchos la disfrutan, otros la miran de reojo. Llevar ropa liviana, evitar tener algun abrigo pesado. La noche esta muy bien aunque puede costar para dormir. Si vas a cocinar algo, no prendas el horno. Si vivis en una zona calida, seguro estas acostumbrado, pero para los de zonas templadas/frias no es habitual.";
      break;
    case temperatura > 32:
      reco.innerHTML =
        "Team verano presente. En zonas frias, un infierno; zonas templadas, la pasas mal; zonas tropicales, lo normal. Se sobrevive con mucha agua y alimentos livianos. Ropa? No te podes arrancar la piel, asi que lleva lo menos posible. Y, sobre todas las cosas, NO SALGAS ENTRE LAS 12 Y LAS 16hs. Sé fuerte. Ojo las tormentas.";
      break;
    default:
      reco.innerHTML = "*Ingresa una ciudad valida, algo no esta funcionando.";
      break;
  }
};

let app = () => {
  cityName = document.getElementById("cityName").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=sp`;
  if (cityName != "") {
    time();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        temperatura = Math.round(data.main.temp);
        msg.innerHTML = "";
        first.style.display = "block";
        second.style.display = "block";
        opciones();
        console.log(data);
        first.innerHTML = `
        <div class="card-tiempo">
          <img src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" alt="icono del tiempo">
          <h3>${data.name}</h3>
          <span>${data.sys.country}</span>
          <span class='temperatura'>${temperatura}°</span>
          <p>La sensación es de ${Math.round(data.main.feels_like)}°</p>
          <p>${reloj.toLocaleString("es-AR", {
            weekday: "long",
          })}, ${hora}:${minutos}</p>
        </div>
      `;
        form.reset();
      })
      .catch((error) => {
        first.style.display = "none";
        second.style.display = "none";
        form.reset();
        msg.innerHTML = "Ingresá algo valido.";
        return Promise.reject(error);
      });
  } else {
    first.style.display = "none";
    second.style.display = "none";
    msg.innerHTML = "Este contenedor no puede estar vacio.";
  }
};

button1.addEventListener("click", (e) => {
  e.preventDefault();
  app();
});

// document.querySelector(".input").addEventListener("keyup", (e) => {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     app();
//   }
// });