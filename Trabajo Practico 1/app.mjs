import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://Grupo-17:grupo17@cursadanodejs.ls9ii.mongodb.net/Node-js")
.then(()=>{
    console.log("Coneccion Exitosa");
})
.catch(error =>{
    console.log("Error al conectar mongo db", error);
})

const superHeroeSchema = new mongoose.Schema(
    {
        nombreSuperHeroe: {type:String, required:true},
        nombreReal:{type:String, required:true},
        edad:{type:Number, min:0},
        planetaOrigen:{type:String, default:'desconocido'},
        debilidad:[String],
        poderes:[String],
        aliados:[String],
        enemigos:[String],
        createdAt: {type: Date, default: Date.now},
        creador: String,
    },
    {collection:"Grupo-17"}
);

const superHero = mongoose.model('SuperHeroes',superHeroeSchema);

async function insertSuperHero() {
    const hero = new superHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioctiva',
        poderes: ['Trepar Paredes','Sentido Arácnido', 'Super Fuerza', 'Agilidad,'],
        aliados: ['Iron Man'],
        enemigos: ['Duene Verde'],
        creador: 'Martin'
    });
    await hero.save();
    console.log("superheroe insertado", hero);
}

async function updateSuperHero(nombreSuperHeroe) {
    
    const result = await superHero.updateOne(
      
            {nombreSuperHeroe: nombreSuperHeroe},
            {$set: {edad: 26}}        
    );
    console.log("resultado de la actualizacion:", result);
}


async function deleteSuperHero(nombreSuperHeroe) {
    const result = await superHero.deleteOne(
        {nombreSuperHeroe: nombreSuperHeroe}
    );
    console.log('superheroe eliminado', result);
    
}



async function findSuperHero() {

    const result = superHero.find({ planetaOrigen: 'Tierra' });
    console.log("Superheroes Encontrados", result);
}

insertSuperHero();
updateSuperHero('Spiderman');
findSuperHero();
deleteSuperHero('Spiderman')
