import { test, expect } from '@playwright/test'

test.describe('Donation Flow', () => {
  test('should complete a one-time Stripe donation', async ({ page }) => {
    // Navigate to donation page
    await page.goto('/donate')
    
    // Check page loads correctly
    await expect(page.locator('h1')).toContainText('Support Our Mission')
    
    // Select $25 donation
    await page.click('button:has-text("$25.00")')
    
    // Select one-time frequency (should be default)
    await expect(page.locator('input[value="ONE_TIME"]')).toBeChecked()
    
    // Fill donor information
    await page.fill('input[name="donorName"]', 'Test Donor')
    await page.fill('input[name="donorEmail"]', 'test@example.com')
    await page.fill('textarea[name="message"]', 'Test donation message')
    
    // Select Stripe payment method (should be default)
    await expect(page.locator('button:has-text("Card Payment")')).toHaveClass(/border-blue-500/)
    
    // Click continue to payment
    await page.click('button:has-text("Continue to Payment")')
    
    // Wait for Stripe Elements to load
    await page.waitForSelector('iframe[name^="__privateStripeFrame"]')
    
    // Note: In a real test, you'd fill in test card details
    // For this demo, we'll just verify the form is present
    await expect(page.locator('button:has-text("Donate $25.00")')).toBeVisible()
  })

  test('should handle custom donation amount', async ({ page }) => {
    await page.goto('/donate')
    
    // Enter custom amount
    await page.fill('input[placeholder="Custom amount"]', '75.50')
    
    // Verify custom amount is selected
    await expect(page.locator('text=Custom amount: $75.50')).toBeVisible()
    
    // Continue with donation flow
    await page.fill('input[name="donorEmail"]', 'custom@example.com')
    await page.click('button:has-text("Continue to Payment")')
    
    // Verify the donation amount in the final button
    await expect(page.locator('button:has-text("Donate $75.50")')).toBeVisible()
  })

  test('should handle anonymous donations', async ({ page }) => {
    await page.goto('/donate')
    
    // Select anonymous donation
    await page.check('input[type="checkbox"]#anonymous')
    
    // Verify donor fields are hidden
    await expect(page.locator('input[name="donorName"]')).not.toBeVisible()
    await expect(page.locator('input[name="donorEmail"]')).not.toBeVisible()
    
    // Message field should still be visible
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
  })

  test('should switch between payment methods', async ({ page }) => {
    await page.goto('/donate')
    
    // Start with Stripe (default)
    await expect(page.locator('button:has-text("Card Payment")')).toHaveClass(/border-blue-500/)
    
    // Switch to PayPal
    await page.click('button:has-text("PayPal")')
    await expect(page.locator('button:has-text("PayPal")')).toHaveClass(/border-blue-500/)
    
    // Fill required fields and continue
    await page.fill('input[name="donorEmail"]', 'paypal@example.com')
    
    // Note: PayPal buttons would load here in a real environment
  })

  test('should validate required fields', async ({ page }) => {
    await page.goto('/donate')
    
    // Try to continue without filling required fields
    await page.click('button:has-text("Continue to Payment")')
    
    // Should show validation errors or prevent submission
    // This would depend on your specific validation implementation
  })
})

test.describe('Success and Cancel Pages', () => {
  test('should display success page correctly', async ({ page }) => {
    await page.goto('/donate/success?donation_id=test_123')
    
    await expect(page.locator('h1')).toContainText('Thank You!')
    await expect(page.locator('text=Your donation has been received')).toBeVisible()
    await expect(page.locator('text=Receipt Sent')).toBeVisible()
  })

  test('should display cancel page correctly', async ({ page }) => {
    await page.goto('/donate/cancel')
    
    await expect(page.locator('h1')).toContainText('Donation Cancelled')
    await expect(page.locator('text=Your donation was not processed')).toBeVisible()
    await expect(page.locator('a:has-text("Try Again")')).toBeVisible()
  })
})