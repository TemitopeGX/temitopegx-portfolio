import { connectToDatabase } from "./db.js";

async function testDatabaseOperations() {
  let client;
  try {
    // Connect to database
    client = await connectToDatabase();
    const db = client.db("ecommerce"); // Your database name
    const products = db.collection("products"); // Collection name

    // CREATE - Insert a document
    const newProduct = {
      name: "Test Product",
      price: 29.99,
      description: "This is a test product",
      createdAt: new Date(),
    };
    const insertResult = await products.insertOne(newProduct);
    console.log("Inserted product:", insertResult.insertedId);

    // READ - Find documents
    const foundProduct = await products.findOne({ name: "Test Product" });
    console.log("Found product:", foundProduct);

    // UPDATE - Modify a document
    const updateResult = await products.updateOne(
      { name: "Test Product" },
      { $set: { price: 39.99 } }
    );
    console.log("Updated product count:", updateResult.modifiedCount);

    // READ - Verify update
    const updatedProduct = await products.findOne({ name: "Test Product" });
    console.log("Updated product:", updatedProduct);

    // DELETE - Remove a document
    const deleteResult = await products.deleteOne({ name: "Test Product" });
    console.log("Deleted product count:", deleteResult.deletedCount);
  } catch (error) {
    console.error("Database operation failed:", error);
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
}

// Run the test
testDatabaseOperations();
