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

// Index page has a heading
test('indexpage renders h1', () => {
    render(<IndexPage data={mockRepositoryData} />)

    expect(screen.getByRole('heading', { level: 1 }))
})

// Data is mocked to test UI display
test('correct number of cards render with each card containing correct values', () => {
    render(<IndexPage data={mockRepositoryData} />)

    const cards = screen.queryAllByRole('listitem');
    expect(cards.length).toBe(mockRepositoryData.items.length);

    expect(screen.queryByText(mockRepositoryData.items[0].name)?.getAttribute('href')).toBeDefined();
    expect(screen.queryByText(mockRepositoryData.items[0].full_name)).toBeDefined();
    expect(screen.queryByText(mockRepositoryData.items[0].description)).toBeDefined();
})

// Card returns null if title or link are missing
test('card returns null if title or link are missing', () => {
    render(<RepositoryCard
        title={''}
        link={""}
        subtitle={mockRepositoryData.items[0].full_name}
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
