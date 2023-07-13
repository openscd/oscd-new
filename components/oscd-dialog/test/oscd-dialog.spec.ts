import { expect, fixture, html } from '@open-wc/testing';

import '../src/OscdDialog.js';
import { OscdDialog } from '../src/OscdDialog.js';

describe('oscd-dialog', () => {
  let element: OscdDialog;

  beforeEach(async () => {
    element = await fixture(html`<oscd-dialog></oscd-dialog>`);
    await element.updateComplete;
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
