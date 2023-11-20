const SVG7 = d3.select("#vis-7").append("svg");
const SVG8 = d3.select("#vis-8").append("svg");
const SVG9 = d3.select("#vis-9").append("svg");

const DATOS3 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/censo.json";
const MAPA = "https://raw.githubusercontent.com/yeyedevs/mapa-censo-chile/master/regiones.geojson";

// ----------------------------------  VISUALIZACIÓN 3  --------------------------------------------
// Descripción   -----------------------------------------------------------------------------------
const WIDTH_VIS_3_MAPA = 500;
const HEIGHT_VIS_3_MAPA = 850;

const color1 = "#FCC560";
const color2 = "#A0CBAD";


const degrade = t => {
  return d3.interpolate(color1, color2)(t);
};


SVG7.attr("width", WIDTH_VIS_3_MAPA).attr("height", HEIGHT_VIS_3_MAPA);

const svg7 = SVG7.append("g")

const projection = d3.geoMercator()
  .center([-71, -38.7])
  .scale(950)
  .translate([WIDTH_VIS_3_MAPA / 2, HEIGHT_VIS_3_MAPA / 2]);

const path = d3.geoPath().projection(projection);


const colorScale = d3.scaleSequential(degrade)
  .domain([0.47, 0.52]); 


visualizacionMapa();

function visualizacionMapa() {
    d3.json(MAPA).then(function (chile) {
        svg7.selectAll("path")
            .data(chile.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                const proporcionMujeres = d.properties.MUJERES / d.properties.PERSONAS;
                console.log(proporcionMujeres);
                return colorScale(proporcionMujeres);
            })
            .on("mouseover", function (event, d) {
                const regionSeleccionada = d.properties.REGION_NAME;

                d3.selectAll("path").style("opacity", function (otherData) {
                    return otherData.properties.REGION_NAME === regionSeleccionada ? 1 : 0.2;
                });

                regionTexto.text(regionSeleccionada);
                mujeresTexto.text(`${((d.properties.MUJERES / d.properties.PERSONAS) * 100).toFixed(2)}%`);
                hombresTexto.text(`${((d.properties.HOMBRES / d.properties.PERSONAS) * 100).toFixed(2)}%`);
                totalTexto.text(`${d.properties.PERSONAS} personas`);
                leyenda_mujeres.text("Porcentaje de mujeres:");
                leyenda_hombres.text("Porcentaje de hombres:");
                leyenda_total.text("Población total:");
            })
            .on("mouseout", function () {
                d3.selectAll("path").style("opacity", 1);
                regionTexto.text("");
                mujeresTexto.text("");
                hombresTexto.text("");
                totalTexto.text("");
                leyenda_mujeres.text("");
                leyenda_hombres.text("");
                leyenda_total.text("");
            });
    });

    const regionTexto = svg7.append("text").attr("x", 0).attr("y", 16).attr("font-family", "Montserrat").attr("font-size", "18px").attr("font-weight", "bold").attr("fill", "#8FB1BE");
    const mujeresTexto = svg7.append("text").attr("x", 187).attr("y", 36).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");
    const hombresTexto = svg7.append("text").attr("x", 193).attr("y", 56).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");
    const totalTexto = svg7.append("text").attr("x", 130).attr("y", 76).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "light");
    const leyenda_mujeres = svg7.append("text").attr("x", 0).attr("y", 35).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "bold");
    const leyenda_hombres = svg7.append("text").attr("x", 0).attr("y", 55).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "bold");
    const leyenda_total = svg7.append("text").attr("x", 0).attr("y", 75).attr("font-family", "Montserrat").attr("font-size", "15px").attr("font-weight", "bold");

}
