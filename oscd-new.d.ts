import { LitElement, TemplateResult } from "lit";
import { MenuPlugin } from "@openscd/oscd-plugin-core";
import "@openscd/oscd-dialog";
import "@openscd/oscd-textfield";
import { OscdDialog } from "@openscd/oscd-dialog";
import { OscdTextfield } from "@openscd/oscd-textfield";
import "@material/mwc-list";
import "@material/mwc-list/mwc-radio-list-item";
import { List } from "@material/mwc-list";
import { Scl } from "@openscd/oscd-scl";
export default class OscdNew extends LitElement implements MenuPlugin {
    dialog?: OscdDialog;
    textfield?: OscdTextfield;
    versionList?: List;
    valid: boolean;
    constructor();
    run(): Promise<void>;
    render(): TemplateResult;
    get name(): string;
    get selectedVersion(): Scl.SupportedVersion | undefined;
    protected onChange(): void;
    protected onSave(): void;
    protected onCancel(): void;
}
