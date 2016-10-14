describe("App controller", function () {
    var controller;
    var service;
    var scope;
    var jobs = [1, 2, 3];
    var user = "jos";
    var password = "smos";
    var url = "url";

    beforeEach(function () {
        module("app");

        inject(function ($q, $rootScope, $controller) {
            service = {
                getJobs: function () {
                    return $q.when({
                        data: {
                            jobs: jobs
                        }
                    });
                }
            };

            controller = $controller("MainController", {
                JobsService: service
            });

            scope = $rootScope;

            spyOn(service, "getJobs").and.callThrough();

            controller.user = user;
            controller.password = password;
            controller.url = url;
        });
    });

    it("can get jobs", function () {
        controller.getJobs();
        scope.$apply();

        expect(controller.jobs).toEqual(jobs);
        expect(service.getJobs).toHaveBeenCalledWith(url, user, password)
    });
});
