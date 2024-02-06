import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import AppNav from '@/components/Nav';

test('Nav element used with links visible', () => {
    render(<AppNav />)

    expect(screen.getByRole('navigation')).toBeDefined();

    expect(screen.getByRole('link', { name: /repositories/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /settings/i })).toBeDefined();
})