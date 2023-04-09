/*
 * @Author: your name
 * @Date: 2020-05-19 10:40:35
 * @LastEditTime: 2020-05-28 11:20:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ClinicAdminFront\src\utils\validate.js
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
