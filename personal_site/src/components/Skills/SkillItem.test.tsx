import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillItem from './SkillItem';

describe('SkillItem', () => {
  const mockProps = {
    iconSrc: '/test-icon.svg',
    iconAlt: 'Test Icon',
    name: 'React'
  };

  it('renders skill item with correct name', () => {
    render(<SkillItem {...mockProps} />);
    const skillName = screen.getByText('React');
    expect(skillName).toBeInTheDocument();
  });

  it('renders icon with correct src and alt attributes', () => {
    render(<SkillItem {...mockProps} />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/test-icon.svg');
    expect(icon).toHaveAttribute('alt', 'Test Icon');
  });

  it('applies correct styling to skill name', () => {
    render(<SkillItem {...mockProps} />);
    const skillName = screen.getByText('React');
    expect(skillName).toHaveClass('ml-3', 'text-gray-500');
  });

  it('renders with different skill names', () => {
    const { rerender } = render(<SkillItem {...mockProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();

    rerender(<SkillItem {...mockProps} name="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('renders icon in a container with specific dimensions', () => {
    render(<SkillItem {...mockProps} />);
    const icon = screen.getByRole('img');
    const iconContainer = icon.closest('span');
    expect(iconContainer).toHaveClass('inline-block', 'w-6', 'h-6');
  });
});
