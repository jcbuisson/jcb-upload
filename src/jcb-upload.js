import { LitElement, css, html } from 'lit'

/**
   * A custom-element which displays a drag&drop zone and handles file uploads
   * @attr {Boolean} multi - Indicates whether multiple files can be uploaded
   * @cssprop --jcb-upload-color - Color of the ticks
   * @cssprop --jcb-upload-background-color - Color of the background
   * @cssprop --jcb-upload-hover-color - Color of the background on hover
   * --jcb-upload-border-width
   * --jcb-upload-border-color
   * --jcb-upload-border-radius
   */
export class Upload extends LitElement {

   static get properties() {
      return {
         multi: { type: Boolean },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.multi = false
   }
   
   onDragOver(e) {
      // console.log('onDragOver', e)
      e.preventDefault()
      e.target.classList.add('hovering')
   }

   onDragLeave(e) {
      // console.log('onDragLeave', e)
      e.target.classList.remove('hovering')
   }

   onDrop(e) {
      // console.log('onDrop')
      e.preventDefault()
      e.target.classList.remove('hovering')
      for (const file of e.dataTransfer.files) {
         this.uploadFile(file)
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
   }

   uploadFile(file) {
      console.log('file', file)
      // signal start of file upload
      this.dispatchEvent(new CustomEvent('upload-start', {
         detail: { file }, // Pass data with the event
         bubbles: true, // Allow the event to bubble up through the DOM
         composed: true, // Allow the event to pass the shadow DOM boundary
      }))
      // send file contents chunk by chunk

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
         <div class="dropzone" @dragover="${this.onDragOver}" @dragleave="${this.onDragLeave}" @drop="${this.onDrop}" @click="${this.onClick}">
            <div class="text">
               <div>
                  <slot></slot>
               </div>
            </div>
            <input type="file" id="fileInput" name="file" ${this.multi} accept="application/pdf" hidden @change="${this.onFileInputChange}">
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

         .dropzone {
            border-style: dashed;
            border-width: var(--jcb-upload-border-width, 2px);
            border-color: var(--jcb-upload-border-color, #aaa);
            border-radius: var(--jcb-upload-border-radius, 20px);
            padding: 20px;
            margin: 20px auto;
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

         .text {
            display: flex;
            width: 100%;
            justify-content: center;
         }
      `
   }
}

window.customElements.define('jcb-upload', Upload)
