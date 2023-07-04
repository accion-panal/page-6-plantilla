
import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

import { PropertyData, limitDataApi } from "../Data/userId.js";
import paginationCall from "../utils/pagination.js";
import apiCallMap from "../propiedad/apiMapProp.js";

export default async function renderCall() {
    //* INICIALIZACION DE VARIABLES
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let response;

    //* Rescatar datos del globalResponse
    //! si hay informacion, entra al if, de lo contrario al else
    let storedGlobalResponse = localStorage.getItem('globalResponse');
    if (storedGlobalResponse) {
        response = JSON.parse(storedGlobalResponse);
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        /* localStorage.setItem('countPage', JSON.stringify(1)); */
    }
    else {
        //* el segundo digito es el limit
        response = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
        //* Guardar el response en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));

        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        localStorage.setItem('countPage', JSON.stringify(1));
        paginationCall();
    }

    //! console log para saber el contenido del response despues del if

    //* Guardamos el data del response en una variable data
    let data = response.data;

    //* Cositas para el uf
    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));
    const ufValueAsNumber2 = parseInt(ufValue.replace('.', '').replace(',', '.'));

    //todo: Filtros Extras
    const filtroSelect = document.getElementById('FilterPrice');
    filtroSelect.addEventListener('change', handleFilterChange);
    function handleFilterChange() {
        //* Se rescata el value del select
        const selectedValue = filtroSelect.value;

        if (selectedValue === 'MayorMenor') {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => b.price - a.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        } else {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => a.price - b.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        }
        //* Se llama al showItems para actualizar las cards
        showItems();
    }

    //todo: LLamamos a la funcion que muestra las cards
    showItems();

    //todo: innerHTML de las propiedades encontradas
    document.getElementById("total-prop").innerHTML = `<span>De 1 a ${response.meta.totalItems} propiedades encontradas</span> `;

    //todo: creacion de la funcion ShowItems
    function showItems() {
        data = data.map(item => {
            // Reemplazar "\\" por "//" en la propiedad "image"
            item.image = item.image.replace(/\\/g, "//");
            return item;
        });
        //* si container-propiedad es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerGrid = document.getElementById('container-propiedad-grilla');
        if (containerGrid !== null) {
            document.getElementById("container-propiedad-grilla").innerHTML = data.map(data =>`
            <li class="splide__slide" >	  
            <div class="item" >
                <div class="card" style="width: 20rem; margin: 0px 10px 0px 10px;height:530px !important">
                    <span class="uf-item-price">${data.types} / ${data.operation} </span>
                        ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid card-img-top">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid card-img-top">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid card-img-top">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid card-img-top">`}
                    <div class="card-body">
                    <h3 class="card-title textLimitClass">
                        ${data.title} 
                    </h3>
                    <small class="card-text-small">${data.address != undefined && data.address != "" && data.address != null ? data.address : "No registra Dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra Comuna"}, Chile</small>
                    <div class="info-property">
                        <span class="card-more-info">Habitaciones:   ${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != null ? data.bedrooms : "0"}</span>
                        <span class="card-more-info">Baños:   ${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != null ? data.bathrooms : "0"}</span>
                        <span class="card-more-info">COD:   ${data.id}</span>
                    </div>
                    <h3 class="card-title" style="font-size: 28px; font-weight: 700">
                        ${data.currency.isoCode != 'CLP' ? `UF ${data.price} - CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}` : `UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}`}
                    </h3>

                    <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" class="btn btn-dark"
                        >Ver más...</a
                    >
                    </div>
                </div>
            </div>
        </li>`).join("");

        let splide = new Splide(".splide", {
            type: "loop",
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
        };

        document.addEventListener("DOMContentLoaded", function () {
            let splide = new Splide(".splide");
            splide.mount();
        });

        let containerCardMap = document.getElementById('container-propiedad-list');
        if (containerCardMap !== null) {
        document.getElementById('container-propiedad-list').innerHTML = data.map(data =>
                  `	<li class="splide__slide" style="width: 550px;height:200px !important">	  
                       <div class="item-list">
                           <div class="card" style="width:100%;">
                               <div class="row">
                                   <div class="col-sm-5">
                                       <span class="uf-item-price" style="font-size: 12px;margin-right: 13px;">${data.types} / ${data.operation}</span>
                                        ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid card-img-top card-img">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid card-img-top card-img">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid card-img-top card-img">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid card-img-top card-img">`}
                                   </div>       
                                   <div class="col-sm-7">            
                                       <div class="card-body text-left">
                                           <h4 class="card-title textLimitClass" style="font-size: 18px;">
                                           ${data.title}
                                           </h4>
                                           <small class="card-text-small textLimitDireccion"
                                           >${data.address != undefined && data.address != "" && data.address != null ? data.address : "No registra Dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra Comuna"}, Chile</small
                                           >
                                           <div class="info-property">
                                            <span class="card-more-info">Habitaciones: ${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != null ? data.bedrooms : "0"}</span>
                                            <span class="card-more-info">Baños: ${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != null ? data.bathrooms : "0"}</span>
                                            <span class="card-more-info">COD:   ${data.id}</span>                                         
                                           </div>
                                           <h3
                                           class="card-title"
                                           style="font-size: 20px; font-weight: 700"
                                           >
                                           ${data.currency.isoCode != 'CLP' ? `UF ${data.price} - CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}` : `UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}`}
                                           </h3>
                  
                                           <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" class="btn btn-dark"
                                           >Ver más...</a
                                           >
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </li>
              ` ).join("");
              let splide = new Splide(".splide", {
                type: "loop",
                autoplay: "play",
                perPage: 2,
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
        };
        document.addEventListener("DOMContentLoaded", function () {
            let splide = new Splide(".splide");
            splide.mount();
        });

        let containerMap = document.getElementById('div-map-section');
        if (containerMap !== null) {
            apiCallMap()
        };
    };
}
