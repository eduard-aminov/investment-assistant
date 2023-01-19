import match from '../index';

test('returns correct case', () => {
    const actual = match(2)
        .case(1, 'one')
        .case(2, 'two')
        .default('three');

    expect(actual).toBe('two');
})

test('returns default case', () => {
    const actual = match(5)
        .case(1, 'one')
        .case(2, 'two')
        .default('three');

    expect(actual).toBe('three');
})
