angular.module('app')
    .controller("MainController", function (JobsService, $rootScope, SettingsService, ServerDataPopupService, $http, $interval) {
        "ngInject";
        var that = this;
        that.serverData = null;

        that.tileDimensions = [];

        var getJobs = function () {
            that.serverData = SettingsService.getServerData();
            JobsService.getJobs()
                .then(function (result) {
                    that.jobs = result.data.jobs;
                    startPolling();
                });
        };


        var pollAll = function () {
            that.jobs.forEach(poll);
        };

        var poll = function (job) {
            if (job.url) {
                $http.get(job.url + 'api/json')
                    .then(function (result) {
                        if (!result.data.jobs && result.data.lastBuild) {
                            return $http.get(job.url + 'lastBuild/api/json?depth=1')
                        }
                    })
                    .then(function (result) {
                        if (result) {
                            if(result.data.building){
                                job.color = 'darkgrey';
                            }
                            else {
                                if(result.data.result == 'SUCCESS'){
                                    job.color = 'blue';
                                }
                                else {
                                    job.color = 'red';
                                }
                            }
                        }
                    });
            }
        };

        var startPolling = function () {
            if (that.intervalStop) {
                $interval.cancel(that.intervalStop);
            }
            that.intervalStop = $interval(pollAll, 3000);
        };

        this.hasServerData = function () {
            return that.serverData != null;
        };

        this.updateServerInfo = function () {
            ServerDataPopupService.getServerData();
        };

        $rootScope.$on("serverDataEntered", function () {
            getJobs();
        });

        if (SettingsService.hasServerData()) {
            getJobs();
        }

        that.MAX_HEIGHT = 3;
        that.MAX_WIDTH = 3;

        this.taller = function(job) {
            job.height = Math.min(job.height + 1, that.MAX_HEIGHT);
        }

        this.smaller = function(job) {
            job.height = Math.max(job.height - 1, 1);
        }

        this.wider = function(job) {
            job.width = Math.min(job.width + 1, that.MAX_WIDTH);
        };

        this.thinner = function(job) {
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
            JobsService.startBuild(job);
        };


    });