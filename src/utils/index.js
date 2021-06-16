export function redirectPath (query, redirectKey = 'redirect') {
  let redirectValue = query[redirectKey]
  if (redirectValue) {
    return redirectValue
  } else {
    return '/home'
  }
}
