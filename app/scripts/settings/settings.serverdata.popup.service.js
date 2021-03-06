(function () {
    angular.module('app.settings')
        .service("ServerDataPopupService", ServerDataPopupService);

    function ServerDataPopupService($mdDialog, $rootScope, SettingsService) {
        "ngInject";
        return {
            getServerData: getServerData
        };

        function getServerData() {
            showDialog($mdDialog)
                .then(function (result) {
                    SettingsService.storeServerData(result);
                    $rootScope.$broadcast("serverDataEntered");
                });
        }

        function showDialog($mdDialog) {
            return $mdDialog.show({
                templateUrl: 'scripts/template.setupdialog.html',
                parent: angular.element(document.body),
                controller: Dialogcontroller,
                controllerAs: 'dialog',
                escapeToClose: 'false'
            });
        }

        function Dialogcontroller($mdDialog, SettingsService, $mdExpansionPanel) {
            "ngInject";
            var that = this;

            if (SettingsService.hasServerData()) {
                this.serverData = SettingsService.getServerData();
                if (this.serverData.password || this.serverData.user) {
                    $mdExpansionPanel().waitFor('credentialsPanel')
                        .then(function (instance) {
                            instance.expand({animation: false});
                        });
                }
            } else {
                this.serverData = {
                    url: '',
                    user: '',
                    password: ''
                };
            }

            this.submit = function () {
                $mdDialog.hide(that.serverData);
            };


        }
    }
})();