import { query, state } from "lit-element";
import { html, LitElement, TemplateResult } from "lit";

import { newOpenEvent } from "@openscd/open-scd-core";

import { MenuPlugin } from "@openscd/oscd-plugin-core";

import "@openscd/oscd-dialog";
import "@openscd/oscd-textfield";

import { OscdDialog } from "@openscd/oscd-dialog";
import { OscdTextfield } from "@openscd/oscd-textfield";

import "@material/mwc-list";
import "@material/mwc-list/mwc-radio-list-item";

import { List } from "@material/mwc-list";
import { ListItemBase } from "@material/mwc-list/mwc-list-item-base";
import { Scl } from "@openscd/oscd-scl";

export default class OscdNew extends LitElement implements MenuPlugin {
  @query("oscd-dialog")
  dialog?: OscdDialog;

  @query("oscd-textfield")
  textfield?: OscdTextfield;

  @query("mwc-list")
  versionList?: List;

  @state()
  valid = false;

  constructor() {
    super();
  }

  async run(): Promise<void> {
    this.dialog?.show();
  }

  render(): TemplateResult {
    return html`<oscd-dialog>
      <oscd-textfield
        label="Name"
        value="project.scd"
        required
        @input=${this.onChange}
      ></oscd-textfield>
      <mwc-list activatable @selected=${this.onChange}>
        <mwc-radio-list-item left value="2003"
          >Edition 1 (Schema 1.7)</mwc-radio-list-item
        >
        <mwc-radio-list-item left value="2007B"
          >Edition 2 (Schema 3.1)</mwc-radio-list-item
        >
        <mwc-radio-list-item left selected value="2007B4"
          >Edition 2.1 (2007B4)</mwc-radio-list-item
        >
      </mwc-list>
      <mwc-button
        @click=${this.onSave}
        slot="primaryAction"
        ?disabled=${!this.valid}
        icon="create_new_folder"
        >Create</mwc-button
      >
      <mwc-button
        @click=${this.onCancel}
        slot="secondaryAction"
        style="--mdc-theme-primary: var(--mdc-theme-error)"
      >
        Cancel</mwc-button
      >
    </oscd-dialog>`;
  }

  get name(): string {
    return this.textfield?.value || "";
  }

  get selectedVersion(): Scl.SupportedVersion | undefined {
    const selectedItem: ListItemBase | undefined =
      <ListItemBase>this.versionList?.selected || undefined;

    return selectedItem?.value as Scl.SupportedVersion;
  }

  protected onChange() {
    if (this.name.length > 0 && this.selectedVersion) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  protected onSave() {
    const docName = this.name.match(/\.s[sc]d$/i)
      ? this.name
      : `${this.name}.scd`;

    this.dispatchEvent(
      newOpenEvent(
        Scl.newEmptySCD(docName.slice(0, -4), this.selectedVersion!),
        docName
      )
    );
    this.dialog?.hide();
  }

  protected onCancel() {
    this.dialog?.hide();
  }
}
