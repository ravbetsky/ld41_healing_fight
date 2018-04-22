export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
