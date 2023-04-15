let Peliculas = async() =>{

    try {
        let obtencion = await fetch ('https://api.themoviedb.org/3/movie/popular?api_key=9ac2c80e38dd10e9c39b378f2a7eadbf&language=es-MX');

        console.log(obtencion);

        //Si obtencion existe
        if(obtencion.status === 200){
            let guardarPelis = await obtencion.json();
            const peliculaId =[];
            let llamarPeliculas = [];
            guardarPelis.results.forEach(pelicula => {
                llamarPeliculas += `
                    <div class="poster_pelicula">
                        <a href="https://www.themoviedb.org/movie/${pelicula.id}-${pelicula.original_title}"><img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3></a>
                    </div>
                `;
                var pelicula = pelicula.id
                peliculaId.push(pelicula);
                
            },
            );
            document.getElementById('contenedor_pelis').innerHTML = llamarPeliculas;

            let buscarPelicula = peliculaId.slice(0,5);
            let idBusqueda = buscarPelicula[0];


            let busqueda = await fetch (`https://api.themoviedb.org/3/movie/${idBusqueda}?api_key=9ac2c80e38dd10e9c39b378f2a7eadbf&language=es-MX`);
            let guardarPeli = await busqueda.json();
            var nombrePeli = guardarPeli.title;
            var nombreOriginal = guardarPeli.original_title;
            var posterPeli = guardarPeli.backdrop_path;
            console.log(nombrePeli);
            let obtenerDatos=`
                <div class="imagen-poster">
                    <a href="https://www.themoviedb.org/movie/${idBusqueda}-${nombreOriginal}"><img class="posterCentral" src="https://image.tmdb.org/t/p/w500/${posterPeli}">
                </div>
                <h3 guardarPeli="titulo">${nombrePeli}</h3></a>
                `;
            document.getElementById('poster-peli-1').innerHTML = obtenerDatos;

            var popular = guardarPeli.popularity;
            if(popular >= 100){
              popular = 101;
            }
            
            var calificacion = guardarPeli.vote_average*10;
            var voto = guardarPeli.popularity/guardarPeli.vote_count;
            if(voto >= 10){
              voto =101;
            }
            console.log(popular);
            console.log(calificacion);
            console.log(nombrePeli);
            const dato = [];
            dato.push(popular);
            dato.push(calificacion);
            dato.push(voto);
            
            console.log(dato);
            
            
            const imprimirGrafica = document.getElementById('insertargrafica_1');
            const numeros = {
              labels: ['Popular', 
              'Calificación de la crítica',
              'Calificación del público'],
              datasets: [
                {
                  label: `${nombrePeli}`,
                  data: dato,
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgb(255, 99, 132)',
                  pointBackgroundColor: 'rgb(255, 99, 132)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgb(255, 99, 132)'
                },
              ]
              };

            const config = {
              type: 'radar',
              data: numeros,
              options: {
                elements: {
                  line: {
                    borderWidth: 2
                  } 
                },
                r: {
                  angleLines: {
                      display: true   
                  },
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 20
                  }
              }
              }
            };    
            new Chart(imprimirGrafica, config);


            let datos =`
            <div id="numeros_grafica">
              <p>${nombrePeli} ha sido reproducida: ${guardarPeli.popularity}</p>
              <p>${nombrePeli} fue calificada por la crítica con un ${guardarPeli.vote_average}</p>
              <p>${nombrePeli} fue calificada por ${guardarPeli.vote_count} usuarios</p>
            </div>  
            `;
            document.getElementById('datos_grafica').innerHTML = datos;


        } else if(obtencion.status === 401){
            console.log('La llave de acceso no está permitida. Verifique e intente de nuevo');
        } else if(obtencion.status===404){
            console.log('No se encuentra o no existe el título que buscas.');
        } else{
            console.log('Huvo un error. Intente de nuevo más tarde.');
        }
    } catch(error){
        console.log("No se ha hallado la aplicación solicitada")
    }
}

Peliculas();