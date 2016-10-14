(function () {
    var electronSettings = require('electron-settings');

    angular.module("app.settings")
        .service("SettginsService", SettingsService);

    function SettingsService() {
        return {
            hasServerData: hasServerData
        };

        function hasServerData() {
            return false;
        }
    }
})();