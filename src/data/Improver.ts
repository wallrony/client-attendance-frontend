const Improver = {
  createT<T>(mandatoryFields: string[], item: Record<string, any>): T {
    let data: Record<string, any> = {};

    for(const attr of Object.keys(item)) {
      if(mandatoryFields.includes(attr)) {
        data[attr] = item[attr]
      }
    }

    return data as T;
  },

  createTList<T>(mandatoryFields: string[], data: Array<Record<string, any>>): T[] {
    const list: T[] = [];

    for(const item of data) {
      list.push(this.createT(mandatoryFields, item));
    }

    return list;
  }
}

export default Improver;
