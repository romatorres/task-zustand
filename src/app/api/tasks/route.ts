import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/tasks
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

// POST /api/tasks
export async function POST(request: Request) {
  const { text, description } = await request.json();
  const task = await prisma.task.create({
    data: {
      text,
      description,
    },
  });
  return NextResponse.json(task);
}

// PUT /api/tasks/:id
export async function PUT(request: Request) {
  const { id, text, description, done } = await request.json();
  const task = await prisma.task.update({
    where: { id },
    data: { text, description, done },
  });
  return NextResponse.json(task);
}

// DELETE /api/tasks/:id
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.task.delete({
    where: { id },
  });
  return NextResponse.json({ success: true });
}
