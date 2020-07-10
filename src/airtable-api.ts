import Airtable from "airtable";

class AirtableAPI {
  base: Airtable.Base;
  constructor() {
    this.base = new Airtable({
      endpointUrl: process.env.VUE_APP_AIRTABLE_ENDPOINT_URL,
      apiKey: process.env.VUE_APP_AIRTABLE_API_KEY
    }).base(process.env.VUE_APP_AIRTABLE_BASE_ID);
  }

  get(
    tableName: string,
    options: object = {
      maxRecords: 3,
      view: "Grid view"
    }
  ) {
    this.base(tableName)
      .select(options)
      .eachPage(records => {
        records.forEach((record: any) => {
          console.log("Retrieved", record.get("company-name"));
        });
      });
  }
}

const api = new AirtableAPI();
export default api;
