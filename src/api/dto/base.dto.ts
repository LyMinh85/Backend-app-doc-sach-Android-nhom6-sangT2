export class BaseDto<T> {
  constructor(source: Partial<T>) {
    for (const key of Object.keys(source)) {
      if (source[key as keyof T] !== undefined) {
        (this as any)[key] = source[key as keyof T];
      }
    }
  }
}
