import { test, expect } from '@playwright/test';

test.describe('YAML Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('YAML tab is visible', async ({ page }) => {
    const yamlTab = page.getByTestId('tab-yaml');
    await expect(yamlTab).toBeVisible();
    await expect(yamlTab).toContainText('YAML');
  });

  test('clicking YAML tab shows YAML editor', async ({ page }) => {
    await page.getByTestId('tab-yaml').click();
    
    const yamlEditor = page.getByTestId('yaml-editor');
    await expect(yamlEditor).toBeVisible();
  });

  test('YAML editor contains serialized data', async ({ page }) => {
    await page.getByTestId('tab-yaml').click();
    
    const yamlEditor = page.getByTestId('yaml-editor');
    const yamlContent = await yamlEditor.inputValue();
    
    // Should contain meta info
    expect(yamlContent).toContain('meta');
    expect(yamlContent).toContain('blocks');
  });

  test('editing title in YAML updates canvas', async ({ page }) => {
    await page.getByTestId('tab-yaml').click();
    
    const yamlEditor = page.getByTestId('yaml-editor');
    
    // Clear and type new YAML content
    await yamlEditor.fill(`meta:
  title: "Test Company"
  caption: "Test Caption"
  logoUrl: ""
blocks:
  problem:
    - title: "YAML Test"
      body: "This came from YAML"
      color: "blue"`);
    
    // Switch back to editor tab
    await page.getByTestId('tab-editor').click();
    
    // Check canvas updated
    const canvasTitle = page.getByTestId('canvas-title');
    await expect(canvasTitle).toContainText('Test Company');
  });

  test('invalid YAML does not crash the app', async ({ page }) => {
    await page.getByTestId('tab-yaml').click();
    
    const yamlEditor = page.getByTestId('yaml-editor');
    
    // Type invalid YAML
    await yamlEditor.fill('invalid: yaml: content: with: too: many: colons');
    
    // App should still be responsive
    await page.getByTestId('tab-editor').click();
    const sidebar = page.getByTestId('editor-sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('switching between tabs preserves data', async ({ page }) => {
    // Edit title in GUI
    const titleInput = page.getByTestId('input-title');
    await titleInput.fill('Test Startup Name');
    
    // Switch to YAML
    await page.getByTestId('tab-yaml').click();
    const yamlEditor = page.getByTestId('yaml-editor');
    const yamlContent = await yamlEditor.inputValue();
    expect(yamlContent).toContain('Test Startup Name');
    
    // Switch back to GUI
    await page.getByTestId('tab-editor').click();
    await expect(titleInput).toHaveValue('Test Startup Name');
  });

  test('YAML editor is in dark mode styling', async ({ page }) => {
    await page.getByTestId('tab-yaml').click();
    
    const yamlEditor = page.getByTestId('yaml-editor');
    await expect(yamlEditor).toHaveClass(/bg-gray-900/);
    await expect(yamlEditor).toHaveClass(/text-green-400/);
  });
});
