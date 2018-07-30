import request from '@/utils/request'

export function getProblemInfo(platform, problemId) {
  return request({
    url: `/api/v1/problemBank/${platform}/${problemId}`,
    method: 'get',
  })
}
