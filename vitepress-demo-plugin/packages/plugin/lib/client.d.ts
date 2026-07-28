import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
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

declare enum ComponentType {
    VUE = "vue",
    REACT = "react",
    SVELTE = "svelte",
    SOLID = "solid",
    HTML = "html"
}

export declare const VitepressDemoBox: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

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

export { }
