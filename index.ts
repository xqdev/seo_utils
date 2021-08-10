import axios from 'axios';

import { SeoMetadata } from './src/utils'

const {extractSeoMetadataFromPage} = require('./src/utils')

const main = async (): Promise<SeoMetadata> => {
    console.log(extractSeoMetadataFromPage);
    
    return {}
    // // const sitemapUrl = 'https://ersh.su/sitemap.xml'

    // const response = await axios.get('https://ersh.su')

    // // console.log(response.data);
    

    // // const response = await axios.get('https://ersh.su')
    // const meta = extractSeoMetadataFromPage(response.data)
    // console.log(meta);

    // // <meta name="description" content="">
}

main()