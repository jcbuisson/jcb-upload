import { LitElement, css, html } from 'lit'
import { readFileAsyncAsArrayBuffer, isItemAcceptable } from './lib/utilities.mjs'

/**
   * A custom-element which displays a drag&drop zone and handles file uploads
   * @attr {Boolean} multiple - Indicates whether multiple files can be uploaded
   * @attr {Number} chunksize - Chunk size when providing file contents chunk by chunk
   * @attr {String} accept - Accepted Mime types, comma-separated
   * @cssprop --jcb-upload-background-color - Color of the background
   * @cssprop --jcb-upload-hover-color - Color of the background on hover
   * @cssprop --jcb-upload-error-color - Color of the background on hover with unacceptable files
   * @cssprop --jcb-upload-border-width
   * @cssprop --jcb-upload-border-color
   * @cssprop --jcb-upload-border-radius
   * @cssprop --jcb-upload-padding - Content padding
   */
export class Upload extends LitElement {

   static get properties() {
      return {
         multiple: { type: Boolean },
         chunksize: { type: Number },
         accept: { type: String },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.multiple = false
      this.chunksize = 32768
      this.accept = undefined
   }

   onDragEnter(e) {
      // console.log('onDragEnter', e)
      e.preventDefault() // prevent default to allow drop (why?)
      // when firing dragenter, dragover and dragleave, browser shows only e.dataTransfer.items, not e.dataTransfer.files (see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items)
      const acceptable = (this.multiple || e.dataTransfer.items.length === 1) && Array.from(e.dataTransfer.items).every(item => isItemAcceptable(item, this.accept))
      e.target.classList.add(acceptable ? 'hovering' : 'error')
   }

   onDragOver(e) {
      // console.log('onDragOver', e)
      e.preventDefault() // prevent default to allow drop (why?)
   }

   onDragLeave(e) {
      // console.log('onDragLeave', e)
      e.target.classList.remove('hovering')
      e.target.classList.remove('error')
   }

   onDrop(e) {
      // console.log('onDrop', e)
      e.preventDefault() // prevent default to handle files
      e.target.classList.remove('hovering')
      e.target.classList.remove('error')
      if (!this.multiple && e.dataTransfer.files.length > 1) {
         this.dispatchEvent(new CustomEvent('upload-error', {
            detail: { errorcode: 'no-multiple' }, // Pass data with the event
            bubbles: true, // Allow the event to bubble up through the DOM
            composed: true, // Allow the event to pass the shadow DOM boundary
         }))
      } else {
         if (Array.from(e.dataTransfer.files).some(file => !isItemAcceptable(file, this.accept))) {
            this.dispatchEvent(new CustomEvent('upload-error', {
               detail: { errorcode: 'wrong-type' }, // Pass data with the event
               bubbles: true, // Allow the event to bubble up through the DOM
               composed: true, // Allow the event to pass the shadow DOM boundary
            }))
         } else {
            for (const file of e.dataTransfer.files) {
               this.uploadFile(file)
            }
         }
      }
   }

   onClick() {
      const fileInput = this.renderRoot.querySelector('#fileInput')
      // programatically click on hidden file input to trigger file browser
      fileInput.click()
   }

   // called when files have been selected in <input type='file'>
   onFileInputChange(e) {
      console.log('onFileInputChange', e.target.files)
      for (const file of e.target.files) {
         this.uploadFile(file)
      }
   }

   async uploadFile(file) {
      // console.log('file', file)

      // signal start of file upload
      this.dispatchEvent(new CustomEvent('upload-start', {
         detail: { file }, // Pass data with the event
         bubbles: true, // Allow the event to bubble up through the DOM
         composed: true, // Allow the event to pass the shadow DOM boundary
      }))

      // send file contents chunk by chunk
      const arrayBuffer = await readFileAsyncAsArrayBuffer(file)
      let transmittedCount = 0
      for (let offset = 0; offset < arrayBuffer.byteLength; offset += this.chunksize) {
         // the last slice is usually smaller
         const arrayBufferSlice = arrayBuffer.slice(offset, offset + this.chunksize)
         this.dispatchEvent(new CustomEvent('upload-chunk', {
            detail: { file, arrayBufferSlice }, // Pass data with the event
            bubbles: true, // Allow the event to bubble up through the DOM
            composed: true, // Allow the event to pass the shadow DOM boundary
         }))
         transmittedCount += arrayBufferSlice.byteLength
         // await timeout(10) // ??? nécessaire pour que le spinner soit visible
      }
   
      // signal end of file upload
      this.dispatchEvent(new CustomEvent('upload-end', {
         detail: { file }, // Pass data with the event
         bubbles: true, // Allow the event to bubble up through the DOM
         composed: true, // Allow the event to pass the shadow DOM boundary
      }))
   }

   // called whenever a property changes
   render() {
      // console.log('render')
      return html`
         <div class="dropzone" @dragenter="${this.onDragEnter}" @dragover="${this.onDragOver}" @dragleave="${this.onDragLeave}" @drop="${this.onDrop}" @click="${this.onClick}">
            <div class="text">
               <div>
                  <slot></slot>
               </div>
            </div>
            
            <input type="file" id="fileInput" name="file" ?multiple="${this.multiple}" accept="${this.accept}" hidden @change="${this.onFileInputChange}">
         </div>
      `
   }

   static get styles() {
      return css`
         /* :host selects the host element (<jcb-upload>, not its shadow dom) */
         :host {
            display: inline-block; /* by default a CE is inline and width & height do not apply */
            width: 100%; /* <jcb-upload> takes full parent width */
            height: 100%; /* <jcb-upload> takes full parent height */
         }

         * {
            box-sizing: border-box;
         }

         .dropzone {
            border-style: dashed;
            border-width: var(--jcb-upload-border-width, 2px);
            border-color: var(--jcb-upload-border-color, #aaa);
            border-radius: var(--jcb-upload-border-radius, 20px);
            margin: auto;
            padding: var(--jcb-upload-padding, 20px);
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: var(--jcb-upload-background-color, #fcfcfc);
         }

         .dropzone.hovering {
            border-color: #000;
            background-color: var(--jcb-upload-hover-color, #f0f0f0);
         }

         .dropzone.error {
            border-color: #000;
            background-color: var(--jcb-upload-error-color, #F88);
         }

         .text {
            display: flex;
            width: 100%;
            justify-content: center;
         }
      `
   }
}

window.customElements.define('jcb-upload', Upload)
