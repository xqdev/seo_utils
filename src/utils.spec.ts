import { promises as fs } from 'fs'
import path from 'path'

import { extractSeoMetadataFromPage, extractUrlsFromSitemap } from './utils'

let metadataTestFiles = []
let sitemapTestFiles = []

beforeAll(async () => {
    const testDataDir = path.join(__dirname, '__test_data__')
    const metadataTestFilenames = [
        path.join(testDataDir, 'page_example_1.html'),
        path.join(testDataDir, 'page_example_2.html'),
        path.join(testDataDir, 'page_example_3.html'),
        path.join(testDataDir, 'invalid_page_1.html'),
        path.join(testDataDir, 'page_example_4.html'),
    ]
    const sitemapTestFilenames = [
        path.join(testDataDir, 'test_sitemap_1.xml')
    ]

    metadataTestFiles = await Promise.all(metadataTestFilenames.map(filename => fs.readFile(filename, 'utf8')))
    sitemapTestFiles = await Promise.all(sitemapTestFilenames.map(filename => fs.readFile(filename, 'utf8')))
});

test('extracts metadata correctly', () => {
    const extractedSeoObjects = metadataTestFiles.map(file => extractSeoMetadataFromPage(file))
    expect(extractedSeoObjects).toMatchSnapshot()
})

test('extracts sitemap links correctly', () => {
    expect(extractUrlsFromSitemap(sitemapTestFiles[0])).toMatchSnapshot()
    expect(extractUrlsFromSitemap('')).toMatchObject([])
})