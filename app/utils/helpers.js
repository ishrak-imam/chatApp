
export function formatSnapshot (list) {
  const formatted = []
  list.forEach(item => {
    let obj = item.val()
    obj['_id'] = item.key
    formatted.push(obj)
  })
  return formatted
}

// export function formatMessages (list) {
//   const formatted = []
//   list.forEach(item => {
//     let message = item.val()
//     message['_id'] = item.key
//     formatted.push(message)
//   })
//   return formatted
// }

export function getCurrentUser (userList, userId) {
  return userList.find(user => user.userId === userId)
}

export function formatMessage (item) {
  let message = item.val()
  message['_id'] = item.key
  return message
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
