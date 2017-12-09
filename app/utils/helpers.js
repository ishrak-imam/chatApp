
export function formatSnapshot (list) {
  const formatted = []
  list.forEach(item => {
    formatted.push(item.val())
  })
  return formatted
}

export function formatMessages (list) {
  const formatted = []
  list.forEach(item => {
    let message = item.val()
    message['_id'] = item.key
    formatted.push(message)
  })
  return formatted
}

export function threadExists (threads, threadId) {
  let bool = false
  threads.forEach(thread => {
    if (thread.key === threadId) {
      bool = true
    }
  })
  return bool
}
