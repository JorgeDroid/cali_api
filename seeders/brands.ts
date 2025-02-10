import { connectPostgres } from "../src";

const brands = [
  { name: "Acura" },
  { name: "Alfa Romeo" },
  { name: "Aston Martin" },
  { name: "Audi" },
  { name: "Bentley" },
  { name: "BMW" },
  { name: "Buick" },
  { name: "Cadillac" },
  { name: "Chevrolet" },
  { name: "Chrysler" },
  { name: "Citroen" },
  { name: "Dacia" },
  { name: "Dodge" },
  { name: "Ferrari" },
  { name: "Fiat" },
  { name: "Ford" },
  { name: "GMC" },
  { name: "Honda" },
  { name: "Hyundai" },
  { name: "Infiniti" },
  { name: "Jeep" },
  { name: "Kia" },
  { name: "Lamborghini" },
  { name: "Lexus" },
  { name: "Lotus" },
  { name: "Maserati" },
  { name: "Mazda" },
  { name: "McLaren" },
  { name: "Mercedes-Benz" },
  { name: "Mitsubishi" },
  { name: "Nissan" },
  { name: "Opel" },
  { name: "Peugeot" },
  { name: "Porsche" },
  { name: "Ram" },
  { name: "Renault" },
  { name: "Seat" },
  { name: "Skoda" },
  { name: "Subaru" },
  { name: "Suzuki" },
  { name: "Tata" },
  { name: "Tesla" },
  { name: "Toyota" },
  { name: "Volkswagen" },
];

async function seedBrands() {
  const db = await connectPostgres();
  try {
    for (const brand of brands) {
      await db.query("INSERT INTO brands (name) VALUES ($1)", [brand.name]);
    }
    console.log("Brands seeded successfully");
  } catch (error) {
    console.error("Error seeding brands:", error);
  } finally {
    await db.end();
  }
}

seedBrands();
