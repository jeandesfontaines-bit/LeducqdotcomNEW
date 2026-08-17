import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('renders footer with tagline', () => {
    render(<Footer tagline="Test tagline" />);
    expect(screen.getByText('Test tagline')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer copyright="Test copyright" />);
    expect(screen.getByText(/Test copyright/)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('listitem');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('has correct ARIA attributes', () => {
    render(<Footer />);
    const socialList = screen.getByRole('list');
    expect(socialList).toBeInTheDocument();
  });

  it('social links open in new tab', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    });
  });
});
