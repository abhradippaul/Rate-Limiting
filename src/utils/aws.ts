import dotenv from "dotenv";
dotenv.config();

import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEYID!,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY!,
  region: process.env.AWS_REGION!,
});

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

export { ddb };
