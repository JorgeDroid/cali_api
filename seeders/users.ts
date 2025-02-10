import { IClientCreationDto } from "../src/schemas/Client";
import { connectPostgres } from "../src";

const sampleClients: IClientCreationDto[] = [
  {
    name: "John",
    last_name: "Smith",
    email: "john.smith@email.com",
    phone: "415-555-0101",
    password: "SecurePass123!",
  },
  {
    name: "Emma",
    last_name: "Johnson",
    email: "emma.j@email.com",
    phone: "310-555-0102",
    password: "EmmaPass456!",
  },
  {
    name: "Michael",
    last_name: "Williams",
    email: "m.williams@email.com",
    phone: "818-555-0103",
    password: "MikeW789!",
  },
  {
    name: "Sarah",
    last_name: "Brown",
    email: "sarah.brown@email.com",
    phone: "213-555-0104",
    password: "SarahB2024!",
  },
  {
    name: "David",
    last_name: "Jones",
    email: "d.jones@email.com",
    phone: "408-555-0105",
    password: "DavidJ567!",
  },
  {
    name: "Lisa",
    last_name: "Garcia",
    email: "l.garcia@email.com",
    phone: "323-555-0106",
    password: "LisaG890!",
  },
  {
    name: "James",
    last_name: "Miller",
    email: "james.m@email.com",
    phone: "650-555-0107",
    password: "JamesM234!",
  },
  {
    name: "Jennifer",
    last_name: "Davis",
    email: "jen.davis@email.com",
    phone: "510-555-0108",
    password: "JenD678!",
  },
  {
    name: "Robert",
    last_name: "Martinez",
    email: "r.martinez@email.com",
    phone: "626-555-0109",
    password: "RobertM901!",
  },
  {
    name: "Maria",
    last_name: "Rodriguez",
    email: "m.rodriguez@email.com",
    phone: "562-555-0110",
    password: "MariaR345!",
  },
  {
    name: "William",
    last_name: "Anderson",
    email: "w.anderson@email.com",
    phone: "619-555-0111",
    password: "WillA678!",
  },
  {
    name: "Patricia",
    last_name: "Taylor",
    email: "pat.taylor@email.com",
    phone: "714-555-0112",
    password: "PatT912!",
  },
  {
    name: "Richard",
    last_name: "Thomas",
    email: "r.thomas@email.com",
    phone: "805-555-0113",
    password: "RichT234!",
  },
  {
    name: "Elizabeth",
    last_name: "Moore",
    email: "e.moore@email.com",
    phone: "909-555-0114",
    password: "ElizM567!",
  },
  {
    name: "Joseph",
    last_name: "Jackson",
    email: "j.jackson@email.com",
    phone: "925-555-0115",
    password: "JoeJ890!",
  },
  {
    name: "Margaret",
    last_name: "White",
    email: "m.white@email.com",
    phone: "831-555-0116",
    password: "MargW123!",
  },
  {
    name: "Thomas",
    last_name: "Harris",
    email: "t.harris@email.com",
    phone: "707-555-0117",
    password: "TomH456!",
  },
  {
    name: "Sandra",
    last_name: "Martin",
    email: "s.martin@email.com",
    phone: "415-555-0118",
    password: "SandraM789!",
  },
  {
    name: "Charles",
    last_name: "Thompson",
    email: "c.thompson@email.com",
    phone: "310-555-0119",
    password: "CharlesT012!",
  },
  {
    name: "Ashley",
    last_name: "Garcia",
    email: "a.garcia@email.com",
    phone: "818-555-0120",
    password: "AshleyG345!",
  },
  {
    name: "Daniel",
    last_name: "Martinez",
    email: "d.martinez@email.com",
    phone: "213-555-0121",
    password: "DanielM678!",
  },
  {
    name: "Nancy",
    last_name: "Robinson",
    email: "n.robinson@email.com",
    phone: "408-555-0122",
    password: "NancyR901!",
  },
  {
    name: "Paul",
    last_name: "Clark",
    email: "p.clark@email.com",
    phone: "323-555-0123",
    password: "PaulC234!",
  },
  {
    name: "Betty",
    last_name: "Rodriguez",
    email: "b.rodriguez@email.com",
    phone: "650-555-0124",
    password: "BettyR567!",
  },
  {
    name: "Mark",
    last_name: "Lewis",
    email: "m.lewis@email.com",
    phone: "510-555-0125",
    password: "MarkL890!",
  },
  {
    name: "Dorothy",
    last_name: "Lee",
    email: "d.lee@email.com",
    phone: "626-555-0126",
    password: "DorothyL123!",
  },
  {
    name: "George",
    last_name: "Walker",
    email: "g.walker@email.com",
    phone: "562-555-0127",
    password: "GeorgeW456!",
  },
  {
    name: "Helen",
    last_name: "Hall",
    email: "h.hall@email.com",
    phone: "619-555-0128",
    password: "HelenH789!",
  },
  {
    name: "Kenneth",
    last_name: "Allen",
    email: "k.allen@email.com",
    phone: "714-555-0129",
    password: "KenA012!",
  },
  {
    name: "Karen",
    last_name: "Young",
    email: "k.young@email.com",
    phone: "805-555-0130",
    password: "KarenY345!",
  },
];

async function seedUsers() {
  const db = await connectPostgres();
  try {
    for (const user of sampleClients) {
      await db.query(
        "INSERT INTO users (name,last_name,email,phone,password) VALUES ($1,$2,$3,$4,$5) ",
        [user.name, user.last_name, user.email, user.phone, user.password]
      );
    }
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await db.end();
  }
}

seedUsers();
