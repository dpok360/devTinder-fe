import { describe, expect, it, vi } from 'vitest';
import ReviewButton from '../components/buttons/ReviewButton';
import { fireEvent, render, screen } from '@testing-library/react';
import SendButton from '../components/buttons/SendButton';

describe("Send Button'", () => {
  it('Should render Send Button with send imag tag', () => {
    render(<SendButton sendMessages={() => {}} />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn btn-info btn-md  w-16 sm:w-20');
  });

  it("should render SendButton with img inside'", () => {
    render(<SendButton handleBuyClick={() => {}} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/send.svg');
    expect(img).toHaveAttribute('alt', 'send icon');
  });

  it("Should trigger reviewRequest fun when button 'Accept' is clicked", () => {
    const sendMessages = vi.fn();

    render(<SendButton label="Accept" sendMessages={() => sendMessages()} />);

    const button = screen.getByRole('img');
    fireEvent.click(button);
    expect(sendMessages).toHaveBeenCalledTimes(1);
  });
});
\