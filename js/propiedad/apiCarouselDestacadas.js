import { getProperties } from "../services/PropertiesServices.js";
import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";

import { PropertyData } from "../Data/userId.js";

export default async function apiDestCall() {
const {companyId, CodigoUsuarioMaestro, realtorId} = PropertyData;
let {data} = await getProperties(1,10,CodigoUsuarioMaestro,companyId,1,realtorId);
let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );



const response2 = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response2?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
const ufValueAsNumber2 = parseInt(ufValue.replace('.', '').replace(',', '.'));

data = data.map(item => {
    // Reemplazar "\\" por "//" en la propiedad "image"
    item.image = item.image.replace(/\\/g, "//");
    return item;
});
document.getElementById('carousel_').innerHTML = filtrado.map(data => 
    `<li class="splide__slide" style="width: 550px">	  
    <div class="item" style="display:flex;justify-content:center">
          <div class="card" style="width: 20rem; margin: 0px 10px 0px 10px">
              <span class="uf-item-price">${data.types} / ${data.operation} </span>
              ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-prop-map">`}
              <div class="card-body">
              <h3 class="card-title textLimitClass">
                  ${data.title} 
              </h3>
              <small class="card-text-small textLimitDireccion"
                  >${data.address != undefined && data.address != "" && data.address != null ? data.address : "No registra Dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra Comuna"}, Chile</small
              >
              <div class="info-property">
                  <span class="card-more-info">Habitaciones:   ${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != null ? data.bedrooms : "0"}</span>
                  <span class="card-more-info">Baños:   ${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != null ? data.bathrooms : "0"}</span>
              </div>
              <h3
                  class="card-title"
                  style="font-size: 28px; font-weight: 700"
              >
                ${data.currency.isoCode != 'CLP' ? `UF ${data.price} - CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}` : `UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}`}

              </h3>

              <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" class="btn btn-dark"
                  >Ver más...</a
              >
              </div>
          </div>
      </div>
   </li >`).join("");

	let splide = new Splide(".splide", {
		autoplay: "play",
		perPage: 3,
        breakpoints: {
            1399: {
              perPage: 2,
            },
            991: {
              perPage: 1,
            }
          }
	});
    splide.mount();
}


document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	splide.mount();
});
apiDestCall();
