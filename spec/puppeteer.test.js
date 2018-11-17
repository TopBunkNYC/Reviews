const puppeteer = require('puppeteer');
const url = 'http://localhost:8001/listings?id=9873013'

let page;
let browser;
const width = 1024;
const height = 512;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitFor: 'networkidle2' });
});

afterAll(() => {
  browser.close();
});


describe('search functionality', () => {
  test('initial section title with number of reviews is rendered', async () => {
    let div = '.totalReviewsDiv'
    const reviewsHeader = await page.$eval(div, (el) => el.textContent)
    expect(reviewsHeader).toBeDefined()
  })

  test('search bar is rendered', async () => {
    let div = '.searchBar'
    const reviewsHeader = await page.$eval(div, (el) => el.textContent)
    expect(reviewsHeader).toBeDefined()
  })
})
