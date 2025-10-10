import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("686dacd60019e9848f0b");

export const account = new Account(client);

export default client;
