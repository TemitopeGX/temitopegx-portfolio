import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";

export async function getProducts() {
  const client = await clientPromise;
  const db = client.db("ecommerce");
  const products = await db.collection("products").find({}).toArray();
  return products;
}

export async function addProduct(product) {
  const client = await clientPromise;
  const db = client.db("ecommerce");
  const result = await db.collection("products").insertOne({
    ...product,
    createdAt: new Date(),
  });
  return result;
}

export async function updateProduct(id, updates) {
  const client = await clientPromise;
  const db = client.db("ecommerce");
  const result = await db
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
  return result;
}

export async function deleteProduct(id) {
  const client = await clientPromise;
  const db = client.db("ecommerce");
  const result = await db.collection("products").deleteOne({
    _id: new ObjectId(id),
  });
  return result;
}
