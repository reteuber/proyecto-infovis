const SVG4 = d3.select("#vis-4").append("svg");
const SVG6 = d3.select("#vis-6").append("svg");

const DATOS2 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/educacion_superior.json"

// Descripción   -----------------------------------------------------------------------------------

const WIDTH_VIS_4 = 1280;
const HEIGHT_VIS_4 = 200;
SVG4.attr("width", WIDTH_VIS_4).attr("height", HEIGHT_VIS_4);

// ----------------------------------  VISUALIZACIÓN 2  --------------------------------------------
const WIDTH_VIS_5 = 800;
const HEIGHT_VIS_5 = 500;
const SVG5 = d3.select("#vis-5").append("svg");
SVG5.attr("width", WIDTH_VIS_5).attr("height", HEIGHT_VIS_5);

StemChile();

function StemChile() {
    d3.json(DATOS2).then(data => {
        console.log(data);

        // Datos para los niveles y colores
        const niveles = ["Pregrado", "Magister", "Doctorado"];
        const color = "#c9c9c9"; // Color crema oscuro
        const barraColor = "rgba(201, 201, 201, 0.5)"; // Color de las barras laterales con menor opacidad

        // Configuración de hexágono
        const radio = 50;
        const hexagono = [
            [0, -1 * radio],
            [Math.sqrt(3) / 2 * radio, -0.5 * radio],
            [Math.sqrt(3) / 2 * radio, 0.5 * radio],
            [0, 1 * radio],
            [-Math.sqrt(3) / 2 * radio, 0.5 * radio],
            [-Math.sqrt(3) / 2 * radio, -0.5 * radio],
        ];

        // Añadir un atributo de radio a cada punto del hexágono para redondear las esquinas
        const hexagonoRedondeado = hexagono.map(point => [point[0], point[1], radio]);

        // Posicionamiento de la columna de hexágonos
        const columnaX = WIDTH_VIS_5 / 2;
        const columnaY = HEIGHT_VIS_5 / 4;



        // Crear las barras laterales (rectángulos) hacia la izquierda y derecha
        const barraWidth = 300;
        const barraAltura = 50;

        SVG5.selectAll("rect.barraIzquierda")
            .data(niveles)
            .enter()
            .append("rect")
            .attr("class", "barraIzquierda") // Clase para seleccionar fácilmente las barras izquierdas más adelante
            .attr("x", (d, i) => columnaX - barraWidth / 2 - radio - 100)
            .attr("y", (d, i) => columnaY + i * 2 * radio * 1.3 - barraAltura / 2)
            .attr("width", barraWidth)
            .attr("height", barraAltura)
            .attr("fill", barraColor);

        SVG5.selectAll("rect.barraDerecha")
            .data(niveles)
            .enter()
            .append("rect")
            .attr("class", "barraDerecha") // Clase para seleccionar fácilmente las barras derechas más adelante
            .attr("x", (d, i) => columnaX + radio - barraWidth / 2 + 100)
            .attr("y", (d, i) => columnaY + i * 2 * radio * 1.3 - barraAltura / 2)
            .attr("width", barraWidth)
            .attr("height", barraAltura)
            .attr("fill", barraColor);

        // Añadir triángulos al final de cada barra
        const trianguloSize = 25;

        SVG5.selectAll("polygon.trianguloIzquierda")
            .data(niveles)
            .enter()
            .append("polygon")
            .attr("class", "trianguloIzquierda")
            .attr("points", (d, i) => {
                const x = columnaX - barraWidth / 2 - radio + 525;
                const y = columnaY + i * 2 * radio * 1.3 - barraAltura / 2 + barraAltura / 2;
                return `${x},${y} ${x - trianguloSize},${y + trianguloSize} ${x - trianguloSize},${y - trianguloSize}`;
            })
            .attr("fill", barraColor);

        SVG5.selectAll("polygon.trianguloDerecha")
            .data(niveles)
            .enter()
            .append("polygon")
            .attr("class", "trianguloDerecha")
            .attr("points", (d, i) => {
                const x = columnaX + radio - barraWidth / 2 - 225;
                const y = columnaY + i * 2 * radio * 1.3 - barraAltura / 2 + barraAltura / 2;
                return `${x},${y} ${x + trianguloSize},${y + trianguloSize} ${x + trianguloSize},${y - trianguloSize}`;
            })
            .attr("fill", barraColor);

        //-------------------------barras porcentaje----------------------------------------------------

        // Crear las barras laterales (rectángulos) hacia la izquierda y derecha
        const barraWidth2 = 200;

        SVG5.selectAll("rect.barraIzquierda2")
            .data(niveles)
            .enter()
            .append("rect")
            .attr("class", "barraIzquierda2") // Clase para seleccionar fácilmente las barras izquierdas más adelante
            .attr("x", (d, i) => columnaX - barraWidth2 / 2 - radio - 90)
            .attr("y", (d, i) => columnaY + i * 2 * radio * 1.3 - barraAltura / 2)
            .attr("width", barraWidth2)
            .attr("height", barraAltura)
            .attr("fill", "#8FB1BE");

        SVG5.selectAll("rect.barraDerecha2")
            .data(niveles)
            .enter()
            .append("rect")
            .attr("class", "barraDerecha2") // Clase para seleccionar fácilmente las barras derechas más adelante
            .attr("x", (d, i) => columnaX + radio - barraWidth2 / 2 + 90)
            .attr("y", (d, i) => columnaY + i * 2 * radio * 1.3 - barraAltura / 2)
            .attr("width", barraWidth2)
            .attr("height", barraAltura)
            .attr("fill", "#D53302");


        SVG5.selectAll("polygon.trianguloIzquierda2")
            .data(niveles)
            .enter()
            .append("polygon")
            .attr("class", "trianguloIzquierda2")
            .attr("points", (d, i) => {
                const x = columnaX - barraWidth2 / 2 - radio + 415;
                const y = columnaY + i * 2 * radio * 1.3 - barraAltura / 2 + barraAltura / 2;
                return `${x},${y} ${x - trianguloSize},${y + trianguloSize} ${x - trianguloSize},${y - trianguloSize}`;
            })
            .attr("fill", "#D53302");

        SVG5.selectAll("polygon.trianguloDerecha2")
            .data(niveles)
            .enter()
            .append("polygon")
            .attr("class", "trianguloDerecha2")
            .attr("points", (d, i) => {
                const x = columnaX + radio - barraWidth2 / 2 - 215;
                const y = columnaY + i * 2 * radio * 1.3 - barraAltura / 2 + barraAltura / 2;
                return `${x},${y} ${x + trianguloSize},${y + trianguloSize} ${x + trianguloSize},${y - trianguloSize}`;
            })
            .attr("fill", "#8FB1BE");




        //----------------------------------------------------------------------------------------------

        // Crear los hexágonos
        SVG5.selectAll("path.hexagono")
            .data(niveles)
            .enter()
            .append("path")
            .attr("class", "hexagono") // Clase para seleccionar fácilmente los hexágonos más adelante
            .attr("d", d3.line().curve(d3.curveLinearClosed)(hexagonoRedondeado))
            .attr("transform", (d, i) => `translate(${columnaX}, ${columnaY + i * 2 * radio * 1.3})`)
            .attr("fill", color);

        // Añadir etiquetas encima de los hexágonos
        SVG5.selectAll("text")
            .data(niveles)
            .enter()
            .append("text")
            .attr("x", columnaX)
            .attr("y", (d, i) => columnaY + i * 2 * radio * 1.3 + 20)
            .attr("dy", "-1em")
            .attr("text-anchor", "middle")
            .text(d => d)
            .attr("fill", "white") // Cambia el color del texto a blanco
            .style("font-family", "Lato, sans-serif");
    });
}



// Conclusiones   -----------------------------------------------------------------------------------

const WIDTH_VIS_6 = 400;
const HEIGHT_VIS_6 = 500;
SVG6.attr("width", WIDTH_VIS_6).attr("height", HEIGHT_VIS_6);