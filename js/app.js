// el HTML actual usa `.lenceria` como el botón tipo hamburguesa.
// Seleccionamos de forma robusta cualquiera de las dos clases.
const menu = document.querySelector('.hamburguesa, .lenceria');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
});

const eventos = () =>{
    console.log('Inicializando eventos de UI...');
    if (!menu) {
        console.warn('Botón de menú no encontrado (se buscó .hamburguesa o .lenceria). La navegación no se podrá abrir.');
        return;
    }
    // accesibilidad y estilo por si falta en CSS
    try{
        menu.setAttribute('role','button');
        menu.style.cursor = 'pointer';
    } catch(e){}
    console.log('Botón de menú encontrado:', menu);
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
    if (!navegacion){
        console.warn('Elemento .navegacion no encontrado en abrirMenu.');
        return;
    }
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    if (navegacion) {
        navegacion.appendChild(btnCerrar);
        cerrarMenu(btnCerrar,overlay);
    } else {
        // si por alguna razón no existe la navegación, eliminamos el overlay y el botón creado
        console.warn('Elemento .navegacion no encontrado. No se puede mostrar el menú.');
        overlay.remove();
        btnCerrar.remove();
    }
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    if (boton) {
        boton.addEventListener('click',()=>{
            if (navegacion) navegacion.classList.add('ocultar');
            overlay.remove();
            boton.remove();
        });
    }

    overlay.onclick = function(){
        overlay.remove();
        if (navegacion) navegacion.classList.add('ocultar');  
        if (boton) boton.remove();
    }
}

const platillos = () =>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);

    const ensaladas = platillosArreglo.filter(ensalada=> ensalada.getAttribute('data-prenda') === 'bombacha');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-prenda') === 'pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-prenda') === 'pizza');
    const postres = platillosArreglo.filter(postre=> postre.getAttribute('data-prenda') === 'postre');

    mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo);

}

const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) =>{
    btnEnsaladas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        ensaladas.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada));
    });

    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
         pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
    });

    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
    });
    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postre=> contenedorPlatillos.appendChild(postre));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}