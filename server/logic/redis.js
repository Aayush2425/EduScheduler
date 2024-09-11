// data -> cache -> final data done -> db store
import { NextResponse } from "next/server";

try {
  await client.connect();
  const { question, creatorId, questionNo } = await req.json();
  await client.get(creatorId);

  const redisKey = `quiz:${creatorId}`;

  // Store the first question
  await client.hSet(redisKey, questionNo, JSON.stringify(question));
  await client.quit();
  return NextResponse.json(
    { success: true, message: "Question added to cache" },
    { status: 200 }
  );
} catch (error) {
  console.log(error);
  await client.quit();
  return NextResponse.json(
    { success: false, message: "Error while adding question to cache" },
    { status: 500 }
  );
}
