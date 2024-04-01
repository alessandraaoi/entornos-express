const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

// siempre cargará el puerto 3000, al no ser que exista una variable de entorno PORT != 3000; 

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ---------- API ------------

const geoCards = [
  {
    id: 0,
    pais: "Italia",
    capital: "Roma",
    gobierno: "República parlamentaria",
    moneda: "Euro",
    descripcion:
      "Italia es un país soberano transcontinental, constituido en una república compuesta por veinte regiones, integradas estas, a su vez, por ciento once provincias. Es uno de los veintisiete Estados soberanos que forman la Unión Europea. Italia se ubica en el centro del mar Mediterráneo, en Europa meridional. ",
  },
  {
    id: 1,
    pais: "España",
    capital: "Madrid",
    gobierno: "Monarquía parlamentaria",
    moneda: "Euro",
    descripcion:
      "España es un país soberano transcontinental, constituido en Estado social y democrático de derecho. Es uno de los veintisiete Estados soberanos que forman la Unión Europea. Su territorio está organizado en diecisiete comunidades autónomas, formadas a su vez por cincuenta provincias, y dos ciudades autónomas. España se sitúa principalmente en el suroeste de Europa, si bien también tiene presencia en el norte de África. En Europa, ocupa la mayor parte de la península ibérica, conocida como España peninsular, y las islas Baleares (en el mar Mediterráneo). En África se hallan las ciudades de Ceuta y Melilla, las islas Canarias (en el océano Atlántico) y varias posesiones mediterráneas denominadas «plazas de soberanía». El municipio de Llivia, en los Pirineos, constituye un exclave rodeado totalmente por territorio francés. ",
  },
  {
    id: 2,
    pais: "Argentina",
    capital: "Buenos Aires",
    gobierno: "República federal presidencialista",
    moneda: "Peso",
    descripcion:
      "Argentina es un país soberano de América del Sur, ubicado en el extremo sur y sudeste. Argentina está organizada como un Estado federal descentralizado, integrado desde 1994 por veintitrés provincias y la Ciudad Autónoma de Buenos Aires (CABA). Las veinticuatro jurisdicciones o distritos autogobernados tienen constitución, bandera y fuerza de seguridad propias. Las provincias mantienen todos los poderes no delegados al Estado nacional, tienen tres poderes autónomos y garantizan la autonomía de sus municipios.",
  },
  {
    id: 3,
    pais: "Cuba",
    capital: "La Habana",
    gobierno: "República socialista unitaria marxista-leninista unipartidista",
    moneda: "Peso cubano, Dólar estadounidense",
    descripcion:
      "Cuba es un país soberano insular, asentado en las Antillas del mar Caribe. El territorio está organizado en quince provincias y un municipio especial con La Habana. Cuba es uno de los trece países que forman la América Insular, Antillas o islas del mar Caribe, y uno de los treinta y cinco del continente americano. Está ubicada en el extremo noroeste de las Antillas, limitando al norte con el océano Atlántico a 793 km del Triángulo de las Bermudas, que lo separa de Estados Unidos y Bahamas, al este con el Paso de los Vientos, que lo separa de Haití, al sur con el mar Caribe y al noroeste con el golfo de México. ",
  },
  {
    id: 4,
    pais: "Senegal",
    capital: "Dakar",
    gobierno: "República semipresidencialista",
    moneda: "Franco CFA de África Occidental",
    descripcion: 'Senegal es un estado soberano de África Occidental. Su territorio está organizado en catorce regiones. Debe su nombre al río Senegal, que marca la frontera este y norte del país. Senegal limita con el océano Atlántico al oeste, con Mauritania al norte, con Malí al este, y con Guinea y Guinea-Bisáu al sur. Gambia forma un enclave virtual dentro de Senegal, siguiendo el río Gambia durante más de 300 km tierra adentro.'
  },
  {
    id: 5,
    pais: "Marruecos",
    capital: "Rabat",
    gobierno: "Monarquía constitucional unitaria",
    moneda: "Dírham marroquí",
    descripcion: 'Marruecos es un país soberano situado en el Magreb. Está ubicado al norte de África limitando al norte con el mar Mediterráneo y las ciudades autónomas españolas de Ceuta y Melilla, al este con Argelia, al oeste con el océano atlántico y al sur con el territorio no autónomo del Sahara Occidental, que administra en un 80% y denomina provincias Meridionales.'
  },
  {
    id: 6,
    pais: "Singapur",
    capital: "Singapur",
    gobierno: "República parlamentaria de partido hegemónico",
    moneda: "Dólar de Singapur",
    descripcion: 'Singapur es una mezcla única de ciudad-Estado y país insular, situada en el corazón marítimo del Sudeste asiático. Esta posición geográfica estratégica, enclavada entre el estrecho de Malaca, el estrecho de Singapur, el mar de la China Meridional y el estrecho de Johor, ha forjado su historia y sigue influyendo en su trayectoria actual. El territorio del país, incluye una isla principal y 63 islas e islotes satélites y una periférica. Singapur es una sociedad multicultural con una densidad de población que ocupa el segundo puesto mundial. La diversidad lingüística del país se refleja en sus lenguas oficiales: inglés, malayo, mandarín y tamil, con el inglés como lengua franca.'
  },
  {
    id: 7,
    pais: "Japón",
    capital: "Tokio",
    gobierno: "Monarquía parlamentaria",
    moneda: "Yen",
    descripcion: 'Japón es un país insular de Asia Oriental ubicado en el noroeste del océano Pacífico. Limita con el mar del Japón al oeste y se extiende desde el mar de Ojotsk en el norte hasta el mar de la China Oriental y Taiwán en el sur. Su territorio comprende un archipiélago de 14,125 islas que cubren 377 978 km² sobre el denominado anillo de fuego del Pacífico.'
  }
];

app.get ('/', (req, res, next) => {
  res.json({status: 'OK'});
})

app.get ('/geocards', (req, res, next) => {

    try{
    let arrayAuxiliar = geoCards.map((carta) => {
    return {
      id: carta.id,
      pais: carta.pais
    }
    })
    
    res.json({geoCards: arrayAuxiliar})
  } catch (error) {
    next (error);
  }
})

app.get ('/geocards/detalles', (req, res, next) => {

  try{

  let id = req.query.id; 
  res.json (geoCards[id]);
} catch (error) {
  next (error);
}
})

app.use ((req, res, err, next) => {
  res.status(500).json('Internal API Error')
})

app.listen( PORT ,()=>{
  console.log('Servidor Encendido')
})