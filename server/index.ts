import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Interfaces para tipagem
interface Usuario {
  usuario_id: number;
  nome: string;
  email: string;
  telefone: string | null;
}

interface Livro {
  livro_id: number;
  titulo: string;
  isbn: string;
  ano_publicacao: number | null;
  editora: string | null;
  categoria_id: number | null;
  categoria_nome?: string;
}

interface Autor {
  autor_id: number;
  nome: string;
  nacionalidade: string | null;
}

interface Categoria {
  categoria_id: number;
  nome: string;
}

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
      // const [tables] = await connection.query('SHOW TABLES');
      // console.log('\nTabelas existentes no banco de dados:');
      // console.log(tables);

      // // Para cada tabela, mostrar sua estrutura
      // for (const table of Object.values(tables as { [key: string]: string }[])) {
      //   const tableName = Object.values(table)[0];
      //   const [structure] = await connection.query('DESCRIBE ??', [tableName]);
      //   console.log(`\nEstrutura da tabela ${tableName}:`);
      //   console.log(structure);
      // }
    const [rows] = await pool.execute('SELECT * FROM Livro_Autor');
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
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      'SELECT * FROM Usuario WHERE email = ?',
      [email]
    );
    
    if (rows.length > 0) {
      const user = rows[0] as Usuario;
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
    const [existingUser] = await pool.execute<mysql.RowDataPacket[]>(
      'SELECT * FROM Usuario WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ 
        message: 'Este email já está cadastrado. Por favor, use outro email.' 
      });
    }

    // Garantir que telefone seja null se estiver vazio ou undefined
    const telefoneValue = telefone || null;

    // Inserir novo usuário
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      'INSERT INTO Usuario (nome, email, telefone) VALUES (?, ?, ?)',
      [nome, email, telefoneValue]
    );

    res.json({ 
      message: 'Usuário cadastrado com sucesso!',
      user: {
        usuario_id: result.insertId,
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
    // Buscar livros com suas categorias
    const [livros] = await pool.execute<mysql.RowDataPacket[]>(`
      SELECT l.*, c.nome as categoria_nome
      FROM Livro l
      LEFT JOIN Categoria c ON l.categoria_id = c.categoria_id
    `);
    
    // Para cada livro, buscar seus autores
    const livrosComAutores = await Promise.all(livros.map(async (livro) => {
      const [autores] = await pool.execute<mysql.RowDataPacket[]>(`
        SELECT a.*
        FROM Autor a
        JOIN Livro_Autor la ON a.autor_id = la.autor_id
        WHERE la.livro_id = ?
      `, [livro.livro_id]);
      
      return {
        ...(livro as Livro),
        autores: autores as Autor[]
      };
    }));
    
    // Retornar os livros com seus autores
    res.json(livrosComAutores);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ message: 'Erro ao buscar livros' });
  }
});

app.get('/livros/:id', async (req, res) => {
  try {
    const [livros] = await pool.execute<mysql.RowDataPacket[]>(`
      SELECT l.*, c.nome as categoria_nome
      FROM Livro l
      LEFT JOIN Categoria c ON l.categoria_id = c.categoria_id
      WHERE l.livro_id = ?
    `, [req.params.id]);
    
    if (livros.length > 0) {
      const livro = livros[0] as Livro;
      
      // Buscar autores do livro
      const [autores] = await pool.execute<mysql.RowDataPacket[]>(`
        SELECT a.*
        FROM Autor a
        JOIN Livro_Autor la ON a.autor_id = la.autor_id
        WHERE la.livro_id = ?
      `, [livro.livro_id]);
      
      // Adicionar autores ao livro
      const livroComAutores = {
        ...livro,
        autores: autores as Autor[]
      };
      
      res.json(livroComAutores);
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ message: 'Erro ao buscar livro' });
  }
});

// Rotas de Autores
app.get('/autores', async (req, res) => {
  try {
    const [autores] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Autor');
    res.json(autores as Autor[]);
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    res.status(500).json({ message: 'Erro ao buscar autores' });
  }
});

