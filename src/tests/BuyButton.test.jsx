import { describe, expect, it } from 'vitest';
import BuyButton from '../components/buttons/BuyButton';
import { render, screen } from '@testing-library/react';

describe('Buy Button component', () => {
  it('Render button with correct label', () => {
    render(
      <BuyButton type="gold" label="Buy Gold" handleBuyClick={() => {}} />
    );
    expect(screen.getByText(/Buy Gold/i)).toBeInTheDocument();
  });
});
