
const botonBuscarCarta = document.getElementById("enviar");
const inputCartaId = document.getElementById("cartaId");
    
    // 📌 Buscar los elementos DENTRO del card
    const card = document.getElementById("card");
    const imagen = document.getElementById("imagenCarta");
    const nombre = document.getElementById("nombre");
    const tipo = document.getElementById("tipo");
    const ataque = document.getElementById("ataque");
    const defensa = document.getElementById("defensa");

    const URL = "http://localhost:8080/cartas";

    document.getElementById("enviar").addEventListener('click',() =>{
   
        let id = inputCartaId.value;
        console.log("Carta ID:", id);


        fetch(`${URL}/${id}`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        .then((res) => {
            if (res.status === 404) throw new Error('Carta no encontrada');
            return res.json();
        })
        .then((carta) => {

            console.log(carta);

            card.style.display = "block";
            imagen.src = `http://localhost:8080${carta.imagenUrl}`; // le agrego el host;
            nombre.innerText = carta.nombreCarta;
            tipo.innerText = `Tipo: ${carta.tipoCarta}`;
            ataque.innerText = `ATK: ${carta.ataqueCarta}`;
            defensa.innerText = `DEF: ${carta.defensaCarta}`;
        })
        .catch((err) => {
            console.log("Error al leer carta", err);
            if (card) card.style.display = "none";
            alert("Error: " + err.message);
        });
    });


//******************************************************************************************************************************************** */

    const perso = document.getElementById("perso")
    const botonBuscarPersonaje = document.getElementById("enviar2");
    const inputPersonajeId = document.getElementById("personajeId");
    const imagenPersonaje = document.getElementById("imagenPersonaje");
    const nombrePersonaje = document.getElementById("nombrePersonaje");
    const edadPersonaje = document.getElementById("edadPersonaje");

    const URL2 = "http://localhost:8080/Personaje";

    document.getElementById("enviar2").addEventListener('click',() =>{
   
        let id = inputPersonajeId.value;
        console.log("Personaje ID:", id);


        fetch(`${URL2}/${id}`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        .then((res) => {
            if (res.status === 404) throw new Error('Personaje no encontrado');
            return res.json();
        })
        .then((personaje) => {

            console.log(personaje);

            perso.style.display = "block";
            imagenPersonaje.src = `http://localhost:8080${personaje.imagenPersonaje}`; // le agrego el host;
            nombrePersonaje.innerText = "Nombre: " + personaje.nombrePersonaje;
            edadPersonaje.innerText = `Edad: ${personaje.edadPersonaje}`;
        })
        .catch((err) => {
            console.log("Error al leer personaje", err);
            if (perso) perso.style.display = "none";
            alert("Error: " + err.message);
        });
    });


document.getElementById('verTodos').addEventListener('click', () => {
    fetch('http://localhost:8080/Personaje') // 📌 Endpoint sin ID
        .then(response => response.json())
        .then(personajes => {
            const contenedor = document.getElementById('todos');
            contenedor.innerHTML = ''; // Limpiar contenedor

            personajes.forEach(personaje => {
                contenedor.innerHTML += `
                    <div class="personaje">
                        <img src="http://localhost:8080${personaje.imagenPersonaje}" alt="${personaje.nombrePersonaje}">
                        <h3>${personaje.nombrePersonaje}</h3>
                        <p>Edad: ${personaje.edadPersonaje}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('personajeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 1. Crear el objeto personaje con los datos del formulario
    const personaje = {
        nombrePersonaje: document.getElementById('nombre').value,
        edadPersonaje: parseInt(document.getElementById('edad').value),
        imagenPersonaje: document.getElementById('imagen').value  // URL de la imagen
    };

    // 2. Hacer el fetch (MUY IMPORTANTE los headers)
    const response = await fetch('http://localhost:8080/Personaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // ← ¡Este header es crucial!
        },
        body: JSON.stringify(personaje)  // ← Convertir objeto a JSON
    });
    
    // 3. Manejar la respuesta
    if (response.ok) {
        const nuevoPersonaje = await response.json();
        console.log('Personaje creado:', nuevoPersonaje);
        alert('¡Personaje agregado exitosamente!');
        
        // Limpiar formulario
        document.getElementById('personajeForm').reset();
        
        // Recargar la lista de personajes
        cargarPersonajes();
    } else {
        alert('Error al agregar el personaje');
    }
});