app.get('/autores/:id', async (req, res) => {
  try {
    const [autores] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Autor WHERE autor_id = ?', [req.params.id]);
    if (autores.length > 0) {
      res.json(autores[0] as Autor);
    } else {
      res.status(404).json({ message: 'Autor não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar autor:', error);
    res.status(500).json({ message: 'Erro ao buscar autor' });
  }
});

// Rotas de Categorias
app.get('/categorias', async (req, res) => {
  try {
    const [categorias] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Categoria');
    res.json(categorias as Categoria[]);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
});

app.get('/categorias/:id', async (req, res) => {
  try {
    const [categorias] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Categoria WHERE categoria_id = ?', [req.params.id]);
    if (categorias.length > 0) {
      res.json(categorias[0] as Categoria);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ message: 'Erro ao buscar categoria' });
  }
});

// Rotas de Reservas
app.get('/reservas', async (req, res) => {
  try {
    const [reservas] = await pool.execute<mysql.RowDataPacket[]>(`
      SELECT r.*, l.titulo as livro_titulo, l.editora as livro_editora
      FROM Reserva r
      LEFT JOIN Livro l ON r.livro_id = l.livro_id
      ORDER BY r.data_reserva DESC
    `);
    
    res.json(reservas);
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    res.status(500).json({ message: 'Erro ao buscar reservas' });
  }
});

// Rota para buscar reservas do usuário logado (simulado)
app.get('/reservas/minhas', async (req, res) => {
  try {
    // Simulando um usuário logado com ID 1
    const usuarioId = 1;
    
    const [reservas] = await pool.execute<mysql.RowDataPacket[]>(`
      SELECT r.*, l.titulo as livro_titulo, l.editora as livro_editora, 
             l.ano_publicacao as livro_ano_publicacao
      FROM Reserva r
      LEFT JOIN Livro l ON r.livro_id = l.livro_id
      WHERE r.usuario_id = ?
      ORDER BY r.data_reserva DESC
    `, [usuarioId]);
    
    // Para cada reserva, buscar informações detalhadas do livro
    const reservasDetalhadas = await Promise.all(Array.isArray(reservas) ? reservas.map(async (reserva) => {
      if (reserva.livro_id) {
        const [livros] = await pool.execute<mysql.RowDataPacket[]>(`
          SELECT l.*, c.nome as categoria_nome
          FROM Livro l
          LEFT JOIN Categoria c ON l.categoria_id = c.categoria_id
          WHERE l.livro_id = ?
        `, [reserva.livro_id]);
        
        if (livros.length > 0) {
          const livro = livros[0];
          
          // Buscar autores do livro
          const [autores] = await pool.execute<mysql.RowDataPacket[]>(`
            SELECT a.*
            FROM Autor a
            JOIN Livro_Autor la ON a.autor_id = la.autor_id
            WHERE la.livro_id = ?
          `, [reserva.livro_id]);
          
          return {
            ...reserva,
            livro: {
              ...livro,
              autores: autores
            }
          };
        }
      }
      
      return reserva;
    }) : []);
    
    res.json(reservasDetalhadas);
  } catch (error) {
    console.error('Erro ao buscar reservas do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar reservas do usuário' });
  }
});

app.post('/reservas', async (req, res) => {
  try {
    const { livro_id, data_reserva } = req.body;
    
    // Simulando um usuário logado com ID 1
    const usuarioId = 1;
    
    // Verificar se o livro existe
    const [livros] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Livro WHERE livro_id = ?', [livro_id]);
    
    if (livros.length === 0) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    
    // Usar a data fornecida ou a data atual formatada corretamente
    const dataReserva = data_reserva || new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    // Inserir a reserva
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      'INSERT INTO Reserva (usuario_id, livro_id, data_reserva, status) VALUES (?, ?, ?, ?)',
      [usuarioId, livro_id, dataReserva, 'ATIVA']
    );
    
    const novaReserva = {
      reserva_id: result.insertId,
      usuario_id: usuarioId,
      livro_id,
      data_reserva: dataReserva,
      status: 'ATIVA'
    };
    
    res.status(201).json({ 
      message: 'Reserva criada com sucesso',
      reserva: novaReserva
    });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ message: 'Erro ao criar reserva' });
  }
});

