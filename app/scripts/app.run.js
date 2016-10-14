(function () {
    angular.module('app')
        .run(function (SettingsService, ServerDataPopupService) {
            "ngInject";
            if (!SettingsService.hasServerData()) {
                ServerDataPopupService.getServerData();
            }
        });
})();