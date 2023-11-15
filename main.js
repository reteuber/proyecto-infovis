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

 SVG1.append("text")
    .attr("x", 30)
    .attr("y", 330)
    .attr("font-family", "Montserrat")
    .attr("font-size", "15px")
    .attr("font-weight", "bold")
    .text("% de mujeres en STEM:");

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

        const datosReducidos = data.slice(0, 100);

        //Escala de posición de los círculos 
        const escalaPosicion = d3.scaleLinear()
            .domain([0, datosReducidos.length])
            .range([0, (3 / 1.7) * Math.PI]);

        // Escala de color según continente
        const coloresPersonalizados = {
            "Europa": "#6e93cb",
            "Oceania": "#6e4876",
            "America": "#fa846e",
            "Africa": "#cd6775",
            "Asia": "#8c60a2"
        };

        const longitudMaxima = 250;

        // Escala de largo de las barras 
        const escalaLongitud = d3.scaleLinear()
            .domain([0, 100])
            .range([0, longitudMaxima]);

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

        const radioGrande = 400;

        // Barras de porcentaje de stem 
        const barras = svg2.selectAll("barra")
            .data(datosReducidos)
            .enter()
            .append("line")
            .attr("x1", (d, i) => radioGrande * Math.cos(escalaPosicion(i) - Math.PI / 2))
            .attr("y1", (d, i) => radioGrande * Math.sin(escalaPosicion(i) - Math.PI / 2))
            .attr("x2", (d, i) => {
                const longitudBarra = escalaLongitud(d.p_stem);
                return radioGrande * Math.cos(escalaPosicion(i) - Math.PI / 2) - longitudBarra * Math.cos(escalaPosicion(i) - Math.PI / 2);
            })
            .attr("y2", (d, i) => {
                const longitudBarra = escalaLongitud(d.p_stem);
                return radioGrande * Math.sin(escalaPosicion(i) - Math.PI / 2) - longitudBarra * Math.sin(escalaPosicion(i) - Math.PI / 2);
            })
            .attr("class", "barra")
            .style("stroke-width", 4)
            .style("stroke-linecap", "round")
            .style("stroke", d => esquemaColores(d.continente));

        // Agregar círculos
        const circulos = svg2.selectAll("circle")
            .data(datosReducidos)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => radioGrande * Math.cos(escalaPosicion(i) - Math.PI / 2))
            .attr("cy", (d, i) => radioGrande * Math.sin(escalaPosicion(i) - Math.PI / 2))
            .attr("r", 10)
            .attr("class", "circulo")
            .style("fill", d => esquemaColores(d.continente));

        // Agregar números dentro de los círculos
        const textos = svg2.selectAll("text")
            .data(datosReducidos)
            .enter()
            .append("text")
            .attr("x", (d, i) => radioGrande * Math.cos(escalaPosicion(i) - Math.PI / 2))
            .attr("y", (d, i) => radioGrande * Math.sin(escalaPosicion(i) - Math.PI / 2))
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("font-family", "Montserrat")
            .attr("font-weight", "bold")
            .attr("font-size", "9px")
            .attr("class", "texto")
            .text(d => d.ranking)
            .style("fill", "white");

        // Ajusta los elementos de texto para mostrar los datos del círculo actual
        const paisTexto = SVG1.append("text").attr("x", 80).attr("y", 240).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");
        const rankingTexto = SVG1.append("text").attr("x", 120).attr("y", 270).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");
        const puntuacionTexto = SVG1.append("text").attr("x", 140).attr("y", 300).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");
        const stemTexto = SVG1.append("text").attr("x", 220).attr("y", 330).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light")

        // Ajustado opacidades de los círculos y textos. 
        d3.selectAll(".circulo, .texto, .barra")
            .on("mouseover", function (event, d) {
                d3.selectAll(".circulo, .texto, .barra").style("opacity", function (otherData) {
                    if (otherData === d) {
                        paisTexto.text(d.pais);
                        rankingTexto.text(d.ranking);
                        puntuacionTexto.text(d.puntuacion);
                        stemTexto.text(`${d.p_stem}%`)
                        return 1;
                    } else {
                        return 0.2;
                    }
                });
            })
            .on("mouseout", function () {
                d3.selectAll(".circulo, .texto , .barra").style("opacity", 1);
                paisTexto.text("");
                rankingTexto.text("");
                puntuacionTexto.text("");
            });
    });
}