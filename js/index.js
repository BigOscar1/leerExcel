//Variables Globales
const file = document.querySelector('#file');
let table_Excel = document.querySelector('#excel');
let titulos = document.querySelector('#titulos');
let datos = document.querySelector('tbody');
const filtrar = new Filtrar();

//Add EventListeners
cargarEventListeners();

function cargarEventListeners() {
    file.addEventListener('change', generarTabla);
}

//Funciones
function generarTabla(file) {
    let selectedFile = file.target.files[0];
    let reader = new FileReader();
    let titulo = '';
    let dato = '';
    let arrayTitulo = [];
    let arrayCategoria = []
   


    reader.onload = function (event) {
        let data = event.target.result;
        let workbook = XLSX.read(data, {
            type: 'binary'
        });

        workbook.SheetNames.forEach(function (sheetName) {
            let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

            filtrar.obtenerProductos(XL_row_object);


            // let json_object = JSON.stringify(XL_row_object); //Con esto lo transformamos en string
            let propiedades = Object.keys(XL_row_object[0]);
            propiedades.forEach(function (propiedad, index) {
                titulo += `
                    <th>${propiedad}</th>
                `
                arrayTitulo[index] = propiedad
            })
            XL_row_object.forEach(function (x, index) {
                dato += `
                <tr id="${index}">
                `
                arrayTitulo.forEach(function (e) {        //Aqui se acceden a las propiedades de cada objeto
                    dato += `
                            <td>${x[e]}</td>
                        `
                })
                dato += `
                    </tr>
                `    
            })
            titulos.innerHTML = titulo;
            datos.innerHTML = dato;
        })
    };

    reader.onerror = function (event) {
        console.error(`El archivo no puede ser Leido /// ${event.target.error.code}`)
    };

    reader.readAsBinaryString(selectedFile);
};
