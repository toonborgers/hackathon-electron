(function () {
    var electronSettings = require('electron-settings');

    angular.module("app.settings")
        .service("SettingsService", SettingsService);

    function SettingsService() {
        return {
            hasServerData: hasServerData
        };

        function hasServerData() {
            return false;
        }
    }
})();