import { getPropertiesForId } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"



export default async function apiDetalleCall(id, statusId, companyId){
    let {data} = await getPropertiesForId(id, statusId, companyId );

const response = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
const ufValueAsNumber2 = parseInt(ufValue.replace('.', '').replace(',', '.'));


let indicator;
let img;


// console.log(id); // Imprimirá "134" si ese es el valor actual del parámetro "id"
data.images.forEach((images, index) => {img +=
    ` <li class="splide__slide" ${ index == 0 ? "active" : ""}" >
        <img src="${images.replace(/\\/g, "//") != undefined ? images.replace(/\\/g, "//")  : ''}" style="height:592px;width:98%;" />
      </li>
    `
    // indicator += `
    // <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="${index}" ${index == 0 ? "class = active": ""} aria-current="true" aria-label="${index + 1}"></button>
    // `
    })

document.getElementById('carusel-detail-prop').innerHTML = 
`
<li class="splide__slide">${img}</li>
`;

    var splide = new Splide( '.splide', {
      direction: 'ttb',
      autoplay: "play",
      height   : '32rem',
      type: 'loop',
      focus: 'center'
      
    } );
    
    splide.mount();


document.getElementById('data-realtor').innerHTML = `
<h4>${data.realtor.name} / ${data.realtor.lastName != null || data.realtor.lastName != undefined ? data.realtor.lastName : ''}</h4>
<p>
  <i class="icon-send"></i>
  <span style="color: #fff;">${data.realtor.mail != null ? data.realtor.mail : 'No cuenta con correo'}</span>
</p>
<p>
  <i class="icon-whatsapp"></i>
  <span style="color: #fff;">${data.realtor.contactPhone != null ? data.realtor.contactPhone : 'No cuenta con Número de celular'}</span>
</p>
`;


document.getElementById('titleProp').innerHTML = 
`<span>${data.title}</span>
<small>${data.types} / ${data.operation}</small> `;



if(data.currency.isoCode != 'CLP'){
  document.getElementById('extra-prop').innerHTML =
  `<h4 style="font-weight:700 !important">UF ${data.price} / CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}</h4>
  <p style="font-weight: 700 !important">REF: ${data.id}</p>
  <p>${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile</p> `;
}else {
  document.getElementById('extra-prop').innerHTML =
  `<h4 style="font-weight:700 !important">UF ${clpToUf(data.price, ufValueAsNumber)} / CLP ${parseToCLPCurrency(data?.price)}</h4>
  <p style="font-weight:700 !important >REF: ${data.id}</p>
  <p>${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile</p> `;
}


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
`<h4 style="font-weigth:700 !important>Descripción</h4>
<p>
${data.description != null && data.description != undefined && data.description != "" ? data.description : "No registra descripción" }
</p> `;

}
document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	splide.mount();
});

// apiDetalleCall();

