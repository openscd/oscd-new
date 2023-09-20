import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";

import OscdNew from "../src/oscd-new.js";
import { OscdDialog } from "@openscd/oscd-dialog";
import { List } from "@material/mwc-list";

class OscdNewTest extends OscdNew {
  public onChange() {
    super.onChange();
  }
}
customElements.define("oscd-new", OscdNewTest);

describe("oscd-new", () => {
  const createElement = async (): Promise<OscdNewTest> => {
    const el = await fixture<OscdNewTest>(html`<oscd-new></oscd-new>`);
    return el;
  };

  it("Should have a hidden dialog", async () => {
    const el: OscdNewTest = await createElement();

    await el.updateComplete;

    const dialog: OscdDialog = el.shadowRoot!.querySelector("oscd-dialog")!;

    expect(dialog.open).to.be.false;
  });

  it("Should open dialog on run()", async () => {
    const el: OscdNewTest = await createElement();

    await el.updateComplete;
    await el.run();

    const dialog: OscdDialog = el.shadowRoot!.querySelector("oscd-dialog")!;

    expect(dialog.open).to.be.true;
  });

  it("Should be invalid", async () => {
    const el: OscdNewTest = await createElement();
    await el.updateComplete;
    await el.run();

    el.textfield!.value = "";
    el.onChange();
    expect(el.valid).to.be.false;
  });

  it("Should be valid on initial form", async () => {
    const el: OscdNewTest = await createElement();
    await el.updateComplete;
    await el.run();

    expect(el.valid).to.be.true;
  });

  it("Should have 3 versions", async () => {
    const el: OscdNewTest = await createElement();
    await el.updateComplete;
    await el.run();
    const list: List = el.versionList!;

    expect(list.items.length).to.equal(3);
    expect(list.items.map((item) => item.value)).to.include("2003");
    expect(list.items.map((item) => item.value)).to.include("2007B");
    expect(list.items.map((item) => item.value)).to.include("2007B4");
  });

  it("Should have default project name", async () => {
    const el: OscdNewTest = await createElement();
    await el.updateComplete;
    await el.run();

    const textfield = el.textfield!;

    expect(textfield.value).to.equal("project.scd");
  });
});
