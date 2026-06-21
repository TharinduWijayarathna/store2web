import { pool } from "../db";

const resetDatabase = async () => {
  await pool.query(`
    TRUNCATE TABLE
      admin_audit_logs,
      product_categories,
      pages,
      products,
      categories,
      store_memberships,
      stores,
      users
    RESTART IDENTITY CASCADE
  `);
};

export { resetDatabase };
