const fs = require('fs');

function getKeysFromOptions(options) {
  const { settings, _locals, ...objectKeys } = options;
  return Object.keys(objectKeys);
}

// va a devolver todo el contenido ya renderizado 
function getRenderedContent(content, object) {
  const keys = getKeysFromOptions(object)
  console.log(keys)
  let contentString = content.toString();

  for (let key of keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, 'gi'),
      object[key]
    )
  }
  
  return contentString;
}

// filePath es el primer parametro del render en get (index)
// el options es el objeto pasado como segundo argumento en ese render q busca 
// mostrarse en la vista. Sin embargo viene con propiedades adicionales q expres
// inyecta
function expressJsx(filePath, options, callback) {
  console.log(filePath)
  fs.readFile(filePath, function(err, content) {
    
    if (err) {
      return callback(err)
    }

    const rendered = getRenderedContent(content, options);

    return callback(null, rendered)
  })
}

module.exports = expressJsx;
