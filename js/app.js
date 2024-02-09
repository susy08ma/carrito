//Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritobtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')

let articulosCarrito = [];



cargarEventListener()

function cargarEventListener() {
    listaCursos.addEventListener('click', agregarCurso)
    
    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritobtn.addEventListener('click', () => {
        articulosCarrito = []
        limpiarHtml()
    })
} 

function agregarCurso(e) {
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCursos(cursoSeleccionado)
    }

}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHtml()
    }
}

//Lee el contenido del Html al que le dimos click y extrae la informacion del curso

function leerDatosCursos(curso){
    // console.log(curso)

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id) 
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++
                return curso //retrona el objeto actualizado
            }else {
                return curso //retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    // console.log(infoCurso)
    //Agregar elementos al carrito

    
    
    // console.log(contenedorCarrito)
    carritoHtml()
}

//Muestra el carrito de compras en el Html

function carritoHtml() {
   
   //Limpiar el Html
   limpiarHtml()
   


   //Recorre el carrito y genera el Html
    articulosCarrito.forEach((curso) => {

        const { imagen, titulo, precio, cantidad, id } = curso



        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>`

        //Agrega el Html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

//Elimina los cursos del tbody
function limpiarHtml() {
    contenedorCarrito.innerHTML = ''
}