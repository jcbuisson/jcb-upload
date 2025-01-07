
export function readFileAsyncAsArrayBuffer(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = function(e) {
         resolve(e.target.result)
      }

      reader.onerror = function(e) {
         reject(new Error('Error reading file'))
      }

      reader.readAsArrayBuffer(file)
   })
}

// item comes from e.dataTransfer.items or e.dataTransfer.items, see: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items
export function isItemAcceptable(item, accept) {
   if (!accept) return true // No accept pattern, all items are allowed
 
   const acceptPatterns = accept.split(',').map((pattern) => pattern.trim())
   const itemType = item.type
 
   return acceptPatterns.some((pattern) => {
      // Check for wildcards (e.g., image/*)
      if (pattern.endsWith('/*')) {
         const baseType = pattern.slice(0, -2) // e.g., "image/*" -> "image"
         console.log('baseType', baseType)
         return itemType.startsWith(baseType)
      }
   
      // Check for exact MIME types (e.g., image/png)
      if (pattern.includes('/')) {
         return itemType === pattern
      }
   
      return false
   })
}
 