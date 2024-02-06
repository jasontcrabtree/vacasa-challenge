import { afterEach, expect, test, vi } from 'vitest'
import { cleanup, render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPage from '../src/pages/settings'
import Accordion from '@/components/Accordion';

afterEach(() => {
    cleanup();
});

export const mockAccordionData = [
    {
        id: 'privacyPolicy',
        title: 'Privacy Policy',
        content: 'This is the privacy policy'
    },
    {
        id: 'termsOfService',
        title: 'Terms of Service',
        content: 'This is the terms of service'
    }
]

test('settings page renders h1', () => {
    render(<SettingsPage accordionContent={mockAccordionData} />)

    expect(screen.getByRole('heading', { level: 1 }))
})

test('accordion renders null with no content', () => {
    render(<Accordion accordionContent={[]} />)

    expect(screen.queryByRole('button')).toBeNull();
})

test('accordion closed by default', () => {
    render(<SettingsPage accordionContent={mockAccordionData} />)

    const accordionButtons = screen.queryAllByRole('button');

    accordionButtons.forEach((button) => {
        expect(button.getAttribute('aria-expanded')).toBe('false');
    })
})

test('accordion opens and closes', () => {
    render(<SettingsPage accordionContent={mockAccordionData} />)

    const privacyButton = screen.getByRole('button', { name: 'Privacy Policy' });
    const termsOfService = screen.getByRole('button', { name: 'Terms of Service' });

    [privacyButton, termsOfService].forEach((button, index) => {

        expect(button.getAttribute('aria-expanded')).toBe('false');
        userEvent.click(button);

        waitFor(() => {
            expect(button.getAttribute('aria-expanded')).toBe('true');
            expect(screen.getAllByText(mockAccordionData[index].content)).toBeDefined();
        })
    })
})

test('settings page includes link with email formatting', () => {
    render(<SettingsPage accordionContent={mockAccordionData} />)

    const emailLink = screen.getByText('vacasa.interview@vacasa.com');
    expect(emailLink.getAttribute('href')).toContain('mailto:')
})