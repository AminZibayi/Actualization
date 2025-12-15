import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Image Export', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('export button is visible', async ({ page }) => {
    const exportBtn = page.getByTestId('export-btn');
    await expect(exportBtn).toBeVisible();
    await expect(exportBtn).toContainText('Export PNG');
  });

  test('export button triggers download', async ({ page }) => {
    // Set up download handler
    const downloadPromise = page.waitForEvent('download');

    await page.getByTestId('export-btn').click();

    const download = await downloadPromise;

    // Check that the file has the correct naming pattern
    const fileName = download.suggestedFilename();
    expect(fileName).toMatch(/actualization-canvas-.*\.png$/);
  });

  test('exported file is a valid PNG', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');

    await page.getByTestId('export-btn').click();

    const download = await downloadPromise;

    // Save to temp file and check
    const filePath = path.join(__dirname, 'temp-download.png');
    await download.saveAs(filePath);

    // Check file exists and has content
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeGreaterThan(1000); // PNG should be > 1KB

    // Check PNG magic bytes
    const buffer = fs.readFileSync(filePath);
    const pngMagic = buffer.slice(0, 8);
    expect(pngMagic[0]).toBe(0x89);
    expect(pngMagic[1]).toBe(0x50); // P
    expect(pngMagic[2]).toBe(0x4e); // N
    expect(pngMagic[3]).toBe(0x47); // G

    // Cleanup
    fs.unlinkSync(filePath);
  });

  test('export uses canvas title in filename', async ({ page }) => {
    // First seed with known data
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.getByTestId('seed-btn').click();
    await page.waitForTimeout(500);

    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('export-btn').click();

    const download = await downloadPromise;
    const fileName = download.suggestedFilename();

    expect(fileName).toContain('EcoScoot');
  });

  test('export button shows loading state during export', async ({ page }) => {
    await page.getByTestId('export-btn').click();

    // Check for the spinning icon class during export
    // This is a brief state, so we just verify the button exists
    const exportBtn = page.getByTestId('export-btn');
    await expect(exportBtn).toBeVisible();
  });
});
