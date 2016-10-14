(function () {
    angular.module('app')
        .run(function ($mdDialog, $rootScope, SettingsService) {
            "ngInject";
            if (!SettingsService.hasServerData()) {
                showDialog($mdDialog)
                    .then(function (result) {
                        SettingsService.storeServerData(result);
                        $rootScope.$broadcast("serverDataEntered");
                    });
            }
        });

    function showDialog($mdDialog) {
        return $mdDialog.show({
            templateUrl: 'scripts/template.setupdialog.html',
            parent: angular.element(document.body),
            controller: Dialogcontroller,
            controllerAs: 'dialog',
            escapeToClose: 'false'
        });
    }

    function Dialogcontroller($mdDialog) {
        "ngInject";
        var that = this;
        this.serverData = {
            url: '',
            user: '',
            password: ''
        };

        this.submit = function () {
            $mdDialog.hide(that.serverData);
        }
    }
})();