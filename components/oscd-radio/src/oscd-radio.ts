import { css, html, LitElement, PropertyValueMap, TemplateResult } from 'lit';

import { query, property, state } from 'lit/decorators.js';

import '@material/mwc-radio';

import { Radio } from '@material/mwc-radio';
/**
 * @tag oscd-radio
 */
export class OscdRadio extends LitElement {
  @property({
    type: Boolean,
  })
  checked = false;

  @property({
    type: Boolean,
  })
  disabled = false;

  /**
   * @prop {String} value - The value of the Form Control
   */
  @property({
    type: String,
  })
  set value(value: string) {
    this._value = value;

    if (this.radio) {
      this.radio.value = value;
    }
  }

  get value(): string {
    return this.radio ? this.radio.value : this._value;
  }

  /**
   * @internal
   */
  private _value = '';

  @property({
    type: String,
  })
  label = '';

  @query('mwc-radio')
  radio!: Radio;

  private renderRadio(): TemplateResult {
    return html`<mwc-radio
      value=${this.value}
      ?disabled=${this.disabled}
      ?checked=${this.checked}
      .label=${this.label}
    ></mwc-radio>`;
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">${this.renderRadio()}</div>
      </div>
    `;
  }

  static styles = css``;
}
