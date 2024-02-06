import { afterEach, expect, test, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { Header } from '@/components/Header';

afterEach(() => {
    cleanup();
});

test('header renders h1 by default', () => {
    render(<Header>Header Text</Header>)

    expect(screen.getByRole('heading', { level: 1 }))
})

test('header renders h1 to h3', () => {
    [1, 2, 3].forEach((headingLevel) => {
        render(<Header level={`h${headingLevel}`}>Header Text</Header>)

        expect(screen.getByRole('heading', { level: Number(headingLevel) }))
    })
})