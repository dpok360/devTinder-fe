import { describe, expect, it, vi } from 'vitest';
import ReviewButton from '../components/buttons/ReviewButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe("Should render Accept label when label='Accpet'", () => {
  it("Should render Buy Gold when label='Accept", () => {
    render(<ReviewButton label="Accept" reviewRequest={() => {}} />);
    expect(screen.getByText(/Accept/i)).toBeInTheDocument();
  });

  it("should render Buy Gold when label='Decline'", () => {
    render(<ReviewButton label="Decline" handleBuyClick={() => {}} />);
    expect(screen.getByText(/Decline/i)).toBeInTheDocument();
  });

  it("should have btn-success class when type='Accept'", () => {
    render(<ReviewButton label="Accept" handleBuyClick={() => {}} />);
    const button = screen.getByText('Accept');
    expect(button).toHaveClass('btn-success');
  });

  it("should have btn-error class when type='Decline'", () => {
    render(<ReviewButton label="Decline" handleBuyClick={() => {}} />);
    const button = screen.getByText('Decline');
    expect(button).toHaveClass('btn-error');
  });

  it("Should trigger reviewRequest fun when button 'Accept' is clicked", () => {
    const reviewRequest = vi.fn();
    const _id = '123456';

    render(
      <ReviewButton
        label="Accept"
        reviewRequest={() => reviewRequest('accepted', _id)}
      />
    );

    const button = screen.getByText('Accept');
    fireEvent.click(button);

    expect(reviewRequest).toHaveBeenCalledWith('accepted', _id);
    expect(reviewRequest).toHaveBeenCalledTimes(1);
  });

  it("Should trigger reviewRequest when button 'Decline' is clicked", () => {
    const reviewRequest = vi.fn();
    const _id = 12345;

    render(
      <ReviewButton
        label="Decline"
        reviewRequest={() => reviewRequest('rejected', _id)}
      />
    );

    const button = screen.getByText('Decline');
    fireEvent.click(button);

    expect(reviewRequest).toHaveBeenCalledWith('rejected', _id);
    expect(reviewRequest).toHaveBeenCalledTimes(1);
  });
});
