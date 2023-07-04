import { AboutInformation } from "../Data/userId.js";

const loadInformation = () => {
    /* LLENAR INFORMACION DE MISION */
    /*  rescatar value por su id */
    let mision = document.getElementById('mision-info');
    if (mision !== null) {
        mision.innerHTML = `
        <h3>MISIÓN</h3>
        <p >
            ${AboutInformation.mision}
        </p>`;
    }

    /* LLENAR INFORMACION DE VISION */
    /*  rescatar value por su id */
    let vision = document.getElementById('vision-info');
    if (vision !== null) {
        vision.innerHTML = `
        <h3>VISIÓN</h3>
        <p >
            ${AboutInformation.vision}
        </p>
            `;
    }

    let nosotros = document.getElementById('nosotros-info');
    if (nosotros !== null) {
        nosotros.innerHTML = `<p>
        ${AboutInformation.nosotros}
        </p>
            `;
    }

}

loadInformation();