/* @flow */
import type {Context as KoaContext} from 'koa';
declare var __NODE__: Boolean;
declare var __BROWSER__: Boolean;

type ExtendedKoaContext = KoaContext & {memoized: Map<Object, mixed>};

type aliaser<Token> = {
  alias: (sourceToken: Token, destToken: Token) => aliaser<*>,
};

declare type SSRContext = {
  element: any,
  template: {
    htmlAttrs: Object,
    title: string,
    head: Array<string>,
    body: Array<string>,
  },
} & ExtendedKoaContext;
declare type Context = SSRContext | ExtendedKoaContext;
declare type FusionPlugin<Deps, Service> = {
  deps?: Deps,
  provides?: Deps => Service,
  middleware?: (Deps, Service) => Middleware,
};
declare type Middleware = (
  ctx: Context,
  next: () => Promise<void>
) => Promise<*>;

declare class FusionApp {
  constructor<Element>(element: Element, render: (Element) => any): FusionApp;
  registered: Map<any, any>;
  plugins: Array<any>;
  renderer: any;
  register<A, B>(Plugin: FusionPlugin<A, B>): aliaser<*>;
  register<A, B>(token: B, Plugin: FusionPlugin<A, B>): aliaser<*>;
  register<A: string>(token: A, val: string): aliaser<*>;
  register<A: number>(token: A, val: number): aliaser<*>;
  register<A: Object>(token: A, val: $Exact<A>): aliaser<*>;
  middleware<Deps>(deps: Deps, middleware: (Deps) => Middleware): void;
  middleware(middleware: Middleware): void;
  callback(): () => Promise<void>;
  resolve(): void;
}