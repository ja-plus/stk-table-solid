export function getIsZH() {
    if (typeof document !== 'undefined') {
        const htmlLang = document.documentElement.lang;
        if (htmlLang) return htmlLang.split('-')[0] === 'zh';
    }
    return true;
}
