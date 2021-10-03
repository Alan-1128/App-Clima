const body = document.body;

// API CLIMA
const obtenerClima = async (pais) => {

    let clima = `http://api.openweathermap.org/data/2.5/weather?q=${pais}&appid=79a638f512870e6aa979db58756e4a33`;

    try{

        const resp = await fetch( clima );

        if( !resp.ok ){
            return {temp_max: 0, 
                    temp_min: 0, 
                    temp: 0, 
                    name: 'IT WAS NOT FOUND', 
                    clima: '',
                    icono: 0};
        }else{
            const { main, name, weather } = await resp.json();
            return {temp_max: main.temp_max, 
                    temp_min: main.temp_min, 
                    temp: main.temp, 
                    name, 
                    clima: weather[0].description,
                    icono: weather[0].icon};
        }

    } catch (err) {
       throw err;
    }

}

// Crear barra de busqueda
const climaHtml = () => {

    const html = `
        <div class="principal">
            <div class="busqueda">
                <input type="text" class="buscar" placeholder="write your country or city" value="" >
            </div>
            <main class="main">
            </main> 
        </div>
    `;

    const divClima = document.createElement('div');
    divClima.innerHTML = html;
    body.append(divClima);
}

// Crear ficha del clima
const fichaClima = (parametro) => {

    const main = document.querySelector('.main');
    const hoy = new Date();

    // Limpiar HTML
    main.innerHTML = '';

    const fichaClima = `
        <div class="box">
            <div class="location-box">
                <div class="ciudad">${parametro.name}</div>
                <div class="fecha">${hoy.toDateString()}</div>
            </div>
            <div class="weather-box">
                <div class="temp">${Math.round(parametro.temp)}°C</div>
                <div class="temp-min">Minimum temperature: ${Math.round(parametro.temp_min)}°C</div>
                <div class="temp-max">Maximum temperature: ${Math.round(parametro.temp_max)}°C</div>
                <div><img src="http://openweathermap.org/img/wn/${parametro.icono}@2x.png" alt="clima" class="icono"></div>
                <div class="weather">${parametro.clima}</div>
            </div>
        </div>
    `
    const mainItem = document.createElement('div');
    mainItem.innerHTML = fichaClima;
    main.append(mainItem)

}

// -------------------------------------------------------- EVENTOS
const eventos = () => {

    const texto = document.querySelector('.buscar');

    texto.addEventListener( 'keydown', async (event) => {

        if( event.key === 'Enter' ){

            let valor = event.target.value;

            if( valor == '' ){
                console.log(':v');
            }else{
                fichaClima( await obtenerClima(valor) ); 
                
            }
            
        }
    })

}


climaHtml();
eventos();


