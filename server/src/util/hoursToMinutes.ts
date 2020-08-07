export default (time: string) => {
    const [hour, minute] = time.split(':').map(Number)
    return (hour * 60) + minute
}