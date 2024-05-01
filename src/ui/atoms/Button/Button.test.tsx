import { expect, describe, it } from 'vitest';

import Button from './Button';
import { render } from '@testing-library/react';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button />);
  });
});
