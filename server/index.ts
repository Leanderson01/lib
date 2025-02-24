import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Configurar dotenv para ler o arquivo .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Verificar se as variáveis de ambiente estão sendo lidas
console.log('Configurações do banco de dados:');
console.log('Host:', process.env.DB_ADDRESS);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_ADDRESS,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testar conexão e listar tabelas
pool.getConnection()
  .then(async connection => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    
    try {
      // Listar todas as tabelas
    //   const [tables] = await connection.query('SHOW TABLES');
    //   console.log('\nTabelas existentes no banco de dados:');
    //   console.log(tables);

    //   // Para cada tabela, mostrar sua estrutura
    //   for (const table of Object.values(tables as { [key: string]: string }[])) {
    //     const tableName = Object.values(table)[0];
    //     const [structure] = await connection.query('DESCRIBE ??', [tableName]);
    //     console.log(`\nEstrutura da tabela ${tableName}:`);
    //     console.log(structure);
    //   }
    const [rows] = await pool.execute('SELECT * FROM Livro');
    console.log(rows);
    } catch (error) {
      console.error('Erro ao listar tabelas:', error);
    } finally {
      connection.release();
    }
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

// Rotas de Autenticação
app.post('/auth/login', async (req, res) => {
  try {
    const { email } = req.body;
    const [rows] = await pool.execute(
      'SELECT * FROM Usuario WHERE email = ?',
      [email]
    );
    
    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0];
      res.json({ 
        token: 'jwt_token_aqui', 
        user: {
          usuario_id: user.usuario_id,
          nome: user.nome,
          email: user.email,
          telefone: user.telefone
        }
      });
    } else {
      res.status(401).json({ 
        message: 'Email não encontrado. Verifique suas credenciais ou cadastre-se.' 
      });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ 
      message: 'Erro ao processar login. Tente novamente mais tarde.' 
    });
  }
});

app.post('/auth/registro', async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    
    // Verificar se o email já existe
    const [existingUser] = await pool.execute(
      'SELECT * FROM Usuario WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return res.status(400).json({ 
        message: 'Este email já está cadastrado. Por favor, use outro email.' 
      });
    }

    // Garantir que telefone seja null se estiver vazio ou undefined
    const telefoneValue = telefone || null;

    // Inserir novo usuário
    const [result] = await pool.execute(
      'INSERT INTO Usuario (nome, email, telefone) VALUES (?, ?, ?)',
      [nome, email, telefoneValue]
    );

    res.json({ 
      message: 'Usuário cadastrado com sucesso!',
      user: {
        usuario_id: (result as any).insertId,
        nome,
        email,
        telefone: telefoneValue
      }
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ 
      message: 'Erro ao cadastrar usuário. Tente novamente mais tarde.' 
    });
  }
});

// Rotas de Livros
app.get('/livros', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM livros');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar livros' });
  }
});

app.get('/livros/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM livros WHERE id = ?', [req.params.id]);
    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar livro' });
  }
});

// Rotas de Autores
app.get('/autores', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM autores');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar autores' });
  }
});

app.get('/autores/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM autores WHERE id = ?', [req.params.id]);
    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Autor não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar autor' });
  }
});

// Rotas de Categorias
app.get('/categorias', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categorias');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
});

app.get('/categorias/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categorias WHERE id = ?', [req.params.id]);
    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categoria' });
  }
});

// Rotas de Reservas
app.get('/reservas', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM reservas');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar reservas' });
  }
});

app.post('/reservas', async (req, res) => {
  try {
    const { livro_id, data_reserva, data_entrega } = req.body;
    await pool.execute(
      'INSERT INTO reservas (livro_id, data_reserva, data_entrega) VALUES (?, ?, ?)',
      [livro_id, data_reserva, data_entrega]
    );
    res.json({ message: 'Reserva criada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar reserva' });
  }
});

app.delete('/reservas/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM reservas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Reserva cancelada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cancelar reserva' });
  }
});

// Rotas de Usuários
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Usuario');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Usuario WHERE usuario_id = ?', [req.params.id]);
    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 