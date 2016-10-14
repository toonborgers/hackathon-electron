angular.module('app')
    .controller("MainController", function (JobsService, $rootScope, SettingsService) {
        "ngInject";
        var that = this;
        that.serverData = null;

        var getJobs = function () {
            that.serverData = SettingsService.getServerData();
            JobsService.getJobs()
                .then(function (result) {
                    that.jobs = result.data.jobs;
                });
        };

        this.hasServerData = function () {
            return that.serverData != null;
        };

        $rootScope.$on("serverDataEntered", function () {
            getJobs();
        });

        if (SettingsService.hasServerData()) {
            getJobs();
        }
    });