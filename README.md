
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
         <jcb-upload id="upload">
            Drag & drop files here. See <a href='#'>there</a>
         </jcb-upload>
      </div>
   </body>
</html>

<script>
   document.getElementById('upload').addEventListener('upload-start', (e) => console.log(e))
</script>

<style>
:root {
   --jcb-upload-color: red;
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
