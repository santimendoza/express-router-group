declare module 'express' {
  export interface Router {
    group(arg1: any, arg2?: any, arg3?: any): Router;
  }
}