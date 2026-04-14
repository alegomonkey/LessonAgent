// Minimal stubs for browser globals that pdfjs-dist references at module load time.
// Only needed when running on Node.js without @napi-rs/canvas (e.g. Node < 22.3
// where the pdfjs-dist polyfill mechanism fails). Safe to skip at runtime since
// this app only uses PDF text extraction, not rendering.

if (!globalThis.DOMMatrix) {
  (globalThis as Record<string, unknown>).DOMMatrix = class DOMMatrix {
    a = 1;
    b = 0;
    c = 0;
    d = 1;
    e = 0;
    f = 0;
    is2D = true;
    isIdentity = true;

    scaleSelf() {
      return this;
    }
    translateSelf() {
      return this;
    }
    multiplySelf() {
      return this;
    }
    scale() {
      return new DOMMatrix();
    }
    translate() {
      return new DOMMatrix();
    }
    multiply() {
      return new DOMMatrix();
    }
    inverse() {
      return new DOMMatrix();
    }
  };
}

if (!globalThis.Path2D) {
  (globalThis as Record<string, unknown>).Path2D = class Path2D {
    constructor(_path?: string) {}
  };
}

if (!globalThis.ImageData) {
  (globalThis as Record<string, unknown>).ImageData = class ImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    constructor(widthOrData: number | Uint8ClampedArray, height?: number, _h?: number) {
      if (widthOrData instanceof Uint8ClampedArray) {
        this.data = widthOrData;
        this.width = height!;
        this.height = _h ?? (widthOrData.length / (4 * height!));
      } else {
        this.width = widthOrData;
        this.height = height!;
        this.data = new Uint8ClampedArray(widthOrData * height! * 4);
      }
    }
  };
}
