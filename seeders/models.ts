import { Pool } from "pg";
import { connectPostgres } from "../src";
const models = [
  { name: "A3", brand: "Audi" },
  { name: "A4", brand: "Audi" },
  { name: "A6", brand: "Audi" },
  { name: "Q5", brand: "Audi" },
  { name: "3 Series", brand: "BMW" },
  { name: "5 Series", brand: "BMW" },
  { name: "X3", brand: "BMW" },
  { name: "X5", brand: "BMW" },
  { name: "Silverado", brand: "Chevrolet" },
  { name: "Malibu", brand: "Chevrolet" },
  { name: "Equinox", brand: "Chevrolet" },
  { name: "Cruze", brand: "Chevrolet" },
  { name: "Charger", brand: "Dodge" },
  { name: "Challenger", brand: "Dodge" },
  { name: "Durango", brand: "Dodge" },
  { name: "Journey", brand: "Dodge" },
  { name: "F-150", brand: "Ford" },
  { name: "Mustang", brand: "Ford" },
  { name: "Explorer", brand: "Ford" },
  { name: "Escape", brand: "Ford" },
  { name: "Sierra", brand: "GMC" },
  { name: "Terrain", brand: "GMC" },
  { name: "Yukon", brand: "GMC" },
  { name: "Acadia", brand: "GMC" },
  { name: "Civic", brand: "Honda" },
  { name: "Accord", brand: "Honda" },
  { name: "CR-V", brand: "Honda" },
  { name: "Pilot", brand: "Honda" },
  { name: "Elantra", brand: "Hyundai" },
  { name: "Sonata", brand: "Hyundai" },
  { name: "Tucson", brand: "Hyundai" },
  { name: "Santa Fe", brand: "Hyundai" },
  { name: "Q50", brand: "Infiniti" },
  { name: "Q60", brand: "Infiniti" },
  { name: "QX50", brand: "Infiniti" },
  { name: "QX80", brand: "Infiniti" },
  { name: "Cherokee", brand: "Jeep" },
  { name: "Grand Cherokee", brand: "Jeep" },
  { name: "Wrangler", brand: "Jeep" },
  { name: "Compass", brand: "Jeep" },
  { name: "Optima", brand: "Kia" },
  { name: "Forte", brand: "Kia" },
  { name: "Sorento", brand: "Kia" },
  { name: "Sportage", brand: "Kia" },
  { name: "ES", brand: "Lexus" },
  { name: "RX", brand: "Lexus" },
  { name: "NX", brand: "Lexus" },
  { name: "IS", brand: "Lexus" },
  { name: "3", brand: "Mazda" },
  { name: "6", brand: "Mazda" },
  { name: "CX-5", brand: "Mazda" },
  { name: "CX-9", brand: "Mazda" },
  { name: "C-Class", brand: "Mercedes-Benz" },
  { name: "E-Class", brand: "Mercedes-Benz" },
  { name: "GLC", brand: "Mercedes-Benz" },
  { name: "GLE", brand: "Mercedes-Benz" },
  { name: "Outlander", brand: "Mitsubishi" },
  { name: "Eclipse Cross", brand: "Mitsubishi" },
  { name: "Mirage", brand: "Mitsubishi" },
  { name: "Pajero", brand: "Mitsubishi" },
  { name: "Altima", brand: "Nissan" },
  { name: "Maxima", brand: "Nissan" },
  { name: "Rogue", brand: "Nissan" },
  { name: "Sentra", brand: "Nissan" },
  { name: "911", brand: "Porsche" },
  { name: "Cayenne", brand: "Porsche" },
  { name: "Macan", brand: "Porsche" },
  { name: "Panamera", brand: "Porsche" },
  { name: "1500", brand: "Ram" },
  { name: "2500", brand: "Ram" },
  { name: "3500", brand: "Ram" },
  { name: "ProMaster", brand: "Ram" },
  { name: "Model 3", brand: "Tesla" },
  { name: "Model S", brand: "Tesla" },
  { name: "Model X", brand: "Tesla" },
  { name: "Model Y", brand: "Tesla" },
  { name: "Camry", brand: "Toyota" },
  { name: "Corolla", brand: "Toyota" },
  { name: "RAV4", brand: "Toyota" },
  { name: "Highlander", brand: "Toyota" },
  { name: "Golf", brand: "Volkswagen" },
  { name: "Jetta", brand: "Volkswagen" },
  { name: "Passat", brand: "Volkswagen" },
  { name: "Tiguan", brand: "Volkswagen" },

  // Additional models
  { name: "ILX", brand: "Acura" },
  { name: "MDX", brand: "Acura" },
  { name: "RDX", brand: "Acura" },
  { name: "TLX", brand: "Acura" },
  { name: "Giulia", brand: "Alfa Romeo" },
  { name: "Stelvio", brand: "Alfa Romeo" },
  { name: "4C", brand: "Alfa Romeo" },
  { name: "Tonale", brand: "Alfa Romeo" },
  { name: "DB11", brand: "Aston Martin" },
  { name: "DBS", brand: "Aston Martin" },
  { name: "Vantage", brand: "Aston Martin" },
  { name: "DBX", brand: "Aston Martin" },
  { name: "Continental GT", brand: "Bentley" },
  { name: "Flying Spur", brand: "Bentley" },
  { name: "Bentayga", brand: "Bentley" },
  { name: "Mulsanne", brand: "Bentley" },
  { name: "Enclave", brand: "Buick" },
  { name: "Encore", brand: "Buick" },
  { name: "Envision", brand: "Buick" },
  { name: "LaCrosse", brand: "Buick" },
  { name: "CT4", brand: "Cadillac" },
  { name: "CT5", brand: "Cadillac" },
  { name: "Escalade", brand: "Cadillac" },
  { name: "XT5", brand: "Cadillac" },
  { name: "300", brand: "Chrysler" },
  { name: "Pacifica", brand: "Chrysler" },
  { name: "Voyager", brand: "Chrysler" },
  { name: "C3", brand: "Citroen" },
  { name: "C4", brand: "Citroen" },
  { name: "C5", brand: "Citroen" },
  { name: "Berlingo", brand: "Citroen" },
  { name: "Sandero", brand: "Dacia" },
  { name: "Duster", brand: "Dacia" },
  { name: "Logan", brand: "Dacia" },
  { name: "Spring", brand: "Dacia" },
  { name: "F8 Tributo", brand: "Ferrari" },
  { name: "SF90 Stradale", brand: "Ferrari" },
  { name: "Roma", brand: "Ferrari" },
  { name: "Portofino", brand: "Ferrari" },
  { name: "500", brand: "Fiat" },
  { name: "Panda", brand: "Fiat" },
  { name: "Tipo", brand: "Fiat" },
  { name: "500X", brand: "Fiat" },
  { name: "Aventador", brand: "Lamborghini" },
  { name: "Huracan", brand: "Lamborghini" },
  { name: "Urus", brand: "Lamborghini" },
  { name: "Sian", brand: "Lamborghini" },
  { name: "Evora", brand: "Lotus" },
  { name: "Elise", brand: "Lotus" },
  { name: "Emira", brand: "Lotus" },
  { name: "Evija", brand: "Lotus" },
  { name: "Ghibli", brand: "Maserati" },
  { name: "Levante", brand: "Maserati" },
  { name: "Quattroporte", brand: "Maserati" },
  { name: "MC20", brand: "Maserati" },
  { name: "720S", brand: "McLaren" },
  { name: "GT", brand: "McLaren" },
  { name: "Artura", brand: "McLaren" },
  { name: "765LT", brand: "McLaren" },
  { name: "Astra", brand: "Opel" },
  { name: "Corsa", brand: "Opel" },
  { name: "Mokka", brand: "Opel" },
  { name: "Insignia", brand: "Opel" },
  { name: "208", brand: "Peugeot" },
  { name: "308", brand: "Peugeot" },
  { name: "3008", brand: "Peugeot" },
  { name: "5008", brand: "Peugeot" },
  { name: "Clio", brand: "Renault" },
  { name: "Megane", brand: "Renault" },
  { name: "Captur", brand: "Renault" },
  { name: "Zoe", brand: "Renault" },
  { name: "Leon", brand: "Seat" },
  { name: "Ibiza", brand: "Seat" },
  { name: "Ateca", brand: "Seat" },
  { name: "Arona", brand: "Seat" },
  { name: "Octavia", brand: "Skoda" },
  { name: "Superb", brand: "Skoda" },
  { name: "Kodiaq", brand: "Skoda" },
  { name: "Karoq", brand: "Skoda" },
  { name: "Impreza", brand: "Subaru" },
  { name: "Outback", brand: "Subaru" },
  { name: "Forester", brand: "Subaru" },
  { name: "WRX", brand: "Subaru" },
  { name: "Swift", brand: "Suzuki" },
  { name: "Vitara", brand: "Suzuki" },
  { name: "Jimny", brand: "Suzuki" },
  { name: "S-Cross", brand: "Suzuki" },
  { name: "Harrier", brand: "Tata" },
  { name: "Nexon", brand: "Tata" },
  { name: "Safari", brand: "Tata" },
  { name: "Altroz", brand: "Tata" },
];

async function getBrandId(brandName: string, db: Pool) {
  const result = await db.query("SELECT id FROM brands WHERE name = $1", [
    brandName,
  ]);
  return result.rows[0].id;
}

async function seedModels() {
  const db = await connectPostgres();
  try {
    for (const model of models) {
      const brandId = await getBrandId(model.brand, db);
      await db.query("INSERT INTO models (name, brand_id) VALUES ($1, $2) ", [
        model.name,
        brandId,
      ]);
    }
    console.log("Models seeded successfully");
  } catch (error) {
    console.error("Error seeding roles:", error);
  } finally {
    await db.end();
  }
}

seedModels();
