const SVG4 = d3.select("#vis-4").append("svg");
const SVG5 = d3.select("#vis-5").append("svg");
const SVG6 = d3.select("#vis-6").append("svg");

const DATOS2 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/educacion_superior.json"

// Descripción   -----------------------------------------------------------------------------------

const WIDTH_VIS_4 = 1280;
const HEIGHT_VIS_4 = 200;
SVG4.attr("width", WIDTH_VIS_4).attr("height", HEIGHT_VIS_4);

// ----------------------------------  VISUALIZACIÓN 2  --------------------------------------------
const WIDTH_VIS_5 = 800;
const HEIGHT_VIS_5 = 500;
SVG5.attr("width", WIDTH_VIS_5).attr("height", HEIGHT_VIS_5);

StemChile();

function StemChile() {
    // Datos para los niveles y colores
    const niveles = ["Pregrado", "Magister", "Doctorado"];
    const color = "#c9c9c9"; // Color crema oscuro

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

    // Crear los hexágonos
    SVG5.selectAll("path")
        .data(niveles)
        .enter()
        .append("path")
        .attr("d", d3.line().curve(d3.curveLinearClosed)(hexagonoRedondeado))
        .attr("transform", (d, i) => `translate(${columnaX}, ${columnaY + i * 2 * radio * 1.3})`)
        .attr("fill", color)


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
}







// Conclusiones   -----------------------------------------------------------------------------------

const WIDTH_VIS_6 = 400;
const HEIGHT_VIS_6 = 500;
SVG6.attr("width", WIDTH_VIS_6).attr("height", HEIGHT_VIS_6);