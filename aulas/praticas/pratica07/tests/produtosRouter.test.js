const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Testes da API /produtos', () => {
  let produtoId;

  test('POST /produtos - deve criar um produto', async () => {
    const response = await request.post('/produtos').send({ nome: 'Laranja', preco: 10.0 });
    expect(response.status).toBe(201);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);
    produtoId = response.body._id;
  });

  test('POST /produtos - sem corpo deve retornar 422', async () => {
    const response = await request.post('/produtos').send({});
    expect(response.status).toBe(422);
    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos - deve listar produtos', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /produtos/:id - deve retornar produto criado', async () => {
    const response = await request.get(`/produtos/${produtoId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);
  });

  test('GET /produtos/0 - parâmetro inválido', async () => {
    const response = await request.get('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('GET /produtos/000000000000000000000000 - não encontrado', async () => {
    const response = await request.get('/produtos/000000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  test('PUT /produtos/:id - deve atualizar produto', async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({ nome: 'Laranja Pera', preco: 18.0 });
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Laranja Pera');
    expect(response.body.preco).toBe(18.0);
  });

  test('PUT /produtos/:id - sem corpo deve retornar 422', async () => {
    const response = await request.put(`/produtos/${produtoId}`).send({});
    expect(response.status).toBe(422);
    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  test('PUT /produtos/0 - parâmetro inválido', async () => {
    const response = await request.put('/produtos/0').send({ nome: 'Laranja', preco: 10 });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('PUT /produtos/000000000000000000000000 - não encontrado', async () => {
    const response = await request.put('/produtos/000000000000000000000000').send({ nome: 'Laranja', preco: 10 });
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  test('DELETE /produtos/:id - deve remover produto', async () => {
    const response = await request.delete(`/produtos/${produtoId}`);
    expect(response.status).toBe(204);
  });

  test('DELETE /produtos/0 - parâmetro inválido', async () => {
    const response = await request.delete('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('DELETE /produtos/000000000000000000000000 - não encontrado', async () => {
    const response = await request.delete('/produtos/000000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe('Produto não encontrado');
  });
});
