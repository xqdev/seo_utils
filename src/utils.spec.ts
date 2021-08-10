const fs = require('fs').promises;
const path = require('path')

const { extractSeoMetadataFromPage, extractUrlsFromSitemap } = require('./utils')

let metadataTestFiles = []
let sitemapTestFiles = []

beforeAll(async () => {
    const testDataDir = path.join(__dirname, '__test_data__')
    const metadataTestFilenames = [
        path.join(testDataDir, 'page_example_1.html'),
        path.join(testDataDir, 'page_example_2.html'),
        path.join(testDataDir, 'page_example_3.html'),
        path.join(testDataDir, 'invalid_page_1.html'),
    ]
    const sitemapTestFilenames = [
        path.join(testDataDir, 'test_sitemap_1.xml')
    ]

    metadataTestFiles = await Promise.all(metadataTestFilenames.map(filename => fs.readFile(filename, 'utf8')))
    sitemapTestFiles = await Promise.all(sitemapTestFilenames.map(filename => fs.readFile(filename, 'utf8')))
});

test('extracts metadata correctly', () => {
    expect(extractSeoMetadataFromPage(metadataTestFiles[0])).toMatchObject({
        title: 'Сеть пивных ресторанов «Ёрш» : Меню пивного ресторана для гурманов. Адреса пивных реторанов «Ёрш»  в Москве.\n',
        description: 'В пивном ресторане Ёрш, вы можете заказать: 100 сортов крафтового пива, огромную коллекция блюд и закусок с гриля, мангала и коптильни и многие другие закуски к пиву. Приятно проведите время с друзьями под живую музыку и караоке. Закажите доставку еды, блюд русской кухни и обедов на дом.\n',
        keywords: 'пивной ресторан крафт пиво москва доставка еды русская кухня доставка обедов выездные банкеты ресторан русской кухни праздник доставка еды круглосуточно баранина шашлык  курицы ёрш пивной ресторан ёрш\n'
    })
    expect(extractSeoMetadataFromPage(metadataTestFiles[1])).toMatchObject({
        description: 'В пивном ресторане Ёрш, вы можете заказать: 100 сортов крафтового пива, огромную коллекция блюд и закусок с гриля, мангала и коптильни и многие другие закуски к пиву. Приятно проведите время с друзьями под живую музыку и караоке. Закажите доставку еды, блюд русской кухни и обедов на дом.\n',
    })
    expect(extractSeoMetadataFromPage(metadataTestFiles[2])).toMatchObject({
        title: 'Первый тайтл',
        description: 'В пивном ресторане Ёрш, вы можете заказать: 100 сортов крафтового пива, огромную коллекция блюд и закусок с гриля, мангала и коптильни и многие другие закуски к пиву. Приятно проведите время с друзьями под живую музыку и караоке. Закажите доставку еды, блюд русской кухни и обедов на дом.\n',
        keywords: 'пивной ресторан крафт пиво москва доставка еды русская кухня доставка обедов выездные банкеты ресторан русской кухни праздник доставка еды круглосуточно баранина шашлык  курицы ёрш пивной ресторан ёрш\n'
    })
    expect(extractSeoMetadataFromPage(metadataTestFiles[3])).toMatchObject({})
})

test('extracts sitemap links correctly', () => {
    expect(extractUrlsFromSitemap(sitemapTestFiles[0])).toMatchSnapshot()
})