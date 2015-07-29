"use strict";

export default class WorkController {
    constructor($mdBottomSheet) {
        this.mdBottomSheet_ = $mdBottomSheet;

        this.infoShown = false;

        this.workTiles = [
            {
                id: "immerseLearning",
                title: "Immerse Learning Platform",
                infoTemplateUrl: "/templates/work-info-immerse.html",
                infoShown: false,
                rowSpan: 2,
                colSpan: 3,
                colSpanMd: 3,
                colSpanSm: 5
            },
            {
                id: "drawBuzz",
                title: "Drawbuzz",
                infoTemplateUrl: "/templates/work-info-drawbuzz.html",
                infoShown: false,
                rowSpan: 1,
                colSpan: 2,
                colSpanMd: 2,
                colSpanSm: 2
            },
            {
                id: "colorCrumble",
                title: "Color Crumble",
                infoTemplateUrl: "/templates/work-info-color-crumble.html",
                infoShown: false,
                rowSpan: 2,
                colSpan: 2,
                colSpanMd: 2,
                colSpanSm: 2
            },
            {
                id: "topOfTheBottles",
                title: "Top of the Bottles",
                infoTemplateUrl: "/templates/work-info-top-bottles.html",
                infoShown: false,
                rowSpan: 1,
                colSpan: 3,
                colSpanMd: 3,
                colSpanSm: 3
            }
        ]
    }

    showInfo(workTile) {
        var self = this;
        workTile.infoShown = true;
        this.mdBottomSheet_.show({
            templateUrl: workTile.infoTemplateUrl,
            parent     : angular.element(document.getElementById(workTile.id)),
            controller : "WorkInfoController as workInfoCtrl"
        }).then(function() {
            workTile.infoShown = false;
        }).catch(function() {
            workTile.infoShown = false;
        });

    }

    isInfoShown() {
        return this.infoShown;
    }
}

WorkController["$inject"] = ["$mdBottomSheet"];
