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
    // <loc>https://ersh.su/</loc>
    return []
}

module.exports = {
    extractSeoMetadataFromPage,
    extractUrlsFromSitemap
}