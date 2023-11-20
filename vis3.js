const SVG7 = d3.select("#vis-7").append("svg");
const SVG8 = d3.select("#vis-8").append("svg");
const SVG9 = d3.select("#vis-9").append("svg");

const DATOS3 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/censo.json";
const DATOS4 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/investigadores.json"
const MAPA = "https://raw.githubusercontent.com/yeyedevs/mapa-censo-chile/master/regiones.geojson";

// ----------------------------------  VISUALIZACIÓN 3  --------------------------------------------
// Descripción   -----------------------------------------------------------------------------------
const WIDTH_VIS_3_MAPA = 500;
const HEIGHT_VIS_3_MAPA = 850;

const WIDTH_VIS_8 = 500;
const HEIGHT_VIS_8 = 500;


const color1 = "#FCC560";
const color2 = "#A0CBAD";


const degrade = t => {
  return d3.interpolate(color1, color2)(t);
};


SVG7.attr("width", WIDTH_VIS_3_MAPA).attr("height", HEIGHT_VIS_3_MAPA);

SVG8.attr("width", WIDTH_VIS_8).attr("height", HEIGHT_VIS_8);

const svg7 = SVG7.append("g")

const projection = d3.geoMercator()
  .center([-71, -38.7])
  .scale(950)
  .translate([WIDTH_VIS_3_MAPA / 2, HEIGHT_VIS_3_MAPA / 2]);

const path = d3.geoPath().projection(projection);


const colorScale = d3.scaleSequential(degrade)
  .domain([0.47, 0.52]); 

const svg8 = SVG8.append("g")

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
            })
            .on("click", function (event, d) {
              visualizacionPersonas(d.properties.REGION_NAME);
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

function visualizacionPersonas(nombre_region) {
  d3.json(DATOS4).then(function(investigadores) {
    const datosRegion = investigadores.find(d => d.Region === nombre_region);

    if (datosRegion) {
      SVG8.selectAll("*").remove();

      const totalCirculos = 100;
      const circulosMujeres = datosRegion.Mujeres;
      const circulosHombres = totalCirculos - circulosMujeres;

      const ladoCuadrado = Math.ceil(Math.sqrt(totalCirculos));
      const espaciadoX = 30; 
      const espaciadoY = 50;
      const offsetX = (WIDTH_VIS_8 - ladoCuadrado * espaciadoX) / 2;
      const offsetY = (HEIGHT_VIS_8 - ladoCuadrado * espaciadoY) / 2;

      SVG8.selectAll(".persona")
        .data(d3.range(totalCirculos))
        .enter()
        .append("g") 
        .attr("transform", function(d, i) {
          const col = i % ladoCuadrado;
          const row = Math.floor(i / ladoCuadrado);
          const x = offsetX + col * espaciadoX;
          const y = offsetY + row * espaciadoY;
          return `translate(${x},${y})`;
        })
        .each(function(_, i) {
          d3.select(this).append("rect")
            .attr("width", 5)
            .attr("height", 20)
            .attr("x", -2)
            .attr("y", -20)
            .attr("fill", i < circulosMujeres ? "#D53302" : "#8FB1BE");

          d3.select(this).append("circle")
            .attr("cx", 0)
            .attr("cy", -25)
            .attr("r", 8)
            .attr("fill", i < circulosMujeres ? "#D53302" : "#8FB1BE");
        })
        .on("mouseover", function(d) {

        })
        .on("mouseout", function() {

        });
    } else {
      console.error(`No se encontraron datos para la región: ${nombre_region}`);
    }
  });
}
