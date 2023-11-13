const SVG1 = d3.select("#vis-1").append("svg");
const SVG2 = d3.select("#vis-2").append("svg");
const SVG3 = d3.select("#vis-3").append("svg");

const DATOS1 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/brecha_mundial_y_stem.json"

// ----------------------------------  VISUALIZACIÓN 1  --------------------------------------------

// Descripción   -----------------------------------------------------------------------------------
const WIDTH_VIS_1 = 300;
const HEIGHT_VIS_1 = 850;
SVG1.attr("width", WIDTH_VIS_1).attr("height", HEIGHT_VIS_1);

SVG1.append("text")
    .attr("x", WIDTH_VIS_1 / 2 - 50)
    .attr("y", 210)
    .classed('texto-titulo', true)
    .attr("font-weight", "bold")
    .text("Descripción");

SVG1.append("text")
    .attr("x", 30)
    .attr("y", 240)
    .attr("font-family", "Montserrat")
    .attr("font-size", "15px")
    .attr("font-weight", "bold")
    .text("País:");

SVG1.append("text")
    .attr("x", 30)
    .attr("y", 270)
    .attr("font-family", "Montserrat")
    .attr("font-size", "15px")
    .attr("font-weight", "bold")
    .text("Ranking:");

SVG1.append("text")
    .attr("x", 30)
    .attr("y", 300)
    .attr("font-family", "Montserrat")
    .attr("font-size", "15px")
    .attr("font-weight", "bold")
    .text("Puntuación:");


// Conclusiones  -----------------------------------------------------------------------------------
const WIDTH_VIS_3 = 1280;
const HEIGHT_VIS_3 = 100;
SVG3.attr("width", WIDTH_VIS_3).attr("height", HEIGHT_VIS_3);

SVG3.append("text")
    .attr("x", WIDTH_VIS_3 / 2 - 50)
    .attr("y", 20)
    .classed('texto-titulo', true)
    .text("Conclusiones");

// Visualización Brecha género  --------------------------------------------------------------------
const WIDTH_VIS_2 = 900;
const HEIGHT_VIS_2 = 850;
SVG2.attr("width", WIDTH_VIS_2).attr("height", HEIGHT_VIS_2);

BrechaGenero();

function BrechaGenero() {
    d3.json(DATOS1).then(data => {
        console.log(data);

        //Escala de posición de los círculos 
        const escalaPosicion = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, 2 * Math.PI]);

        // Escala de color según continente
        const coloresPersonalizados = {
            "Europa": "#1f78b4",
            "Oceania": "#33a02c",
            "America": "#e31a1c",
            "Africa": "#ff7f00",
            "Asia": "#6a3d9a"
        };

        const esquemaColores = d3.scaleOrdinal()
            .domain(Object.keys(coloresPersonalizados))
            .range(Object.values(coloresPersonalizados));

        // Leyenda de los continentes y sus colores ------------------------------------------------
        const leyenda = SVG1.append("g")
            .attr("transform", "translate(20, 20)");

        leyenda.selectAll("circle")
            .data(Object.keys(coloresPersonalizados))
            .enter()
            .append("circle")
            .attr("cx", 10)
            .attr("cy", (d, i) => 30 * i)
            .attr("r", 9)
            .style("fill", d => esquemaColores(d));

        leyenda.selectAll("text")
            .data(Object.keys(coloresPersonalizados))
            .enter()
            .append("text")
            .attr("x", 25)
            .attr("y", (d, i) => 30 * i)
            .attr("text-anchor", "start")
            .attr("alignment-baseline", "middle")
            .attr("font-family", "Montserrat")
            .attr("font-size", "15px")
            .text(d => d)
            .style("fill", "black");

        // -----------------------------------------------------------------------------------------
        const svg2 = SVG2.append("g")
            .attr("transform", `translate(${WIDTH_VIS_2 / 2},${HEIGHT_VIS_2 / 2})`);

        const radioGrande = 416;

        // Agregar números dentro de los círculos
        const circulos = svg2.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => radioGrande * Math.cos(escalaPosicion(i) - Math.PI / 2))
            .attr("cy", (d, i) => radioGrande * Math.sin(escalaPosicion(i) - Math.PI / 2))
            .attr("r", 8)
            .attr("class", "circulo")
            .style("fill", d => esquemaColores(d.continente));

        // Agregar números dentro de los círculos
        const textos = svg2.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (d, i) => radioGrande * Math.cos(escalaPosicion(i) - Math.PI / 2))
            .attr("y", (d, i) => radioGrande * Math.sin(escalaPosicion(i) - Math.PI / 2))
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("font-family", "Montserrat")
            .attr("font-weight", "bold")
            .attr("font-size", "8.3px")
            .attr("class", "texto")
            .text(d => d.ranking)
            .style("fill", "white");

        // Ajusta los elementos de texto para mostrar los datos del círculo actual
        const paisTexto = SVG1.append("text").attr("x", 80).attr("y", 240).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");
        const rankingTexto = SVG1.append("text").attr("x", 120).attr("y", 270).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");
        const puntuacionTexto = SVG1.append("text").attr("x", 140).attr("y", 300).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");

        // Ajustado opacidades de los círculos y textos. 
        d3.selectAll(".circulo, .texto")
            .on("mouseover", function (event, d) {
                d3.selectAll(".circulo, .texto").style("opacity", function (otherData) {
                    if (otherData === d) {
                        // Actualiza los textos con los datos del círculo actual
                        paisTexto.text(d.pais);
                        rankingTexto.text(d.ranking);
                        puntuacionTexto.text(d.puntuacion);
                        return 1;
                    } else {
                        return 0.2;
                    }

                });
            })
            .on("mouseout", function () {
                d3.selectAll(".circulo, .texto").style("opacity", 1);
                // Restaura los textos en SVG1 cuando el mouse sale de los círculos
                paisTexto.text("");
                rankingTexto.text("");
                puntuacionTexto.text("");
            });
    });
}
