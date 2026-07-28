import { en } from './en';
import { zh } from './zh';
import { ja } from './ja';
import { ko } from './ko';

interface LanguagePack {
    [key: string]: string;
}

interface I18nConfig {
    [locale: string]: LanguagePack;
}

/** 读取 vitepress 当前语言（html lang 属性），svelte demo 中替代 vue 版的 useData */
function detectLang(): string {
    if (typeof document !== 'undefined') {
        const htmlLang = document.documentElement.lang;
        if (htmlLang) return htmlLang.split('-')[0];
    }
    return 'zh';
}

export function useI18n(localeConfig: I18nConfig = { en, zh, ja, ko }) {
    const lang = detectLang();

    const t = (key: string, defaultValue: string = key): string => {
        return localeConfig[lang]?.[key] || localeConfig.en?.[key] || defaultValue;
    };

    const getCurrentLang = (): string => {
        return lang;
    };

    const isZH = lang === 'zh';

    const isEN = lang === 'en';

    const isKO = lang === 'ko';

    return {
        t,
        getCurrentLang,
        isZH,
        isEN,
        isKO,
    };
}
