export default function getFileToDipslayLink(file: File) {
    const picture = URL.createObjectURL(file)
    return picture
}