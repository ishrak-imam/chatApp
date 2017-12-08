
export function formatSnapshot (list) {
  const formatted = []
  list.forEach(item => {
    formatted.push(item.val())
  })
  return formatted
}
