const SVG7 = d3.select("#vis-7").append("svg");
const SVG8 = d3.select("#vis-8").append("svg");
const SVG9 = d3.select("#vis-9").append("svg");

const DATOS3 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/censo.json";
const DATOS4 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/investigadores.json"
const DATOS5 = "https://raw.githubusercontent.com/reteuber/Bases-datos-proyecto/main/investigadoras.json"
const MAPA = "https://raw.githubusercontent.com/yeyedevs/mapa-censo-chile/master/regiones.geojson";

// ----------------------------------  VISUALIZACIÓN 3  --------------------------------------------
// Descripción   -----------------------------------------------------------------------------------
const WIDTH_VIS_3_MAPA = 380;
const HEIGHT_VIS_3_MAPA = 850;

const WIDTH_VIS_8 = 465;
const HEIGHT_VIS_8 = 850;


const WIDTH_VIS_9 = 500;
const HEIGHT_VIS_9 = 850;


const color1 = "#FCC560";
const color2 = "#A0CBAD";



const degrade = t => {
  return d3.interpolate(color1, color2)(t);
};


SVG7.attr("width", WIDTH_VIS_3_MAPA).attr("height", HEIGHT_VIS_3_MAPA);

SVG8.attr("width", WIDTH_VIS_8).attr("height", HEIGHT_VIS_8);

SVG9.attr("width", WIDTH_VIS_9).attr("height", HEIGHT_VIS_9);

const svg7 = SVG7.append("g")

const svg9 = SVG9.append("g")

const projection = d3.geoMercator()
  .center([-76, -38.7])
  .scale(950)
  .translate([WIDTH_VIS_3_MAPA / 2, HEIGHT_VIS_3_MAPA / 2]);

const path = d3.geoPath().projection(projection);


const colorScale = d3.scaleSequential(degrade)
  .domain([0.47, 0.52]); 

const svg8 = SVG8.append("g")

let regionSeleccionada = null;

let hover = true;

// SVG9.append("circle")
//     .attr("cx", WIDTH_VIS_9 / 2+1)
//     .attr("cy", WIDTH_VIS_9 / 2 - 120)
//     .attr("r", 110)
//     .attr("fill", "#A0CBAD")
//     .attr("opacity", 1); // ver como poner esto sin que tape la foto (por ahora le voy a poner baja opacidad)

const area_investigadora = svg9.append("text")
.attr("x", WIDTH_VIS_9 / 2)
.attr("y", 370)
.attr("font-family", "Montserrat")
.attr("font-size", "15px")
.attr("font-weight", "bold")
.attr("text-anchor", "middle");

const area = svg9.append("text")
.attr("x", WIDTH_VIS_9 / 2)
.attr("y", 380)
.attr("font-family", "Montserrat")
.attr("font-size", "15px")
.attr("font-weight", "light")
.attr("text-anchor", "middle")
.attr("transform", function(d, i) {
  return `translate(230,0)`;
})

const nombre = svg9.append("text")
.attr("x", WIDTH_VIS_9 / 2)
.attr("y", 315)
.attr("font-family", "Montserrat")
.attr("font-size", "26px")
.attr("font-weight", "bold")
.attr("fill", "#D53302")
.attr("text-anchor", "middle");

const investigadorasTotales = svg9.append("text")
.attr("y", 20)
.attr("font-family", "Montserrat")
.attr("font-size", "20px")
.attr("font-weight", "bold")
.attr("text-anchor", "middle")
.attr("fill", "#A0CBAD")
.attr("transform", function (d) {
  return "translate(220, -20)";
});

const region_inv = svg9.append("text")
.attr("x", WIDTH_VIS_9 / 2)
.attr("y", 30)
.attr("font-family", "Montserrat")
.attr("font-size", "26px")
.attr("font-weight", "bold")
.attr("fill", "#A0CBAD")
.attr("text-anchor", "middle");

visualizacionMapa();


