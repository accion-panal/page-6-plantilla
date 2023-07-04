import { servicesInformation } from '../Data/userId.js'

const loadInformation =()=>{

    /* LLENAR INFORMACION DE Cards*/
    let services = document.getElementById('service-info');
    if (services !== null) {
        services.innerHTML = `
        <div class="col-sm-6">
        <h3 class="mb-3">Nuestros servicios</h3>
        <h6><b>${servicesInformation.firstServicio}</b></h6>
        <h6><b>${servicesInformation.secondServicio}</b></h6>
      </div>
      <div class="col-sm-6">
        <h3 class="mb-5"></h3>
        <h6><b>${servicesInformation.thirthServicio}</b></h6>
        <h6><b>${servicesInformation.fourthServicio}</b></h6>
      </div>`;
    };

};
loadInformation();