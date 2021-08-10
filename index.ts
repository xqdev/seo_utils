import axios from 'axios';

import { SeoMetadata } from './src/utils'

import { extractSeoMetadataFromPage, extractUrlsFromSitemap } from'./src/utils'

const main = async (): Promise<void> => {
    const sitemap : string[] = extractUrlsFromSitemap((await axios.get('https://ersh.su/sitemap.xml')).data)
    
    for (let url of sitemap) {
        const page = (await axios.get(url)).data
        const metadata = extractSeoMetadataFromPage(page)
        console.log(url);
        
        console.log(metadata);
        
    }
    
}

main()