function visualizacionMapa() {

  d3.json(MAPA).then(function (chile) {
      svg7.selectAll("path")
          .data(chile.features)
          .enter()
          .append("path")
          .attr("class", "clase-mapa")
          .attr("d", path)
          .attr("fill", d => {
              const proporcionMujeres = d.properties.MUJERES / d.properties.PERSONAS;
              return colorScale(proporcionMujeres);
          })
          .on("mouseover", function (event, d) {
              if (regionSeleccionada === null) {
                  const regionActual = d.properties.REGION_NAME;

                  d3.selectAll(".clase-mapa").style("opacity", function (otherData) {
                      return otherData.properties.REGION_NAME === regionActual ? 1 : 0.2;
                  });

                  regionTexto.text(regionActual);
                  mujeresTexto.text(`${((d.properties.MUJERES / d.properties.PERSONAS) * 100).toFixed(2)}%`);
                  hombresTexto.text(`${((d.properties.HOMBRES / d.properties.PERSONAS) * 100).toFixed(2)}%`);
                  totalTexto.text(`${d.properties.PERSONAS} personas`);
                  leyenda_mujeres.text("Porcentaje de mujeres:");
                  leyenda_hombres.text("Porcentaje de hombres:");
                  leyenda_total.text("Población total:");
              }
          })
          .on("mouseout", function () {
              if (regionSeleccionada === null) {
                  d3.selectAll(".clase-mapa").style("opacity", 1);
                  regionTexto.text("");
                  mujeresTexto.text("");
                  hombresTexto.text("");
                  totalTexto.text("");
                  leyenda_mujeres.text("");
                  leyenda_hombres.text("");
                  leyenda_total.text("");
              }
          })
          .on("click", function (event, d) {
              if (regionSeleccionada === d.properties.REGION_NAME) {
                  regionSeleccionada = null;
                  d3.selectAll("path").style("opacity", 1);
                  regionTexto.text("");
                  mujeresTexto.text("");
                  hombresTexto.text("");
                  totalTexto.text("");
                  leyenda_mujeres.text("");
                  leyenda_hombres.text("");
                  leyenda_total.text("");
                  area_investigadora.text("");
                  visualizacionInvestigadoras(null, false);
                  visualizacionPromedioChile();
                  todasInvestigadoras(true);
              } else {
                  regionSeleccionada = d.properties.REGION_NAME;
                  d3.selectAll(".clase-mapa").style("opacity", function (otherData) {
                      return otherData.properties.REGION_NAME === regionSeleccionada ? 1 : 0.2;
                  });
                  regionTexto.text(regionSeleccionada);
                  mujeresTexto.text(`${((d.properties.MUJERES / d.properties.PERSONAS) * 100).toFixed(2)}%`);
                  hombresTexto.text(`${((d.properties.HOMBRES / d.properties.PERSONAS) * 100).toFixed(2)}%`);
                  totalTexto.text(`${d.properties.PERSONAS} personas`);
                  leyenda_mujeres.text("Porcentaje de mujeres:");
                  leyenda_hombres.text("Porcentaje de hombres:");
                  leyenda_total.text("Población total:");
                  visualizacionPersonas(d.properties.REGION_NAME);
                  visualizacionInvestigadoras(d.properties.REGION_NAME, true);
                  todasInvestigadoras(false);
              }
          });
          if (regionSeleccionada === null){
            visualizacionInvestigadoras(null, false);
            todasInvestigadoras(true);
            visualizacionPromedioChile();
          }

      console.log(regionSeleccionada);
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
      const offsetY = (HEIGHT_VIS_8 - ladoCuadrado * espaciadoY) + 30;


      const regionLeyenda = SVG8.append("text")
          .attr("x", -100).attr("y", 40).
          attr("font-family", "Montserrat")
          .attr("font-size", "24px")
          .attr("font-weight", "bold")
          .attr("fill", "#252850")
          .attr("text-anchor", "middle")
          .attr("transform", function (d) {
                return "translate(330, -10)";
              });
              const mujeresLeyenda = SVG8.append("text").attr("x", 250).attr("y", HEIGHT_VIS_8 - 741).attr("font-family", "Montserrat").attr("font-size", "14px").attr("font-weight", "light");
              const hombresLeyenda = SVG8.append("text").attr("x", 260).attr("y", HEIGHT_VIS_8 - 710).attr("font-family", "Montserrat").attr("font-size", "14px").attr("font-weight", "light");
        
              SVG8.selectAll(".persona")
              .data(d3.range(totalCirculos))
              .enter()
              .append("g")
              .attr("transform", function(d, i) {
                const col = i % ladoCuadrado;
                const row = Math.floor(i / ladoCuadrado);
                const x = offsetX + col * espaciadoX+10;
                const y = 220 + row * espaciadoY;
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
        regionLeyenda.text(datosRegion.Region)
        mujeresLeyenda.text(`${datosRegion.Mujeres}%`);
        hombresLeyenda.text(`${datosRegion.Hombres}%`);

        const circleRadius = 8;

        SVG8.append("circle")
        .attr("cx", WIDTH_VIS_8 - 295)
        .attr("cy", 103)
        .attr("r", circleRadius)
        .attr("fill", "#D53302");
  
      SVG8.append("text")
        .attr("x", WIDTH_VIS_8 - 280)
        .attr("y", 108)
        .attr("font-family", "Montserrat")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text("Mujeres");
  
      SVG8.append("circle")
        .attr("cx", WIDTH_VIS_8 - 295)
        .attr("cy", 135)
        .attr("r", circleRadius)
        .attr("fill", "#8FB1BE");
  
      SVG8.append("text")
        .attr("x", WIDTH_VIS_8 - 280)
        .attr("y", 140)
        .attr("font-family", "Montserrat")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text("Hombres");
    } else {
      console.error(`No se encontraron datos para la región: ${nombre_region}`);
    }
  });
};



function visualizacionPromedioChile() {
  d3.json(DATOS4).then(function(investigadores) {
    const totalRegiones = investigadores.length;

    if (totalRegiones > 0) {
      SVG8.selectAll("*").remove();

      const promedioMujeres = d3.mean(investigadores, d => d.Mujeres);
      const promedioHombres = d3.mean(investigadores, d => d.Hombres);

      const totalCirculos = 100;
      const circulosMujeres = Math.round((promedioMujeres / 100) * totalCirculos);
      const circulosHombres = totalCirculos - circulosMujeres;

      const ladoCuadrado = Math.ceil(Math.sqrt(totalCirculos));
      const espaciadoX = 30; 
      const espaciadoY = 50;
      const offsetX = (WIDTH_VIS_8 - ladoCuadrado * espaciadoX) / 2;
      const offsetY = (HEIGHT_VIS_8 - ladoCuadrado * espaciadoY) + 30;


      const regionLeyenda = SVG8.append("text")
          .attr("x", -100).attr("y", 40).
          attr("font-family", "Montserrat")
          .attr("font-size", "18px")
          .attr("font-weight", "bold")
          .attr("fill", "#252850")
          .attr("text-anchor", "middle")
          .attr("transform", function (d) {
                return "translate(210, -30)";
              });

      const mujeresLeyenda = SVG8.append("text").attr("x", 250).attr("y", HEIGHT_VIS_8 - 741).attr("font-family", "Montserrat").attr("font-size", "14px").attr("font-weight", "light");
      const hombresLeyenda = SVG8.append("text").attr("x", 260).attr("y", HEIGHT_VIS_8 - 710).attr("font-family", "Montserrat").attr("font-size", "14px").attr("font-weight", "light");

      SVG8.selectAll(".persona")
        .data(d3.range(totalCirculos))
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          const col = i % ladoCuadrado;
          const row = Math.floor(i / ladoCuadrado);
          const x = offsetX + col * espaciadoX+10;
          const y = 220 + row * espaciadoY;
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

        var texto = "Porcentaje promedio de\ninvestigadoras(es) de las regiones de Chile"
        var textooficial = texto.split('\n');
  
        regionLeyenda.selectAll("tspan")
            .data(textooficial)
            .enter()
            .append("tspan")
            .attr("x", 20)
            .attr("dy", 20)
            .text(function (d) {
              return d;
            });

      mujeresLeyenda.text(`${promedioMujeres.toFixed(1)}%`);
      hombresLeyenda.text(`${promedioHombres.toFixed(1)}%`);
      

      const circleRadius = 8;

      SVG8.append("circle")
      .attr("cx", WIDTH_VIS_8 - 295)
      .attr("cy", 103)
      .attr("r", circleRadius)
      .attr("fill", "#D53302");

    SVG8.append("text")
      .attr("x", WIDTH_VIS_8 - 280)
      .attr("y", 108)
      .attr("font-family", "Montserrat")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text("Mujeres");

    SVG8.append("circle")
      .attr("cx", WIDTH_VIS_8 - 295)
      .attr("cy", 135)
      .attr("r", circleRadius)
      .attr("fill", "#8FB1BE");

    SVG8.append("text")
      .attr("x", WIDTH_VIS_8 - 280)
      .attr("y", 140)
      .attr("font-family", "Montserrat")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text("Hombres");
    } else {
      console.error("No se encontraron datos para calcular el promedio de Chile");
    }
  });
}

function visualizacionInvestigadoras(region_seleccionada, mostrar) {
  svg9.selectAll("g.investigadoraGroup").remove();
  area.text("");

  if (mostrar === true) {
    d3.json(DATOS5).then(function (investigadoras) {
      const investigadorasRegion = investigadoras.filter(function (investigadora) {
        return investigadora.region === region_seleccionada;
      });

      var investigadoraGroup = svg9.selectAll("g.investigadoraGroup")
        .data(investigadorasRegion)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          var x = (WIDTH_VIS_9 - 200) / 2;
          var y = 60;
          return "translate(" + x + "," + y + ")";
        });

      investigadoraGroup.append("image")
        .attr("xlink:href", function (d) {
          return "assets/investigadora" + d.ID + ".png";
        })
        .attr("width", 200)
        .attr("height", 200)
        .attr("class", "foto_inv");

      if (investigadorasRegion.length > 0) {
        var areaTexto = investigadorasRegion[0].area;
        var lineas = areaTexto.split('\n');

        area.selectAll("tspan")
          .data(lineas)
          .enter()
          .append("tspan")
          .attr("x", 20)
          .attr("dy", 20)
          .text(function (d) {
            return d;
          });

        nombre.text(investigadorasRegion[0].nombre);
        area_investigadora.text("Área de investigación")
        region_inv.text(region_seleccionada);
      }
    });
  } else {
    region_inv.text("");
    svg9.selectAll("g.investigadoraGroup").remove();
    nombre.text("");
    area_investigadora.text("");
  }
}




