import { css, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit-element';

import '@material/mwc-dialog';

/**
 * @tag oscd-dialog
 */
export class OscdDialog extends LitElement {
  @property({
    type: Boolean,
    reflect: true,
  })
  open = false;

  show(): void {
    this.open = true;
  }

  hide(): void {
    this.open = false;
  }

  render(): TemplateResult {
    return html`<mwc-dialog ?open=${this.open} @closed=${this.hide}
      ><slot></slot
      ><span slot="primaryAction"><slot name="primaryAction"></slot></span
      ><span slot="secondaryAction"><slot name="secondaryAction"></slot></span
    ></mwc-dialog>`;
  }

  static styles = css``;
}