app.patch('/reservas/:id/cancelar', async (req, res) => {
  try {
    const reservaId = req.params.id;
    
    // Verificar se a reserva existe
    const [reservas] = await pool.execute<mysql.RowDataPacket[]>(
      'SELECT * FROM Reserva WHERE reserva_id = ?',
      [reservaId]
    );
    
    if (reservas.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    
    // Atualizar o status da reserva
    await pool.execute(
      'UPDATE Reserva SET status = ? WHERE reserva_id = ?',
      ['CANCELADA', reservaId]
    );
    
    res.json({ 
      message: 'Reserva cancelada com sucesso',
      reserva: {
        ...reservas[0],
        status: 'CANCELADA'
      }
    });
  } catch (error) {
    console.error('Erro ao cancelar reserva:', error);
    res.status(500).json({ message: 'Erro ao cancelar reserva' });
  }
});

// Rotas de Usuários
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Usuario');
    res.json(rows as Usuario[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Usuario WHERE usuario_id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0] as Usuario);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
});

// Rota para buscar o usuário atual (baseado no token)
app.get('/usuarios/atual', async (req, res) => {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido ou inválido' });
    }
    
    // Em um sistema real, você decodificaria o token JWT para obter o ID do usuário
    // Aqui, estamos simulando isso usando o usuário com ID 1
    const usuarioId = 1;
    
    const [rows] = await pool.execute<mysql.RowDataPacket[]>('SELECT * FROM Usuario WHERE usuario_id = ?', [usuarioId]);
    
    if (rows.length > 0) {
      res.json(rows[0] as Usuario);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário atual' });
  }
});

// Rota para buscar livros por categoria
app.get('/livros/categoria/:id', async (req, res) => {
  try {
    const [livros] = await pool.execute<mysql.RowDataPacket[]>(`
      SELECT l.*, c.nome as categoria_nome
      FROM Livro l
      LEFT JOIN Categoria c ON l.categoria_id = c.categoria_id
      WHERE l.categoria_id = ?
    `, [req.params.id]);
    
    // Para cada livro, buscar seus autores
    const livrosComAutores = await Promise.all(livros.map(async (livro) => {
      const [autores] = await pool.execute<mysql.RowDataPacket[]>(`
        SELECT a.*
        FROM Autor a
        JOIN Livro_Autor la ON a.autor_id = la.autor_id
        WHERE la.livro_id = ?
      `, [livro.livro_id]);
      
      return {
        ...(livro as Livro),
        autores: autores as Autor[]
      };
    }));
    
    res.json(livrosComAutores);
  } catch (error) {
    console.error('Erro ao buscar livros por categoria:', error);
    res.status(500).json({ message: 'Erro ao buscar livros por categoria' });
  }
});

// Rota para buscar livros por autor
app.get('/livros/autor/:id', async (req, res) => {
  try {
    // Usar a tabela Livro_Autor para buscar os livros de um autor específico
    const [livros] = await pool.execute<mysql.RowDataPacket[]>(`
      SELECT l.*, c.nome as categoria_nome
      FROM Livro l
      LEFT JOIN Categoria c ON l.categoria_id = c.categoria_id
      JOIN Livro_Autor la ON l.livro_id = la.livro_id
      WHERE la.autor_id = ?
    `, [req.params.id]);
    
    // Para cada livro, buscar todos os seus autores (não apenas o autor solicitado)
    const livrosComAutores = await Promise.all(livros.map(async (livro) => {
      const [autores] = await pool.execute<mysql.RowDataPacket[]>(`
        SELECT a.*
        FROM Autor a
        JOIN Livro_Autor la ON a.autor_id = la.autor_id
        WHERE la.livro_id = ?
      `, [livro.livro_id]);
      
      return {
        ...(livro as Livro),
        autores: autores as Autor[]
      };
    }));
    
    res.json(livrosComAutores);
  } catch (error) {
    console.error('Erro ao buscar livros por autor:', error);
    res.status(500).json({ message: 'Erro ao buscar livros por autor' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 