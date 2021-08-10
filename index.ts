import axios from 'axios';

import { SeoMetadata } from './src/utils'

import { extractSeoMetadataFromPage, extractUrlsFromSitemap } from './src/utils'
import transform from 'stream-transform'
import stringify from 'csv-stringify'
import { chunk, take } from 'lodash';
const main = async (): Promise<void> => {
    const sitemapChunks: string[][] = chunk(extractUrlsFromSitemap((await axios.get('https://ersh.su/sitemap.xml')).data), 5)

    let result: { url: string, seo: SeoMetadata }[] = []

    for (let sitemapChunk of sitemapChunks) {
        for (let url of sitemapChunk) {
            while(true) {
                try {
                    const page = (await axios.get(url)).data
                    const seo = extractSeoMetadataFromPage(page)
                    result.push({ seo, url })
                    break;
                } catch(err) {
    
                }
            }
        }
        transform(result, (data) => {
            return { url: data.url, ...data.seo };
        }).pipe(
            stringify({ columns: { url: 'url', title: 'title', description: 'description', keywords: 'keywords' }, header: true })
        ).pipe(process.stdout)
    }


}

main()