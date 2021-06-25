import Resizer from "react-image-file-resizer"

// https://www.npmjs.com/package/react-image-file-resizer
export default async function resizeImage(file, maxSize = 480, minSize=480) {
  if (!file.type.match(/image.*/)) return file

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxSize,
        maxSize,
        "image/jpeg",
        100, //quality
        0, // rotation
        (uri) => {
          resolve(uri);
        },
        "base64",
        minSize,
        minSize
      )
    })

  const blob = await resizeFile(file)
  file = new File([dataURItoBlob(blob)], file.name)
  return file
}

// https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}
