export const highlightKeywords = (text: string, keyword: string) => {
    if (!keyword) return text
    const regex = new RegExp(keyword, 'gi');
    const matches = text.match(regex);
    if (!matches) return text;
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);

}