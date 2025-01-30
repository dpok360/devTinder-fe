import { describe, expect, it, vi } from 'vitest';
import ReviewButton from '../components/buttons/ReviewButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('test SendRequestButton', () => {
  it("should render label with 'Accept' when label='Accpet'", () => {
    render(<ReviewButton label="Accept" reviewRequest={() => {}} />);
    expect(screen.getByText(/Accept/i)).toBeInTheDocument();
  });

  it("should render label with 'Decline' when lable='Decline'", () => {
    render(<ReviewButton label="Decline" reviewRequest={() => {}} />);
    expect(screen.getByText(/Decline/i)).toBeInTheDocument();
  });

  it("should render 'btn-success' when label='Accept'", () => {
    render(<ReviewButton label="Accept" reviewRequest={() => {}} />);
    const button = screen.getByText('Accept');
    expect(button).toHaveClass('btn-success');
  });

  it("should render 'btn-error' when label='Decline'", () => {
    render(<ReviewButton label="Decline" reviewRequest={() => {}} />);
    const button = screen.getByText('Decline');
    expect(button).toHaveClass('btn-error');
  });

  it("should trigger reviewRequest('accepted', _id) when button is clicked", () => {
    const reviewRequest = vi.fn();
    const _id = 12345;

    render(
      <ReviewButton
        label="Accept"
        reviewRequest={() => reviewRequest('accepted', _id)}
      />
    );
    const button = screen.getByText('Accept');
    fireEvent.click(button);
    expect(reviewRequest).toHaveBeenCalledTimes(1);
    expect(reviewRequest).toHaveBeenCalledWith('accepted', _id);
  });

  it("should trigger reviewRequest('rejected', _id) when button is clicked", () => {
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
    expect(reviewRequest).toHaveBeenCalledTimes(1);
    expect(reviewRequest).toHaveBeenCalledWith('rejected', _id);
  });
});
