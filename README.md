
# jcb-upload

## Description
A custom-element which displays a drag&drop zone and handles file uploads.

## Attributes
| Name       | Type     | Description |
|------------|----------|-------------|
| multiple   | Boolean  | Indicates whether multiple files can be uploaded |
| chunksize  | Number   | Chunk size when providing file contents by chunk |
| accept     | String   | Accepted Mime types, comma-separated |

## CSS Properties
| Name                          | Description |
|-------------------------------|-------------|
| --jcb-upload-background-color | Color of the background |
| --jcb-upload-hover-color      | Color of the background on hover |
| --jcb-upload-error-color      | Color of the background on hover with unacceptable files |
| --jcb-upload-border-width     | Dotted border width
| --jcb-upload-border-color     | Dotted border color
| --jcb-upload-border-radius    | Dotted border corner radius
| --jcb-upload-padding          | Content padding

## Events
| Name           | Details         | Description |
|----------------|-----------------|-------------|
| upload-error   | { errorcode }   | errorCode='no-multiple' when several files are provided while 'multiple' attribute is not set ; errorCode='wrong-type' when one of the files is of a Mime-type not compatible with 'accept' attribute |
| upload-start   | { file } | Indicates start of upload for file |
| upload-chunk   | { file, arrayBufferSlice } | Indicates a new chunk arrayBufferSlice of file |
| upload-end     | { file } | Indicates end of upload for file |


# Example usage

```
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>jcb-upload</title>
      <script type="module" src="/src/jcb-upload.js"></script>
   </head>
   <body>
      <div class="panel">
         <jcb-upload id="upload" multiple chunksize="32768" accept="application/pdf, image/*">
            Drag & drop files or click here. See <a href='#'>example</a>
         </jcb-upload>
      </div>
   </body>
</html>

<script>
   document.getElementById('upload').addEventListener('upload-start', (e) => console.log('upload-start', e))
   document.getElementById('upload').addEventListener('upload-chunk', (e) => console.log('upload-chunk', e))
   document.getElementById('upload').addEventListener('upload-end', (e) => console.log('upload-end', e))
   document.getElementById('upload').addEventListener('upload-error', (e) => console.log('upload-error', e))
</script>

<style>
:root {
   --jcb-upload-background-color: #fcfcfc;
   --jcb-upload-hover-color: #ccc;
   --jcb-upload-border-width: 3px;
   --jcb-upload-border-color: #800;
   --jcb-upload-border-radius: 40px;
}

.panel {
   width: 800px;
   height: 400px;
}
</style>
```
