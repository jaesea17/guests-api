import { Client } from "pg";
import { loadEnv } from "../../src/loadEnv";

// const configService = loadEnv();

const client = new Client({
  host: "localhost",
  port: 3000,
  user: "postgres_",
  password: "Postgres17",
  database: "guests",
});

(async () => {
  try {
    const query = `
        INSERT INTO roles(id, permissions, "roleType")
        VALUES($1, $2, $3)
    `;
    const values = ["01d4f47b-ea93-48e9-a306-50dd9bac14f8", ["read"], "user"];

    console.log("trying to connect to database");
    await client.connect();
    console.log("successfully connected to database");

    console.log('trying to seed "ROLES" tables');
    await client.query(query, values);

    console.log("seeding successful");

    console.log("ending connecion");
    await client.end();
    console.log("exiting process");

    console.log("****************************************");
    console.log("****************************************");
    process.exit(0);
  } catch (err) {
    console.log("Failed because of the error:", err);

    await client.end();

    // Exit with an error code (non-zero)
    process.exit(1);
  }
})();
