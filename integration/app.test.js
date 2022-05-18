describe('addItemForm', () => {
  it('Test component app', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?id=todolist-app--app-stories&args=&viewMode=story')
    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })

  it('Test component EditModeText', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?id=todolist-editmodetext--edit-mode-text-stories&args=&viewMode=story')
    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })

  it('Test component ListButtons', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?id=todolist-listbuttons--list-buttons-filter-active-stories&args=&viewMode=story')
    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })

  it('Test component Task', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?id=todolist-tasks--task-stories-is-done&args=&viewMode=story')
    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})