function todasInvestigadoras(siono) {

  if (siono){
    d3.json(DATOS5).then(function (investigadoras) {
      area_investigadora.text("");
      area.text("");
      nombre.text("");

      var texto = "Conoce a algunas de nuestras\n investigadoras chilenas⭐"
      var textooficial = texto.split('\n');

        investigadorasTotales.selectAll("tspan")
          .data(textooficial)
          .enter()
          .append("tspan")
          .attr("x", 20)
          .attr("dy", 20)
          .text(function (d) {
            return d;
          });
  
      var columnas = 3;
      var filas = 5;
      var anchoImagen = 120;
      var altoImagen = 120;
      var espaciadoX = 40;
      var espaciadoY = 40;
  
      var imagenesGroup = svg9.selectAll("g.imagenes")
        .data([0])
        .enter()
        .append("g")
        .attr("class", "imagenes");
  
      var imagenes = imagenesGroup.selectAll("image")
        .data(investigadoras)
        .enter()
        .append("image")
        .attr("xlink:href", function (d) {
          return "assets/investigadora" + d.ID + ".png";
        })
        .attr("x", function (d, i) {
          var columna = i % columnas;
          return columna * (anchoImagen + espaciadoX)+ 16 + (WIDTH_VIS_9 - (columnas * (anchoImagen + espaciadoX))) / 2;
        })
        .attr("y", function (d, i) {
          var fila = Math.floor(i / columnas);
          return fila * (altoImagen + espaciadoY) + 70; 
        })
        .attr("width", anchoImagen)
        .attr("height", altoImagen);
  
    });

  }else{
    svg9.selectAll("g.imagenes").remove();
    investigadorasTotales.text("")
  }
  
}


