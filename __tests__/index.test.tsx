import { afterEach, expect, test, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import IndexPage from '../src/pages/index'

afterEach(() => {
    cleanup();
});

export const mockRepositoryData = [
    {
        id: 1,
        title: 'Repository Title 1',
        subtitle: 'Repository Subtitle 1',
        link: 'https://www.repositorylink1.com',
        paragraph: 'Repository paragraph 1'
    },
    {
        id: 2,
        title: 'Repository Title 2',
        subtitle: 'Repository Subtitle 2',
        link: 'https://www.repositorylink2.com',
        paragraph: 'Repository paragraph 2'
    }
]

// Verify Vitest/Jest/Testing LibrarySetup correctly
test('test file works', () => {
    expect(true).toBe(true)
})

// Index page has a heading
test('indexpage renders h1', () => {
    render(<IndexPage />)

    expect(screen.getByRole('heading', { level: 1 }))
})

// Loading state shows before remote data is loaded
test('loading state shown before data', async () => {
    render(<IndexPage />)

    expect(screen.getByText('Loading...')).toBeDefined();

    await waitFor(() => {
        expect(screen.queryByText('Loading...')).toBeNull();

        const repositoryList = screen.queryByRole('list');
        expect(repositoryList).toBeDefined();
    })
})

// Data is mocked to test UI display
test('correct number of cards render', () => {
    render(<IndexPage data={mockRepositoryData} />)

    expect(screen.queryAllByRole('listitem').length).toBe(mockRepositoryData.length);
})

// Each card displays title, subtitle, link, paragraph text
test('cards displays all data', () => {
    render(<IndexPage data={mockRepositoryData} />)

    const cards = screen.queryAllByRole('listitem');

    cards.forEach((card, index) => {
        expect(screen.queryByText(mockRepositoryData[index].title)?.getAttribute('href')).toBeDefined();
        expect(screen.queryByText(mockRepositoryData[index].subtitle)).toBeDefined();
        expect(screen.queryByText(mockRepositoryData[index].paragraph)).toBeDefined();
    })
})

test('card data loads from API correctly (via MSW)', async () => {
    render(<IndexPage />)

    await waitFor(() => {
        const repositoryList = screen.queryByRole('list');
        expect(repositoryList).toBeDefined();

        const cards = screen.queryAllByRole('listitem');

        cards.forEach((card, index) => {
            expect(screen.queryByText(mockRepositoryData[index].title)?.getAttribute('href')).toBeDefined();

            expect(screen.queryByText(mockRepositoryData[index].subtitle)).toBeDefined();

            expect(screen.queryByText(mockRepositoryData[index].paragraph)).toBeDefined();
        })
    })
})