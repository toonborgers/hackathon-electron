(function () {
    var electronSettings = require('electron-settings');

    angular.module("app.settings")
        .service("SettingsService", SettingsService);

    function SettingsService() {
        console.log("Settings file location: " + electronSettings.getSettingsFilePath());
        var key_serverData = "serverData";
        return {
            hasServerData: hasServerData,
            storeServerData: storeServerData,
            getServerData: getServerData
        };

        function hasServerData() {
            return electronSettings.hasSync(key_serverData);
        }

        function storeServerData(serverData) {
            electronSettings.setSync(key_serverData, serverData);
        }

        function getServerData() {
            return electronSettings.getSync(key_serverData);
        }
    }
})();