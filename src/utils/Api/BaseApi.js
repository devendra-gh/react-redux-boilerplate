// import isomorphicFetch from 'isomorphic-fetch'
// import { ApiUrl, WebUrl } from '../../constants/index'
// import { history } from '../GetHistory'
//
// const defaultOptions = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   credentials: 'include'
// }
//
// /**
//  Used for making request to the api.
//  */
// export function makeRequest (uri, options = defaultOptions, isStream = false) {
//   uri = `${process.env.API_URI}${uri}`
//
//   return isomorphicFetch(uri, options)
//     .then(function (response) {
//       if (response.status >= 400) {
//
//         //If api call has unauthorised response then redirect to login page.
//         if (response.status == 401) {
//           history.push(WebUrl.SIGNUP_URL)
//           return
//         }
//         //will be throwing some betting structured error messages.
//         throw new Error(response.status)
//       }
//       //returns a json request.
//       return response.json()
//     })
// }
//
// export function doGetRequest (uri, data, options = defaultOptions) {
//   options.body = null
//   options.method = 'GET'
//   return makeRequest(uri, options)
// }
//
// export function doPostRequest (uri, data, options = defaultOptions) {
//   options.body = JSON.stringify(data)
//   options.method = 'POST'
//   return makeRequest(uri, options)
// }
//
//
