import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { default as default_2 } from 'markdown-it';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<VitepressDemoBoxProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
mount: (...args: any[]) => void;
}, string, PublicProps, Readonly<VitepressDemoBoxProps> & Readonly<{
onMount?: ((...args: any[]) => any) | undefined;
}>, {
select: ComponentType;
order: string;
github: string;
gitlab: string;
htmlWriteWay: "write" | "srcdoc";
visible: boolean;
title: string;
description: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
htmlContainerRef: HTMLDivElement;
reactContainerRef: HTMLDivElement;
svelteContainerRef: HTMLDivElement;
solidContainerRef: HTMLDivElement;
sourceRef: HTMLElement;
sourceContentRef: HTMLDivElement;
}, HTMLDivElement>;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        vue?(_: {}): any;
    };
    refs: {
        htmlContainerRef: HTMLDivElement;
        reactContainerRef: HTMLDivElement;
        svelteContainerRef: HTMLDivElement;
        solidContainerRef: HTMLDivElement;
        sourceRef: HTMLElement;
        sourceContentRef: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type CodeFiles = string[] | Record<string, string>;

declare enum ComponentType {
    VUE = "vue",
    REACT = "react",
    SVELTE = "svelte",
    SOLID = "solid",
    HTML = "html"
}

declare type Locale = {
    [key: string]: 'zh-CN' | 'en-US' | LocaleText;
};

declare interface LocaleText {
    openInStackblitz: string;
    openInCodeSandbox: string;
    openInGithub: string;
    openInGitlab: string;
    collapseCode: string;
    expandCode: string;
    copyCode: string;
    copySuccess: string;
    copyFail: string;
    openInPlayground: string;
}

declare type Platform = {
    show: boolean;
    templates?: PlatformTemplate[];
};

declare interface PlatformTemplate {
    scope: 'global' | 'vue' | 'react' | 'svelte' | 'solid' | 'html' | string;
    files: Record<string, string>;
}

declare type Playground = {
    show: boolean;
    templates?: PlatformTemplate[];
    config: PlaygroundConfig | (PlaygroundConfig & {
        name: string;
    })[];
};

declare type PlaygroundConfig = {
    url: string | ((content: string) => string);
    fn?: (files: Record<string, string>) => string;
    entryName?: {
        vue?: string;
        react?: string;
        svelte?: string;
        solid?: string;
        html?: string;
    };
};

declare interface TabConfig {
    /**
     * @cn 代码切换 tab 的展示顺序
     * @en The order of the code switch tab
     */
    order?: string;
    /**
     * @cn 是否显示 tab
     * @en Whether to show the tab
     */
    visible?: boolean;
    /**
     * @cn 默认选中的 tab
     * @en The default selected tab
     */
    select?: string;
}

export declare const VitepressDemoBox: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

declare interface VitepressDemoBoxConfig {
    /**
     * @cn demo所在目录
     * @en The directory of the demo
     */
    demoDir?: string;
    /**
     * @cn 代码切换 tab 的配置
     * @en The configuration of the code switch tab
     */
    tab?: TabConfig;
    /**
     * @cn stackblitz 平台配置
     * @en The configuration of the stackblitz platform
     */
    stackblitz?: Platform;
    /**
     * @cn codesandbox 平台配置
     * @en The configuration of the codesandbox platform
     */
    codesandbox?: Platform;
    /**
     * @cn vue 展示的代码文件
     * @en The code files of the vue
     */
    vueFiles?: CodeFiles;
    /**
     * @cn react 展示的代码文件
     * @en The code files of the react
     */
    reactFiles?: CodeFiles;
    /**
     * @cn svelte 展示的代码文件
     * @en The code files of the svelte
     */
    svelteFiles?: CodeFiles;
    /**
     * @cn solid 展示的代码文件
     * @en The code files of the solid
     */
    solidFiles?: CodeFiles;
    /**
     * @cn html 展示的代码文件
     * @en The code files of the html
     */
    htmlFiles?: CodeFiles;
    /**
     * @cn 亮色模式主题，参考 https://shiki.style/themes#bundled-themes
     * @en The light theme, reference https://shiki.style/themes#bundled-themes
     */
    lightTheme?: string;
    /**
     * @cn 暗色模式主题，参考 https://shiki.style/themes#bundled-themes
     * @en The dark theme, reference https://shiki.style/themes#bundled-themes
     */
    darkTheme?: string;
    /**
     * @cn 亮色/暗色模式统一的主题(建议使用 lightTheme 和 darkTheme 分开)，参考 https://shiki.style/themes#bundled-themes
     * @en The light/dark theme, reference https://shiki.style/themes#bundled-themes
     */
    theme?: string;
    /**
     * @cn 国际化配置 'zh-CN' | 'en-US'
     * @en The locale configuration 'zh-CN' | 'en-US'
     */
    locale?: Locale;
    /**
     * @cn 自定义 playground 平台配置
     * @en The configuration of the custom playground platform
     */
    playground?: Playground;
}

declare interface VitepressDemoBoxProps {
    title?: string;
    description?: string;
    reactComponent?: any;
    svelteComponent?: any;
    solidComponent?: any;
    vueCode?: string;
    reactCode?: string;
    svelteCode?: string;
    solidCode?: string;
    htmlCode?: string;
    order: string;
    visible?: boolean;
    select?: ComponentType;
    github?: string;
    gitlab?: string;
    reactCreateElement?: any;
    reactCreateRoot?: any;
    svelteMount?: any;
    svelteUnmount?: any;
    solidRender?: any;
    solidCreateComponent?: any;
    stackblitz?: string;
    codesandbox?: string;
    scope?: string;
    files: string;
    lightTheme?: string;
    darkTheme?: string;
    theme?: string;
    locale?: string;
    htmlWriteWay?: 'write' | 'srcdoc';
    background?: string;
    htmlPlayground?: string;
    vuePlayground?: string;
    reactPlayground?: string;
    sveltePlayground?: string;
    solidPlayground?: string;
}

export declare const VitepressDemoPlaceholder: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, HTMLDivElement>;

export declare const vitepressDemoPlugin: (md: default_2 & any, params?: VitepressDemoBoxConfig) => void;

export { }
