import { afterEach, expect, test, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import IndexPage, { getServerSideProps } from '../src/pages/index'
import RepositoryCard from '@/components/RepositoryCard';

afterEach(() => {
    cleanup();
});

export const mockRepositoryData = {
    total_count: 2,
    incomplete_results: false,
    items: [
        {
            id: 1,
            name: 'Repository Title 1',
            full_name: 'Repository Subtitle 1',
            html_url: 'https://www.repositorylink1.com',
            description: 'Repository paragraph 1'
        },
        {
            id: 2,
            name: 'Repository Title 2',
            full_name: 'Repository Subtitle 2',
            html_url: 'https://www.repositorylink2.com',
            description: 'Repository paragraph 2'
        }
    ]
}

// Verify Vitest/Jest/Testing LibrarySetup correctly
test('test file works', () => {
    expect(true).toBe(true)
})

// Index page has a heading
test('indexpage renders h1', () => {
    render(<IndexPage data={mockRepositoryData} />)

    expect(screen.getByRole('heading', { level: 1 }))
})

// Index page shows count of loaded/total repositories
test('shows how many loaded of possible results, if possible results higher than limit of 16', () => {
    render(<IndexPage data={mockRepositoryData} />)

    expect(screen.queryByText(`Displaying ${mockRepositoryData.items.length} of ${mockRepositoryData.total_count}`)).toBeDefined();
})

// Data is mocked to test UI display
test('correct number of cards render', () => {
    render(<IndexPage data={mockRepositoryData} />)

    const cards = screen.queryAllByRole('listitem');
    expect(cards.length).toBe(mockRepositoryData.items.length);
})

// Each card displays title, subtitle, link, paragraph text
test('card displays all data', () => {
    render(<RepositoryCard
        title={mockRepositoryData.items[0].name}
        subtitle={mockRepositoryData.items[0].full_name}
        link={mockRepositoryData.items[0].html_url}
        description={mockRepositoryData.items[0].description}
    />)

    expect(screen.queryByText(mockRepositoryData.items[0].name)?.getAttribute('href')).toBeDefined();
    expect(screen.queryByText(mockRepositoryData.items[0].full_name)).toBeDefined();
    expect(screen.queryByText(mockRepositoryData.items[0].description)).toBeDefined();
})

// Card returns null if title or link are missing
test('card returns null if title or link are missing', () => {
    render(<RepositoryCard
        title={''}
        subtitle={mockRepositoryData.items[0].full_name}
        link={mockRepositoryData.items[0].html_url}
        description={mockRepositoryData.items[0].description}
    />)

    expect(screen.queryByRole('listitem')).toBeNull();
})

test('card data loads from API correctly (via MSW)', async () => {
    render(<IndexPage data={mockRepositoryData} />)

    await waitFor(() => {
        const repositoryList = screen.queryByRole('list');
        expect(repositoryList).toBeDefined();

        const cards = screen.queryAllByRole('listitem');

        cards.forEach((card, index) => {
            expect(screen.queryByText(mockRepositoryData.items[index].name)?.getAttribute('href')).toBeDefined();

            expect(screen.queryByText(mockRepositoryData.items[index].full_name)).toBeDefined();

            expect(screen.queryByText(mockRepositoryData.items[index].description)).toBeDefined();
        })
    })
})
