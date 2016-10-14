angular.module('app')
    .controller("MainController", function (JobsService, $rootScope, SettingsService) {
        "ngInject";
        var that = this;
        that.serverData = null;

        that.tileDimensions = [];

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

        this.larger = function(job) {
            job.height = Math.min(job.height + 1, 2);
            job.width = Math.min(job.width + 1, 2);
        };

        this.smaller = function(job) {
            job.height = Math.max(job.height - 1, 1);
            job.width = Math.max(job.width - 1, 1);
        };

        this.getColor = function(job) {
            var baseColor = that.baseColor(job);
            if(baseColor == 'blue'){
                return 'cornflowerblue';
            }
            else if (baseColor == 'red'){
                return 'tomato';
            }
            else{
                return 'darkgrey';
            }
        };

        this.baseColor = function(job) {
            if(job.color != undefined) {
                return job.color;
            }
            else {
                results = []
                job.jobs.forEach(function (subjob) {
                    results.push(that.getColor(subjob))
                });
                if(results.indexOf('red') != -1) {
                    return 'red';
                }
                else {
                    return 'blue';
                }
            }
        };
        
        this.promptBuild = function(job) {
            JobsService.startBuild(job).then(function() {
                JobsService.getJobs();
            });
        }
    });