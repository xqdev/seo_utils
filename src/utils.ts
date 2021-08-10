export interface SeoMetadata {
    title?: string;
    description?: string;
    keywords?: string;
}

const extractSeoMetadataFromPage = (page: string): SeoMetadata => {
    let title, description, keywords;
    let match;
    match = /<title>([\s\S]+?)<\/title>/g.exec(page);
    if (match !== null) {
        title = match[1];
    }

    match = /<meta name="description" content="([\s\S]+?)">/g.exec(page);
    if (match !== null) {
        description = match[1];
    }

    match = /<meta name="keywords" content="([\s\S]+?)">/g.exec(page);
    if (match !== null) {
        keywords = match[1];
    }

    return {
        title,
        description,
        keywords
    }
}

const extractUrlsFromSitemap = (sitemap: string): String[] => {
    let urls = [];
    const regex = /<loc>([\s\S]+?)<\/loc>/g
    while (true) {
        const match = regex.exec(sitemap);
        if (match !== null) {
            urls.push(match[1]);
        } else {
            break;
        }
    }

    return urls;
}

module.exports = {
    extractSeoMetadataFromPage,
    extractUrlsFromSitemap
}