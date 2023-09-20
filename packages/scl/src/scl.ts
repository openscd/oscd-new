export namespace Scl {
  export type SupportedVersion = "2003" | "2007B" | "2007B4";

  export type SchemaAttributes =
    | { version: ""; revision: ""; release: "" }
    | { version: "2007"; revision: "B"; release: "" }
    | { version: "2007"; revision: "B"; release: "4" };

  export const supportedAttributes: Record<SupportedVersion, SchemaAttributes> =
    {
      "2003": { version: "", revision: "", release: "" },
      "2007B": { version: "2007", revision: "B", release: "" },
      "2007B4": { version: "2007", revision: "B", release: "4" },
    };

  export function newEmptySCD(
    id: string,
    versionId: SupportedVersion
  ): XMLDocument {
    const { version, revision, release } = supportedAttributes[versionId];
    const markup = `<?xml version="1.0" encoding="UTF-8"?>
        <SCL xmlns="http://www.iec.ch/61850/2003/SCL" ${
          version ? `version="${version}"` : ""
        } ${revision ? `revision="${revision}"` : ""} ${
      release ? `release="${release}"` : ""
    }>
          <Header id="${id}"/>
        </SCL>`;
    return new DOMParser().parseFromString(markup, "application/xml");
  }
}
