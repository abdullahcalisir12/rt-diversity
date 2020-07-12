import Airtable from "airtable";

class AirtableAPI {
  base: Airtable.Base;
  constructor() {
    this.base = new Airtable({
      endpointUrl: process.env.VUE_APP_AIRTABLE_ENDPOINT_URL,
      apiKey: process.env.VUE_APP_AIRTABLE_API_KEY
    }).base(process.env.VUE_APP_AIRTABLE_BASE_ID);
  }

  async get(
    tableName: string,
    options: object = {
      view: "Grid view"
    }
  ) {
    return await this.base(tableName).select(options);
  }

  async find(tableName: string, id: string) {
    return await this.base(tableName).find(id);
  }
}

const api = new AirtableAPI();
export default api;
