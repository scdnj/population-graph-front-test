import { simplify } from '.';
it('1 => 1', () => {
  expect(simplify(1)).toEqual('1');
});

it('10000 => 1万', () => {
  expect(simplify(10000)).toEqual('1万');
});

it('12000 => 1.2万', () => {
  expect(simplify(12000)).toEqual('1.2万');
});

it('12300 => 1.2万', () => {
  expect(simplify(12300)).toEqual('1.2万');
});

it('8000 => 0.8万', () => {
  expect(simplify(8000)).toEqual('0.8万');
});

it('100000000 => 1億', () => {
  expect(simplify(100000000)).toEqual('1億');
});
