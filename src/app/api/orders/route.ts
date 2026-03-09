export async function POST(req: Request) {
 const order = await req.json()

  const newOrder = {
   ...order,
   id: crypto.randomUUID(),
   createdAt: new Date(),
   status: "pending"
 }
 console.log("Order received:", newOrder)

 return Response.json({
  success: true,
  orderId: newOrder.id
 })
}