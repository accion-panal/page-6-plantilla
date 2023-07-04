import { ContactInformation } from "../Data/userId.js";

const loadInformation = () => {

    let footerAddress = document.getElementById('footer-address-ContactInfo');
    if (footerAddress !== null) {
        footerAddress.innerHTML = `
        <i class="icon-map-marker"></i>
        <span class="text">${ContactInformation.footerAddress}</span>`;
    }
    let footerPhone = document.getElementById('footer-phone-ContactInfo');
    if (footerPhone !== null) {
        footerPhone.innerHTML = `
        <i class="icon-phone"></i>
        <span class="text">${ContactInformation.footerPhone}</span>`;
    }

    let footerEmail = document.getElementById('footer-email-ContactInfo');
    if (footerEmail !== null) {
        footerEmail.innerHTML = `
        <i class="icon-message"></i>
        <span class="text">${ContactInformation.footerEmail}</span>`;
    }
 
    let address = document.getElementById('address-ContactInfo');
    if (address !== null) {
        address.innerHTML = `
        <p class="">
            <i class="fa fa-map-marker fa-lg  p-1"></i>
            ${ContactInformation.address}
        </p>`;
    }

    let phone = document.getElementById('phone-ContactInfo');
    if (phone !== null) {
        phone.innerHTML = `
        <p class="">
            <i class="fa fa-phone fa-lg  p-1"></i>
            ${ContactInformation.phone}
        </p>
            `;
    }

    let email = document.getElementById('email-ContactInfo');
    if (email !== null) {
        email.innerHTML = `
        <p class="">
            <i class="fa fa-envelope fa-lg  p-1"></i>
            ${ContactInformation.email}
        </p>
            `;
    }

    let horario = document.getElementById('horario-ContactInfo');
    if (horario !== null) {
        horario.innerHTML=
    `<p>
        ${ContactInformation.horario}
    </p>`
    }
}

loadInformation();