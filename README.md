
# `jcb-upload` Web Component Documentation

## Description

A custom-element that displays a drag-and-drop zone and handles file uploads.

---

## Attributes

| Attribute          | Type    | Default     | Description                                              |
|--------------------|---------|-------------|----------------------------------------------------------|
| `multiple`         | Boolean | `false`     | Indicates whether multiple files can be uploaded.        |
| `chunksize`        | Number  | `32768`     | Chunk size when providing file contents by chunk.        |
| `accept`           | String  | `undefined` | Accepted MIME types, comma-separated.                    |

---

## CSS Custom Properties

| CSS Property                          | Default    | Description                                              |
|---------------------------------------|------------|----------------------------------------------------------|
| `--jcb-upload-background-color`       | `#fcfcfc`  | Color of the background.                                 |
| `--jcb-upload-hover-color`            | `#f0f0f0`  | Color of the background on hover.                        |
| `--jcb-upload-error-color`            | `#F88`     | Color of the background when hovering with unacceptable files. |
| `--jcb-upload-border-width`           | `2px`      | Dotted border width.                                     |
| `--jcb-upload-border-color`           | `#aaa`     | Dotted border color.                                     |
| `--jcb-upload-border-radius`          | `20px`     | Dotted border corner radius.                             |
| `--jcb-upload-padding`                | `20px`     | Content padding.                                         |

---

## Events

### `upload-start`
- **Description**: Fired when the upload of a file starts.
- **Detail**:
  - `file`: The file that is starting to upload.

---

### `upload-chunk`
- **Description**: Fired for each chunk during a file upload.
- **Detail**:
  - `file`: The file being uploaded.
  - `arrayBufferSlice`: The current chunk of the file being uploaded.

---

### `upload-end`
- **Description**: Fired when the upload of a file completes.
- **Detail**:
  - `file`: The file that has completed uploading.

---

### `upload-error`
- **Description**: Fired when an error occurs during upload.
- **Detail**:
  - `errorCode`: Describes the type of error.
    - `no-multiple`: Fired when several files are provided, but the `multiple` attribute is not set.
    - `wrong-type`: Fired when one or more files have MIME types not compatible with the `accept` attribute.




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
            Drag & drop files or click here.</a>
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
