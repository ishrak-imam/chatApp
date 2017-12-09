
export function formatSnapshot (list) {
  const formatted = []
  list.forEach(item => {
    let obj = item.val()
    obj['_id'] = item.key
    formatted.push(obj)
  })
  return formatted
}

export function getCurrentUser (userList, userId) {
  return userList.find(user => user.userId === userId)
}

export function formatSingleObject (obj) {
  let item = obj.val()
  item['_id'] = obj.key
  return item
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
