angular.module('app')
    .controller("MainController", function (JobsService) {
        "ngInject";
        var that = this;

        this.getJobs = function () {
            JobsService.getJobs(that.url, that.user, that.password)
                .then(function (result) {
                    that.jobs = result.data.jobs;
                });
        };
    });