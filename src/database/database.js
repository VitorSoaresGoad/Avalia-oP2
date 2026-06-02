import * as SQLite from 'expo-sqlite';

let banco;

export async function conectarBanco() {
  if (!banco) {
    banco = await SQLite.openDatabaseAsync('gastos.db');
    await banco.execAsync(`PRAGMA journal_mode = WAL`);
  }
  return banco;
}

export async function criarTabela() {
  const db = await conectarBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS gastos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      categoria TEXT NOT NULL,
      valor REAL NOT NULL,
      data TEXT NOT NULL
    );
  `);
}

export async function adicionarGasto(descricao, categoria, valor, data) {
  const db = await conectarBanco();
  const resultado = await db.runAsync(
    'INSERT INTO gastos (descricao, categoria, valor, data) VALUES (?, ?, ?, ?);',
    descricao, categoria, valor, data
  );
  return resultado.lastInsertRowId;
}

export async function listarGastos() {
  const db = await conectarBanco();
  const gastos = await db.getAllAsync('SELECT * FROM gastos ORDER BY id DESC;');
  return gastos;
}

export async function deletarGasto(id) {
  const db = await conectarBanco();
  await db.runAsync('DELETE FROM gastos WHERE id = ?;', id);
}

export async function atualizarGasto(id, descricao, categoria, valor, data) {
  const db = await conectarBanco();
  await db.runAsync(
    'UPDATE gastos SET descricao = ?, categoria = ?, valor = ?, data = ? WHERE id = ?;',
    descricao, categoria, valor, data, id
  );
}