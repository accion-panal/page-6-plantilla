import { getProperties } from "../services/PropertiesServices.js";
import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";

export default async function apiDestCall() {
let {data} = await getProperties(0,1,1);
let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );


const response2 = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response2?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

document.getElementById('carousel_').innerHTML = filtrado.map(data => 
    `				
    <li class="splide__slide" style="width: 550px">	  
    <div class="item" >
          <div class="card" style="width: 20rem; margin: 0px 10px 0px 10px">
              <span class="uf-item-price">${data.types} / ${data.operation} </span>
              <img
              class="card-img-top img-fluid card-img"
              src=" ${data.image}"
              alt="Card image cap"
              />
              <div class="card-body">
              <h3 class="card-title">
                  ${data.title} 
              </h3>
              <small class="card-text-small"
                  >${data.address != undefined && data.address != "" && data.address != null ? data.address : "No registra Dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra Comuna"}, Chile</small
              >
              <div class="info-property">
                  <span class="card-more-info">Habitaciones:   ${data.bedroom != undefined && data.bedroom != "" && data.bedroom != null ? data.bedroom : "0"}</span>
                  <span class="card-more-info">Baños:   ${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != null ? data.bathrooms : "0"}</span>
              </div>
              <h3
                  class="card-title"
                  style="font-size: 28px; font-weight: 700"
              >
                  UF ${clpToUf(data.price, ufValueAsNumber)}
              </h3>

              <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" class="btn btn-dark"
                  >Ver más...</a
              >
              </div>
          </div>
      </div>
   </li >`).join("");

	let splide = new Splide(".splide", {
		type: "loop",
		autoplay: "play",
		perPage: 3,
	});
    splide.mount();
}


document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	splide.mount();
});
apiDestCall();
