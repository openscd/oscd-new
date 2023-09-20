import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";

import OscdNew from "../src/oscd-new.js";

customElements.define("oscd-sut", OscdNew);

describe("oscd-new", () => {
  const createElement = async (): Promise<OscdNew> => {
    const el = await fixture<OscdNew>(html`<oscd-new></oscd-new>`);

    return el;
  };

  it("Should match snapshot", async () => {
    expect(await createElement()).to.equalSnapshot();
  });
});
