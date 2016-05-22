import promisify from "es6-promisify"
import fs from "fs"
import path from "path"

export let move = (sourcefile, destinationFolder, originalname) => {
  let rename = promisify(fs.rename)
  let ext = path.extname(originalname)
  let basename = path.basename(originalname, ext)
  var newFileName, newPath
  var i = 0
  do {
    newFileName = (i == 0) ? basename + ext : basename + "(" + i + ")" + ext
    newPath = path.join(destinationFolder, newFileName)
    i = i + 1
  } while (fs.existsSync(newPath));

  return rename(sourcefile, newPath).then(() => newPath)
}
