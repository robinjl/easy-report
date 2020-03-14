import {stringify} from 'qs';
import request from "./request";

// 登录
export function login(params){
  return request('/users/login/', {
    method: 'POST',
    data: params
  })
}

// 日报
export function queryDailyReports(params){
  return request(`/daily-report/?${stringify(params)}`)
}

export function readDailyReport(id){
  return request(`/daily-report/${id}/`)
}

export function createDailyReport(params){
  return request('/daily-report/', {
    method: 'POST',
    data: params
  })
}

export function updateDailyReport({id, ...params}){
  return request(`/daily-report/${id}/`, {
    method: 'PUT',
    data: params
  })
}

// 统计列表
export function queryDailyReportStatistics(){
  return request('/daily-report/statistics/')
}




