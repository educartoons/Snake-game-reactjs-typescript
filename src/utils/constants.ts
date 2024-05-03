

export enum ARROW_KEYS {
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown'
}

export function isAValidKey(key: string) {
  return key in ARROW_KEYS
}