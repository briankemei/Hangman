import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import docClient from "../db/dynamoClient.js";
import dotenv from "dotenv";

dotenv.config();

const TABLE_NAME = process.env.TABLE_NAME;

export async function getPlayer(req, res) {
  try {
    const { name } = req.params;

    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { name }
      })
    );

    if (!result.Item) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(result.Item);
  } catch (error) {
    console.error("GET player error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createPlayer(req, res) {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Player name is required" });
    }

    const player = {
      name: name.trim(),
      wins: 0,
      losses: 0
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: player
      })
    );

    res.status(201).json(player);
  } catch (error) {
    console.error("POST player error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function updatePlayer(req, res) {
  try {
    const { name } = req.params;
    const { wins, losses } = req.body;

    if (wins === undefined || losses === undefined) {
      return res.status(400).json({ message: "Wins and losses are required" });
    }

    const result = await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { name },
        UpdateExpression: "SET wins = :wins, losses = :losses",
        ExpressionAttributeValues: {
          ":wins": wins,
          ":losses": losses
        },
        ReturnValues: "ALL_NEW"
      })
    );

    res.json(result.Attributes);
  } catch (error) {
    console.error("PUT player error:", error);
    res.status(500).json({ message: "Server error" });
  }
}