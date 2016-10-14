angular.module('app')
    .controller("MainController", function (JobsService, $rootScope, SettingsService) {
        "ngInject";
        var that = this;

        var getJobs = function () {
            JobsService.getJobs()
                .then(function (result) {
                    that.jobs = result.data.jobs;
                });
        };

        $rootScope.$on("serverDataEntered", function () {
            getJobs();
        });

        if (SettingsService.hasServerData()) {
            getJobs();
        }
    });