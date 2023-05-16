// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "./dynamoClient.js/index.js";

// Set the parameters
export const params = {
  TableName: "orders",
  Item: {
    id: { S: "2" },
    phone: { S: "aTitle" },
  },
};

export const run = async () => {
  try {
    const data = await dynamoClient.send(new PutItemCommand(params));
    console.log("success");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
run();
