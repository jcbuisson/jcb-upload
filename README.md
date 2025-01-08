
# jcb-upload

Usage

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
