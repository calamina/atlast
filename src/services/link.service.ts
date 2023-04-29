import http from '@/utils/http-common'

async function getLinks(): Promise<any> {
  return http
    .get<Array<any>>('/links')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

export function useLinkService() {
  return {
    getLinks
  }
}
