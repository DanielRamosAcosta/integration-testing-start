export function up(client) {
  return client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INT NOT NULL
    )
  `)
}

export function down(client) {
  return client.query(`
    DROP TABLE IF EXISTS users
  `)
}
