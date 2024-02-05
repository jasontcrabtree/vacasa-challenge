import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import IndexPage from '../src/pages/index'

// Verify Vitest/Jest/Testing LibrarySetup correctly
test('test file works', () => {
    expect(true).toBe(true)
})


test('indexpage renders h1', () => {
    render(<IndexPage />)

    expect(screen.getByRole('heading', { level: 1 }))
})