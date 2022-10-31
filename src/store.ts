interface ctxType {
  query: { [index: string]: string }
}

export const ctx = {
  query: {}
} as ctxType

export const reset = () => {
  ctx.query = {}
}
