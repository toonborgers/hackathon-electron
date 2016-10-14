describe("JobsService", function () {
    var url = "http://jenkins:3544";
    var urlWithApi = "http://jenkins:3544/api/json";
    var authorization = "qmidfj";

    var jobsService,
        $http;

    beforeEach(function () {
        module("app.jobs");

        inject(function (JobsService, _$http_, _$base64_) {
            jobsService = JobsService;
            $http = _$http_;
            spyOn($http, 'get');
            spyOn(_$base64_, 'encode').and.returnValue(authorization);
        })
    });

    it("getjobs with only url", function () {
        jobsService.getJobs(urlWithApi);

        expect($http.get).toHaveBeenCalledWith(urlWithApi);
    });

    it("getjobs with authorization", function () {
        jobsService.getJobs(urlWithApi, "user", "password");

        expect($http.get).toHaveBeenCalledWith(urlWithApi, {headers: {"Authorization": "Basic " + authorization}});
    });

    it("add api bit at end of url if not present", function () {
        jobsService.getJobs(url);

        expect($http.get).toHaveBeenCalledWith(urlWithApi)
    });

    it("add api bit at end of url if not present but slash is", function () {
        jobsService.getJobs(url + "/");

        expect($http.get).toHaveBeenCalledWith(urlWithApi)
    });
});
