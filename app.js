let Peliculas = async() =>{

    try {
        let respuesta = await fetch ('https://api.themoviedb.org/3/movie/popular?api_key=9ac2c80e38dd10e9c39b378f2a7eadbf&language=es-MX');

        console.log(respuesta);

        //Si respuesta existe
        if(respuesta.status === 200){
            let guardarPelis = await respuesta.json();

            let llamarPeliculas = '';
            guardarPelis.results.forEach(pelicula => {
                llamarPeliculas += `
                    <div class="poster_pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });
            document.getElementById('contenedor_pelis').innerHTML = llamarPeliculas;
        } else if(respuesta.status === 401){
            console.log('La llave de acceso no está permitida. Verifique e intente de nuevo')
        } else if(respuesta.status===404){
            console.log('No se ha encuentrado o no existe el título que buscas.')
        } else{
            'Huvo un error. Intente de nuevo más tarde.'
        }
    } catch(error){
        console.log("No se ha hallado la aplicación solicitada")
    }
}

Peliculas();


let Tendencias = async() => {
    try{
        let llamado = await fetch ('');
        console.log(llamado);

        if(llamado.status === 200){
            let guardarTrend = await respuesta.json();

            let llamarTendecias = '';
            guardarTrend.results.forEach(trending => {
                llamarTendecias += `
                
                `
            })
        }
    }
    catch(error){

    }
}