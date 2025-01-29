import { describe, expect, it, vi } from 'vitest';
import BuyButton from '../components/buttons/BuyButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Buy Button component', () => {
  it("Should render Buy Gold when label='Buy Gold'", () => {
    render(
      <BuyButton type="gold" label="Buy Gold" handleBuyClick={() => {}} />
    );
    expect(screen.getByText(/Buy Gold/i)).toBeInTheDocument();
  });

  it("should render Buy Gold when label='Buy Gold'", () => {
    render(
      <BuyButton type="silver" label="Buy Silver" handleBuyClick={() => {}} />
    );
    expect(screen.getByText(/Buy Silver/i)).toBeInTheDocument();
  });

  it("should have btn-warning class when type='gold'", () => {
    render(
      <BuyButton type="gold" label="Buy Gold" handleBuyClick={() => {}} />
    );
    const button = screen.getByText('Buy Gold');
    expect(button).toHaveClass('btn-warning');
  });

  it("should have btn-warning class when type='silver'", () => {
    render(
      <BuyButton type="silver" label="Buy Silver" handleBuyClick={() => {}} />
    );
    const button = screen.getByText('Buy Silver');
    expect(button).toHaveClass('btn-ghost');
  });

  it('Should trigger handleBuyClick when button is clicked', () => {
    const handleBuyClick = vi.fn();

    render(
      <BuyButton
        type="gold"
        label="Buy Gold"
        handleBuyClick={() => handleBuyClick('gold')}
      />
    );

    const button = screen.getByText('Buy Gold');
    fireEvent.click(button);

    expect(handleBuyClick).toHaveBeenCalledWith('gold');
    expect(handleBuyClick).toHaveBeenCalledTimes(1);
  });
});
