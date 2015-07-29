"use strict";

export default class WorkInfoController {
    constructor($mdBottomSheet) {
        this.mdBottomSheet_ = $mdBottomSheet;
    }

    closeInfo() {
        console.log("Closing Info Box");
        this.mdBottomSheet_.hide();
    }
}

WorkInfoController["$inject"] = ["$mdBottomSheet"];