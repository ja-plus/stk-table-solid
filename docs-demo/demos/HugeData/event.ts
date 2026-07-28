import type { DataType } from './types';

type Events = {
    'toggle-expand': DataType;
};

type Handler<T> = (event: T) => void;

/** 轻量级事件发射器（API 兼容 mitt） */
class Emitter {
    private handlers = new Map<keyof Events, Set<Handler<any>>>();

    on<K extends keyof Events>(type: K, handler: Handler<Events[K]>) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, new Set());
        }
        this.handlers.get(type)!.add(handler);
    }

    off<K extends keyof Events>(type: K, handler: Handler<Events[K]>) {
        this.handlers.get(type)?.delete(handler);
    }

    emit<K extends keyof Events>(type: K, event: Events[K]) {
        this.handlers.get(type)?.forEach(handler => handler(event));
    }
}

export const emitter = new Emitter();
