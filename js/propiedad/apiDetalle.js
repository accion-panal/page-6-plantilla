import { getPropertiesForId } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

export default async function apiDetalleCall(id, statusId, companyId){
    let {data} = await getPropertiesForId(id, statusId, companyId );

const response = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

let indicator;
let img;


// console.log(id); // Imprimirá "134" si ese es el valor actual del parámetro "id"

// data.images.forEach((images, index) => {img +=
//     ` <div class="carousel-item ${ index == 0 ? "active" : ""} ">
//         <img src="${images != undefined && images != null && images != "" ? images : "/img/Sin.png"}" />
//      </div> 	
//     `
//     indicator += `
//     <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="${index}" ${index == 0 ? "class = active": ""} aria-current="true" aria-label="${index + 1}"></button>
//     `
//     })




// document.getElementById('container-carrucel-imgProps').innerHTML = 
// `
// <div
//           id="hero-carousel"
//           class="carousel slide"
//           data-bs-ride="carousel"
//           data-bs-interval="5000"
//           style="height: 80vh !important;"
//         >
//          </div>
            
//           <a
//             class="carousel-control-prev"
//             href="#hero-carousel"
//             role="button"
//             data-bs-slide="prev"
//           >
//             <span
//               class="carousel-control-prev-icon bi bi-chevron-left"
//               aria-hidden="true"
//             ></span>
//           </a>
//           <a
//             class="carousel-control-next"
//             href="#hero-carousel"
//             role="button"
//             data-bs-slide="next"
//           >
//             <span
//               class="carousel-control-next-icon bi bi-chevron-right"
//               aria-hidden="true"
//             ></span>
//           </a>
//         </div>
// `

document.getElementById('titleProp').innerHTML = 
`<span>${data.title}</span>
<small>${data.types} / ${data.operation}</small> `;

document.getElementById('extra-prop').innerHTML = 
`<h4>UF ${clpToUf(data.price, ufValueAsNumber)} / CLP ${parseToCLPCurrency(data?.price)}</h4>
<p>REF: ${data.id}</p>
<p>${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile</p> `;

document.getElementById('caracteristica-prop').innerHTML = 
`<h4>Caracteristicas</h4>
<ul>
  <li>
    <p>Habitaciones</p>
    <span>${data.bedrooms != null && data.bedrooms != undefined && data.bedrooms != "" ? data.bedrooms : "0"}</span>
  </li>
  <li>
    <p>Estacionamientos</p>
    <span>${data.coveredParkingLots != null && data.coveredParkingLots != undefined && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</span>
  </li>
  <li>
    <p>Baños</p>
    <span>${data.bathrooms != null && data.bathrooms != undefined && data.bathrooms != "" ? data.bathrooms : "0"}</span>
  </li>
  <li>
    <p>Superficie</p>
    <span>${data.surface_m2 != null && data.surface_m2 != undefined && data.surface_m2 != "" ? data.surface_m2 : "0"}m<sup>2</sup></span>
  </li>
</ul>`;

document.getElementById('descrip-prop').innerHTML = 
`<h4>Descripción</h4>
<p>
${data.description != null && data.description != undefined && data.description != "" ? data.description : "No registra descripción" }
</p> `;

}