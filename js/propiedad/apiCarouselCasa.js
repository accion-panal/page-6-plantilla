import { getProperties } from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {clpToUf} from "../utils/getExchangeRate.js";


export default async function apiCall() {
const response = await getProperties(0, 1, 1);
const data = response.data;
// let filterCasa = data.filter(data => data.types != null && data.types  != false ? data.types : "No se encuentran Propiedades con esta categoria");

const response2 = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response2?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));


document.getElementById("total-prop").innerHTML = `<span>De 1 a ${response.meta.totalItems} propiedades encontradas</span> `;

// document.getElementById('typeProp').innerHTML =`<span>Propiedades</span> `

document.getElementById('container-propiedad-casa').innerHTML = data.map(data => 
      `<li class="splide__slide" style="width: 550px;">	  
            <div class="item" >
                <div class="card" style="width: 20rem; margin: 0px 10px 0px 10px;height:530px !important">
                    <span class="uf-item-price">${data.types} / ${data.operation} </span>
                    <img
                    class="card-img-top img-fluid "
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
        </li>` ).join('');

document.getElementById('container-propiedad-list').innerHTML = data.map(data => `
<li class="splide__slide" style="width: 550px;height:200px !important">	  
    <div class="item">
        <div class="card" style="width:100%;">
            <div class="row">
                <div class="col-sm-5">
                    <span class="uf-item-price" style="font-size: 12px;margin-right: 13px;">Casa / Arriendo</span>
                    <img
                    class="card-img-top img-fluid card-img"
                    src="./images/property/property-1.jpg"
                    alt="Card image cap"
                    style=" height: 100% !important;"
                    />
                </div>       
                <div class="col-sm-7">            
                    <div class="card-body text-left">
                        <h4 class="card-title " style="font-size: 18px;">
                        ${data.title}
                        </h4>
                        <small class="card-text-small"
                        >La Cruz, Valparaiso, Chile</small
                        >
                        <div class="info-property">
                        <span class="card-more-info">Habitaciones: 1</span>
                        <span class="card-more-info">Baños: 1</span>
                        </div>
                        <h3
                        class="card-title"
                        style="font-size: 20px; font-weight: 700"
                        >
                        UF 16.800
                        </h3>

                        <a href="detalle_propiedad.html" class="btn btn-dark"
                        >Ver más...</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>

`).join('');




    let splide = new Splide(".splide", {
        type: "loop",
        autoplay: "play",
        perPage: 3,
    });
    splide.mount();

    // let splideList = new Splide(".splide", {
    //     type: "loop",
    //     autoplay: "play",
    //     perPage: 3,

        
    // });
    // splideList.mount();



}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	// let splideList = new Splide(".splide");
	// splideList.mount();
	splide.mount();
});
// document.addEventListener("DOMContentLoaded", function () {
// 	let splideList = new Splide(".splideList");
// 	splideList.mount();
// });


apiCall();