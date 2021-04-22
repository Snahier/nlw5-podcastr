export const convertDurationToTimeString = (duration: number) => {
  const ONE_MINUTE_IN_SECONDS = 60
  const ONE_HOUR_IN_SECONDS = 3600

  const hours = Math.floor(duration / ONE_HOUR_IN_SECONDS)
  const minutes = Math.floor(
    (duration % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS
  )
  const seconds = duration % ONE_MINUTE_IN_SECONDS

  const timeString = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":")

  return timeString
}
