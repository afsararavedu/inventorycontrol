
import { db } from "./db";
import { 
  dailySales, orders, 
  type DailySale, type InsertDailySale,
  type Order, type InsertOrder 
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Sales
  getDailySales(): Promise<DailySale[]>;
  bulkUpdateDailySales(sales: InsertDailySale[]): Promise<DailySale[]>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  bulkCreateOrders(orders: InsertOrder[]): Promise<Order[]>;
}

export class DatabaseStorage implements IStorage {
  // Sales
  async getDailySales(): Promise<DailySale[]> {
    return await db.select().from(dailySales);
  }

  async bulkUpdateDailySales(salesData: InsertDailySale[]): Promise<DailySale[]> {
    // For simplicity, we'll wipe and recreate, or update if ID exists.
    // Since this is a "daily sales" sheet which might be reset or updated, 
    // let's assume we are updating existing records or inserting new ones.
    // For this specific use case (saving the whole table state), 
    // we can use a transaction to upsert.
    
    // However, the simplest "Save Sales" implementation for a daily sheet 
    // often implies saving the current snapshot.
    // Let's iterate and upsert.
    
    const results: DailySale[] = [];
    
    // In a real app, this should be a transaction.
    for (const sale of salesData) {
        // If we had IDs from frontend, we'd update. 
        // But InsertDailySale omits ID. 
        // We'll rely on brandNumber as a pseudo-key for this demo or just insert.
        // Actually, let's clear and re-insert for this specific "snapshot" behavior
        // if we want to represent "Current Day's Sales".
        // But that might be destructive.
        // Let's just insert for now to append history, or upsert if we had keys.
        // Given the requirement is just "Save to DB", appending is safest.
        
        const [inserted] = await db.insert(dailySales).values(sale).returning();
        results.push(inserted);
    }
    return results;
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async bulkCreateOrders(ordersData: InsertOrder[]): Promise<Order[]> {
    if (ordersData.length === 0) return [];
    return await db.insert(orders).values(ordersData).returning();
  }
}

export const storage = new DatabaseStorage();
