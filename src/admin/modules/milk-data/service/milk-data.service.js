"use strict";
let milkDataModel = new (require("../model/milk-data.model"))();
module.exports = class MilkDataService {

    async getTodayData(form_data, res) {
        let result = await milkDataModel.getTodayData(form_data.query);
        if (result && result.length > 0) {
            return { key: 'DATA_FOUND', data: result };
        } else {
            return { key: 'DATA_NOT_FOUND' };
        }
    }
}