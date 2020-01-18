const minTime = 7,
      maxTime = 19,
      body = document.getElementsByTagName('body')[0],
      switcher = document.querySelectorAll('input[name="switcher"]');

// Se captura el evento "change" del radio button
switcher.forEach((val) => {
    val.addEventListener('change', switchTheme)
})

// Actualizacion del theme según el valor del radio button
function switchTheme(e){
    switch(e.target.value) {
        case 'dark':
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('customTheme', 'dark');
            break;
        case 'light':
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('customTheme', 'light');
            break;
        default:
            body.setAttribute('data-theme', 'light');
            break;
    }
}

// Comprobación de la hora actual y actualización del theme
function checkTime() {
    let d = new Date(),
        time = d.getHours();
    
    if( time > minTime && time < maxTime ) {
        body.setAttribute('data-theme', 'light');
        document.getElementById('light').checked = true;
    } else {
        body.setAttribute('data-theme', 'dark');
        document.getElementById('dark').checked = true;
    }
}

// Si previamente se ha guardado algún valor en local storage, se carga dicho valor;
// en caso contrario, se comprueba la hora para actualizar el theme
function checkTheme() {
    let theme = localStorage.getItem('customTheme');
    if( theme && theme != '') {
        body.setAttribute('data-theme', theme); // esta línea puede comentarse y lanzarse justo al cargar el tag <body> (ver header.php lineas 24 a 34)
        document.getElementById(theme).checked = true;
    } else {
        checkTime();
    }
}

// Lanzar comprovaciones al cuando todo el DOM esté cargado 
// Puede provocar un poco de lag en la carga de estilos si se ejecuta la línea 47
// Si se comenta la línea 47, hay que efectuar la comprobación en header.php lienas 24 a 34
document.addEventListener('DOMContentLoaded', () => {
    checkTheme();
});

