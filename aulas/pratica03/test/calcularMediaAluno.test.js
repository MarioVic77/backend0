const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('Função calcularMediaAluno deve estar definida', () => {
  expect(calcularMediaAluno).toBeDefined();
});

test('Lança erro se a1 ou a2 não forem informadas', () => {
  expect(() => calcularMediaAluno(undefined, 5)).toThrow('Notas a1 ou a2 não informadas');
  expect(() => calcularMediaAluno(5, undefined)).toThrow('Notas a1 ou a2 não informadas');
});

test('Lança erro se a1 ou a2 forem negativas', () => {
  expect(() => calcularMediaAluno(-1, 6)).toThrow('Notas a1 ou a2 não podem ser negativas');
  expect(() => calcularMediaAluno(6, -1)).toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('Calcula média com a1 e a2 quando a3 não é informada', () => {
  const media = calcularMediaAluno(6, 8);
  expect(media).toBeCloseTo(7.2);
});

test('Lança erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(6, 7, -1)).toThrow('Nota a3 não pode ser negativa');
});

test('Calcula melhor média entre a1 e a3 com a2', () => {
  const media = calcularMediaAluno(6, 5, 9);
  // a1=6, a2=5, a3=9
  // m1: 6*0.4 + 5*0.6 = 5.4
  // m2: 9*0.4 + 5*0.6 = 6.6
  // m3: 6*0.4 + 9*0.6 = 7.8
  expect(media).toBeCloseTo(7.8);
});

test('Calcula melhor média entre a3 e a2 com a1', () => {
  const media = calcularMediaAluno(4, 8, 9);
  // a1=4, a2=8, a3=9
  // m1: 4*0.4 + 8*0.6 = 6.4
  // m2: 9*0.4 + 8*0.6 = 8.4
  // m3: 4*0.4 + 9*0.6 = 7.4
  expect(media).toBeCloseTo(8.4);
});
