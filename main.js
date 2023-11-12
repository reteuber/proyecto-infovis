const SVG1 = d3.select("#vis-1").append("svg");
const SVG2 = d3.select("#vis-2").append("svg");
const SVG3 = d3.select("#vis-3").append("svg");

const DATOS = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/brecha_mundial_y_stem.json"

// ----------------------------------  VISUALIZACIÓN 1  --------------------------------------------

// Descripción   -----------------------------------------------------------------------------------
const WIDTH_VIS_1 = 200;
const HEIGHT_VIS_1 = 600;
SVG1.attr("width", WIDTH_VIS_1).attr("height", HEIGHT_VIS_1);

SVG1.append("text")
    .attr("x", WIDTH_VIS_1 / 2 - 50)
    .attr("y", 20)
    .classed('texto-titulo', true)
    .text("Descripción");


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
const WIDTH_VIS_2 = 1000;
const HEIGHT_VIS_2 = 600;
SVG2.attr("width", WIDTH_VIS_2).attr("height", HEIGHT_VIS_2);
