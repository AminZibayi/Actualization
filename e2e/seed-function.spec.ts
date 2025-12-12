import { test, expect } from '@playwright/test';

test.describe('Seed Function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('seed button is visible', async ({ page }) => {
    const seedBtn = page.getByTestId('seed-btn');
    await expect(seedBtn).toBeVisible();
  });

  test('clicking seed button shows confirmation dialog', async ({ page }) => {
    // Set up dialog handler
    let dialogMessage = '';
    page.on('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByTestId('seed-btn').click();
    expect(dialogMessage).toContain('overwrite');
  });

  test('accepting seed dialog loads EcoScoot data', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.getByTestId('seed-btn').click();
    
    // Wait for the canvas to update
    await page.waitForTimeout(500);
    
    // Check that EcoScoot title appears in the canvas
    const canvasTitle = page.getByTestId('canvas-title');
    await expect(canvasTitle).toContainText('EcoScoot');
  });

  test('dismissing seed dialog keeps original data', async ({ page }) => {
    const originalTitle = await page.getByTestId('canvas-title').textContent();

    page.on('dialog', async (dialog) => {
      await dialog.dismiss();
    });

    await page.getByTestId('seed-btn').click();
    await page.waitForTimeout(300);
    
    const currentTitle = await page.getByTestId('canvas-title').textContent();
    expect(currentTitle).toBe(originalTitle);
  });

  test('seed data populates multiple blocks', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.getByTestId('seed-btn').click();
    await page.waitForTimeout(500);
    
    // Check that seed data blocks have notes
    const problemBlock = page.getByTestId('canvas-block-problem');
    await expect(problemBlock).toBeVisible();
    
    // Should have sticky notes visible
    const stickyNotes = page.getByTestId('sticky-note');
    const count = await stickyNotes.count();
    expect(count).toBeGreaterThan(3);
  });
});
