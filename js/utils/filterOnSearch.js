import { getPropertiesForCustomUrl } from "../services/PropertiesServices.js";
import { PropertyData,limitDataApi } from "../Data/userId.js"
import { getRegiones } from "../services/PropertiesServices.js";
import paginationCall from "../pagination.js";

import renderCall from "../propiedad/render.js";

//*Inicializar variables
const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
let operation;
let typeOfProperty;
let region;
let commune;
let bathrooms;
let bedrooms;
let covered_parking_lots;
let typePrice;
let minPrice;
let maxPrice;

//* Actualizar variables
//! Operacion
//!Tipo de operacion
document.getElementById('operationType').addEventListener('change' ,(element) => {
    operation =  element.target.value;
})

//!Tipo de propiedad
document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
    typeOfProperty =  element.target.value;
})

//! Region
document.getElementById("region").addEventListener( "change", (element) => {
    region = element.target.value;
    console.log('id region: ',region);
})

//! Comuna
document.getElementById("commune").addEventListener( "change", (element) => {
    commune = element.target.value;  
})

//! Habitaciones
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
    bedrooms =  element.target.value;
    console.log(bedrooms);      
})

//! Estacionamientos
document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    covered_parking_lots = element.target.value;  
})

//! Baños
document.getElementById("bathrooms").addEventListener( "change", (element) => {
    bathrooms= element.target.value; 
})

//! precio- UF or CLP
document.getElementById('exampleRadios1').addEventListener('change', saveTypePrice);
document.getElementById('exampleRadios2').addEventListener('change', saveTypePrice);
function saveTypePrice(event) {
    typePrice = event.target.value;
}
//! Precio Minimo
document.getElementById("min_price").addEventListener( "change", (element) => {
    // return element.target.value;
    minPrice = element.target.value;
})

//! Precio Maximo
document.getElementById("max_price").addEventListener( "change", (element) => {
    maxPrice= element.target.value;
})
 

//TODO: Al hacer click en buscar, Mostrara todos los valores guardados
document.getElementById('buscar2')?.addEventListener('click', async() => {
    console.log('=======================')
    console.log('FilterOnSearch')
    //* mostrar spinner loading
    document.getElementById("buscar2").innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;

    //todo: RESCATAR Y SEPARAR EL ID Y NAME DE REGION
    /* let idRegion = parseInt(region.match(/\d+/)[0]);
    console.log(idRegion); */
    let nameRegion;
    if(region !== undefined && region !== ''){nameRegion = region.replace(/\d+/, '').trim();}

    //* Validar Variables no sean undefined
    operation = (operation !== undefined && operation !== '') ? '&operationType=' + operation : '';
    typeOfProperty = (typeOfProperty !== undefined && typeOfProperty !== '') ? '&typeOfProperty=' + typeOfProperty : '';
    nameRegion = (nameRegion !== undefined && nameRegion !== '') ? '&region=' + nameRegion : '';
    commune = (commune !== undefined && commune !== '') ? '&commune=' + commune : '';
    bedrooms = (bedrooms !== undefined && bedrooms !== '') ? '&bedrooms=' + bedrooms : '';
    bathrooms = (bathrooms !== undefined && bathrooms !== '') ? '&bathrooms=' + bathrooms : '';
    covered_parking_lots = (covered_parking_lots !== undefined && covered_parking_lots !== '') ? '&covered_parking_lots=' + covered_parking_lots : '';
    minPrice = (minPrice !== undefined && minPrice !== '') ? '&min_price=' + minPrice : '';
    maxPrice = (maxPrice !== undefined && maxPrice !== '') ? '&max_price=' + maxPrice : '';

    //! TypePrice
    typePrice = (typePrice !== undefined && typePrice !== '') ? '&typePrice=' + typePrice : '';


    //* Mostrar variables en console log
    console.log('operation ',operation); //operacion - venta,arriendo,etc
    console.log('typeOfProperty ',typeOfProperty); //typeOfProperty
    console.log('region ',nameRegion); //typeOfProperty
    console.log('commune ',commune); //typeOfProperty
    console.log('bedrooms ',bedrooms); //bedrooms
    console.log('bathrooms ',bathrooms); //bedrooms
    console.log('covered_parking_lots',covered_parking_lots); //Estacionamientos
    console.log('typePrice ',typePrice); //tipo de price
    console.log('minPrice ',minPrice); //precio minimo
    console.log('maxPrice ',maxPrice); //precio maximo


    //* Generar url
    let urlFilters = operation+typeOfProperty+nameRegion+commune+bedrooms+bathrooms+covered_parking_lots+minPrice+maxPrice;
    console.log(urlFilters);
    //* Hacer peticion a la api     | el segundo digito es el limit
    let response = await getPropertiesForCustomUrl(1,limitDataApi.limit,CodigoUsuarioMaestro,1,companyId,realtorId,urlFilters);
    console.log(response);
    //* Guardar el response en el globalResponse
    localStorage.setItem('globalResponse', JSON.stringify(response));


    /* localStorage.removeItem('globalResponse'); */


    //* mostrar el global response EN CONSOLE.LOG();
    /* let storedGlobalResponse = localStorage.getItem('globalResponse');
    let globalResponse;
    if (storedGlobalResponse) {
        globalResponse = JSON.parse(storedGlobalResponse);
    }
    console.log('stored: ',globalResponse); */

    localStorage.setItem('countPage', JSON.stringify(1));
    renderCall();
    paginationCall();

    //* Quitar la concadenacion &operationType
    operation = operation.replace('&operationType=', '');
    typeOfProperty = typeOfProperty.replace('&typeOfProperty=', '');
    nameRegion = nameRegion.replace('&region=', '');
    commune = commune.replace('&commune=', '');
    bedrooms = bedrooms.replace('&bedrooms=', '');
    bathrooms = bathrooms.replace('&bathrooms=', '');
    covered_parking_lots = covered_parking_lots.replace('&covered_parking_lots=', '');
    minPrice = minPrice.replace('&min_price=', '');
    maxPrice = maxPrice.replace('&max_price=', '');

    //* quitar spinner loading
    document.getElementById("buscar2").innerHTML = `Buscar`;

});
