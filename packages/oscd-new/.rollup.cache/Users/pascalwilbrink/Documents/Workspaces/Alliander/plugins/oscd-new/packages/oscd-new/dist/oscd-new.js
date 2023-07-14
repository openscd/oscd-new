import { __decorate, __metadata } from "tslib";
import { query, state } from "lit-element";
import { html, LitElement } from "lit";
import { newOpenEvent } from "@openscd/open-scd-core";
import "@openscd/oscd-dialog";
import "@openscd/oscd-textfield";
import { OscdDialog } from "@openscd/oscd-dialog";
import { OscdTextfield } from "@openscd/oscd-textfield";
import "@material/mwc-list";
import "@material/mwc-list/mwc-radio-list-item";
import { List } from "@material/mwc-list";
import { Scl } from "@openscd/oscd-scl";
export default class OscdNew extends LitElement {
    constructor() {
        super();
        this.valid = false;
    }
    async run() {
        var _a;
        (_a = this.dialog) === null || _a === void 0 ? void 0 : _a.show();
    }
    render() {
        return html `<oscd-dialog>
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
    get name() {
        var _a;
        return ((_a = this.textfield) === null || _a === void 0 ? void 0 : _a.value) || "";
    }
    get selectedVersion() {
        var _a;
        const selectedItem = ((_a = this.versionList) === null || _a === void 0 ? void 0 : _a.selected) || undefined;
        return selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value;
    }
    onChange() {
        if (this.name.length > 0 && this.selectedVersion) {
            this.valid = true;
        }
        else {
            this.valid = false;
        }
    }
    onSave() {
        var _a;
        const docName = this.name.match(/\.s[sc]d$/i)
            ? this.name
            : `${this.name}.scd`;
        this.dispatchEvent(newOpenEvent(Scl.newEmptySCD(docName.slice(0, -4), this.selectedVersion), docName));
        (_a = this.dialog) === null || _a === void 0 ? void 0 : _a.hide();
    }
    onCancel() {
        var _a;
        (_a = this.dialog) === null || _a === void 0 ? void 0 : _a.hide();
    }
}
__decorate([
    query("oscd-dialog"),
    __metadata("design:type", OscdDialog)
], OscdNew.prototype, "dialog", void 0);
__decorate([
    query("oscd-textfield"),
    __metadata("design:type", OscdTextfield)
], OscdNew.prototype, "textfield", void 0);
__decorate([
    query("mwc-list"),
    __metadata("design:type", List)
], OscdNew.prototype, "versionList", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], OscdNew.prototype, "valid", void 0);
//# sourceMappingURL=oscd-new.js.map