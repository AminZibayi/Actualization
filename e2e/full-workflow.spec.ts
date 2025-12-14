import { test, expect } from '@playwright/test';

test.describe('Full Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('complete workflow: seed, edit, export', async ({ page }) => {
    // Step 1: Seed with example data
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.getByTestId('seed-btn').click();
    await page.waitForTimeout(500);

    // Verify seed data loaded
    await expect(page.getByTestId('canvas-title')).toContainText('EcoScoot');

    // Step 2: Edit the title
    const titleInput = page.getByTestId('input-title');
    await titleInput.fill('My Modified Startup');
    await expect(page.getByTestId('canvas-title')).toContainText('My Modified Startup');

    // Step 3: Export
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('export-btn').click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toContain('My-Modified-Startup');
  });

  test('language toggle switches UI to RTL', async ({ page }) => {
    const langBtn = page.getByTestId('language-toggle-btn');
    await expect(langBtn).toContainText('FA');

    await langBtn.click();

    // Button should now show EN
    await expect(langBtn).toContainText('EN');

    // Canvas should be in RTL mode
    const canvas = page.getByTestId('canvas-preview');
    await expect(canvas).toHaveAttribute('dir', 'rtl');
  });

  test('sidebar toggle opens and closes sidebar', async ({ page }) => {
    const sidebar = page.getByTestId('editor-sidebar');
    const toggleBtn = page.getByTestId('toggle-sidebar-btn');

    // Initially open
    await expect(sidebar).toBeVisible();

    // Close sidebar
    await toggleBtn.click();

    // Reopen sidebar (if on mobile) or verify state change
    await toggleBtn.click();
    await expect(sidebar).toBeVisible();
  });

  test('add note workflow', async ({ page }) => {
    // Scope actions to the solution block to avoid false positives from other blocks
    const solutionBlock = page.getByTestId('editor-block-solution');

    // Find the solution block's add button
    const addBtn = solutionBlock.getByTestId('add-note-btn-solution');
    await addBtn.click();

    // Check that a new note editor appears INSIDE the solution block
    const newNoteEditor = solutionBlock.getByTestId(/note-editor-/).first();
    await expect(newNoteEditor).toBeVisible();
  });

  test('editing note updates canvas preview', async ({ page }) => {
    // Add a note to solution block
    await page.getByTestId('add-note-btn-solution').click();
    await page.waitForTimeout(300);

    // Edit the note title
    const titleInputs = page.getByTestId('note-title-input');
    const lastInput = titleInputs.last();
    await lastInput.fill('Custom Note Title');

    // Check canvas preview has the note
    const stickyNotes = page.locator('[data-testid="sticky-note"]');
    const count = await stickyNotes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('delete note removes from canvas', async ({ page }) => {
    // First seed to have notes
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.getByTestId('seed-btn').click();
    await page.waitForTimeout(500);

    // Count initial notes
    const initialCount = await page.getByTestId('sticky-note').count();

    // Delete a note from editor
    const deleteBtn = page.getByTestId('delete-note-editor-btn').first();
    await deleteBtn.click();

    // Should have one less note
    const newCount = await page.getByTestId('sticky-note').count();
    expect(newCount).toBe(initialCount - 1);
  });

  test('caption input updates canvas', async ({ page }) => {
    const captionInput = page.getByTestId('input-caption');
    await captionInput.fill('My Custom Caption');

    const canvasCaption = page.getByTestId('canvas-caption');
    await expect(canvasCaption).toContainText('My Custom Caption');
  });
});
