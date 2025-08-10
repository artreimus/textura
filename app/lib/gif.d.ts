declare module 'gif.js' {
  interface GifOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    workerScript?: string;
    background?: string;
    transparent?: string | null;
    debug?: boolean;
  }

  interface AddFrameOptions {
    delay?: number;
    copy?: boolean;
  }

  class GIF {
    constructor(options?: GifOptions);
    addFrame(
      element: HTMLCanvasElement | HTMLVideoElement | CanvasRenderingContext2D | ImageData,
      options?: AddFrameOptions
    ): void;
    render(): void;
    abort(): void;
    on(event: 'finished', callback: (blob: Blob) => void): void;
    on(event: 'error', callback: (error: Error) => void): void;
    on(event: 'progress', callback: (progress: number) => void): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
  }

  export = GIF;
}