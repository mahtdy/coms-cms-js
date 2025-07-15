

export default interface Messager {
    new(): MyMessager;
    send(options?: {}): Promise<Boolean>;
}

export interface MyMessager {

}

// interface MyTypeStatic {
//     staticMethod(): any;
// }

/* class decorator */
export function staticImplements<T>() {
    return <U extends T>(constructor: U) =>  constructor;
}
