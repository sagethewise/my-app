import { NextResponse } from "next/server";

export async function GET() {
  const latestUpdates = [
    { id: 1, title: "New Feature Released", date: "2024-04-15" },
    { id: 2, title: "System Maintenance", date: "2024-04-10" }
  ];
  
  return NextResponse.json(latestUpdates);
}
