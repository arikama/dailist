import moment from 'moment'

const date = new Date()
const utcOffset = date.getTimezoneOffset()

export default (utc) => {
  return moment(utc).utcOffset(utcOffset).format()
}
