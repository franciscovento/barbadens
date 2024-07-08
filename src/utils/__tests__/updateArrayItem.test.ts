import { describe, expect, it } from 'vitest';
import { updateArrayItem } from '../updateArrayItem';

describe('updateArrayItem', () => {
  it('should replace item passing one key', () => {
    const array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ];
    const newItem = { id: 2, name: 'baz' };

    expect(updateArrayItem(array, newItem, ['id'])).toEqual([
      { id: 1, name: 'foo' },
      { id: 2, name: 'baz' },
    ]);
  });

  it('should replace item passing two keys', () => {
    const array = [
      {
        id: 1,
        productId: 1,
        shopId: 1,
        name: 'foo',
      },
      {
        id: 2,
        productId: 2,
        shopId: 2,
        name: 'zoom',
      },
      {
        id: 3,
        productId: 2,
        shopId: 3,
        name: 'bar',
      },
    ];

    const newItem = {
      id: 3,
      productId: 2,
      shopId: 3,
      name: 'bar-2',
    };

    expect(updateArrayItem(array, newItem, ['productId', 'shopId'])).toEqual([
      {
        id: 1,
        productId: 1,
        shopId: 1,
        name: 'foo',
      },
      {
        id: 2,
        productId: 2,
        shopId: 2,
        name: 'zoom',
      },
      {
        id: 3,
        productId: 2,
        shopId: 3,
        name: 'bar-2',
      },
    ]);
  });
});
