(function () {
    angular.module('app')
        .run(function ($mdDialog) {
            $mdDialog.show({
                templateUrl: 'scripts/template.setupdialog.html',
                parent: angular.element(document.body),
                controller: Dialogcontroller,
                controllerAs: 'dialog',
                escapeToClose: 'false'
            }).then(function (result) {
                console.log(JSON.stringify(result));
            });
        });

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