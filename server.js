const express = require("express");
const Database = require("./database/db_class");
const expressConfig = require("./config/expressConfig");
const environment = require("./config/environment");
const { BuildRepo } = require("./config/repositoryLocator");
const amqp = require("amqplib");

const app = express();
const server = require("http").createServer(app);
const UserService = require("./api/services/userService");
//create database connection
async function startServer() {
  // Create database connection
  const db = new Database();
  try {
    await db.init(); // Assuming init() returns a Promise

    expressConfig(app);
    const repo = BuildRepo().userRepository;
    let connection, channel;
    async function connectToRabbitMQ() {
      const amqpServer = environment.amqp.url;
      connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      await channel.assertQueue("create_user_service");
    }

    connectToRabbitMQ().then(() => {
      channel.consume("create_user_service", async (data) => {
        // order service queue listens to this queue
        //read the data from the data.content buffer

        const user = JSON.parse(data.content.toString());
        const { Name: firstName, Email: email, Paswrd: password } = user;
        const userService = new UserService(repo);
        const newUser = await userService.createUser({
          firstName,
          email,
          password,
        });
        if (newUser) {
          channel.ack(data);
        }
        //   channel.sendToQueue(
        //     "product-service-queue",
        //     Buffer.from(JSON.stringify(newOrder))
        //   );
      });
    });

    const PORT = environment.server.port;
    app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
    process.on("beforeExit", () => {
      console.log("closing");
      connection.close();
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    // Handle the error appropriately
  }
}
startServer();
