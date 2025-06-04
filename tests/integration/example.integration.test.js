// tests/integration/example.integration.test.js
const { Client } = require('pg');

describe('PostgreSQL 통합 테스트', () => {
  let client;

  beforeAll(async () => {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect();

    // 테스트용 테이블 생성
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);
  });

  afterAll(async () => {
    await client.query(`DROP TABLE IF EXISTS users;`);
    await client.end();
  });

  it('데이터를 삽입하고 조회할 수 있어야 한다', async () => {
    await client.query(`INSERT INTO users(name) VALUES($1)`, ['Alice']);
    const res = await client.query(`SELECT * FROM users WHERE name = $1`, ['Alice']);
    expect(res.rows.length).toBe(1);
    expect(res.rows[0].name).toBe('Alice');
  });
});