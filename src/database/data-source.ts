import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,    // Set to false for migrations
  logging: true,
  entities: [__dirname + "/../**/*.entity.{ts,js}"],      // Add your entities here
  migrations: ["src/database/migrations/*.ts"],  // Define the location of migration files
});
