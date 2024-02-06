import { afterEach, expect, test, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPage from '../src/pages/settings'

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

// Settings page has a heading
test('settings page renders h1', () => {
    render(<SettingsPage accordionContent={mockAccordionData} />)

    expect(screen.getByRole('heading', { level: 1 }))
})

// Accordion on settings page is closed by default
test('accordion closed by default', () => {
    render(<SettingsPage accordionContent={mockAccordionData} />)

    const accordionButtons = screen.queryAllByRole('button');

    accordionButtons.forEach((button) => {
        expect(button.getAttribute('aria-expanded')).toBe('false');
    })
})

// Clicking accordion opens and closed different FAQ questions
test('accordion opens and closes', () => {
    render(<SettingsPage accordionContent={mockAccordionData} />)

    const privacyButton = screen.getByRole('button', { name: 'Privacy Policy' });
    const termsOfService = screen.getByRole('button', { name: 'Terms of Service' });

    [privacyButton, termsOfService].map((button) => {
        expect(button.getAttribute('aria-expanded')).toBe('false');

        userEvent.click(button);
        expect(button.getAttribute('aria-expanded')).toBe('true');

        userEvent.click(button);
        expect(button.getAttribute('aria-expanded')).toBe('false');
    })

    // userEvent.click(privacyButton)
    // expect(privacyButton.getAttribute('aria-expanded')).toBe('true');
    // expect(termsOfService.getAttribute('aria-expanded')).toBe('false');

    // userEvent.click(termsOfService)
    // expect(privacyButton.getAttribute('aria-expanded')).toBe('false');
    // expect(termsOfService.getAttribute('aria-expanded')).toBe('true');
})

test('settings page includes link with email formatting', () => {
    render(<SettingsPage accordionContent={mockAccordionData} />)

    const emailLink = screen.getByText('vacasa.interview@vacasa.com');
    expect(emailLink.getAttribute('href')).toContain('mailto:')
})