const formatMessageDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()

  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  const formattedDate = `${formattedHours}:${formattedMinutes} | ${month} ${day}`

  return formattedDate
}

export default formatMessageDate
