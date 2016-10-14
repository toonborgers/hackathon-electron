angular.module("app.jobs")
    .service("JobsService", function ($http, $base64) {
        "ngInject";
        return {
            getJobs: getJobs
        };

        function getJobs(url, user, password) {
            if (!url.match(/.*\/api\/json$/)) {
                var extra = url.match(/.\/$/) ? "api/json" : "/api/json";

                url = url + extra;
            }

            if (user && password) {
                var headers = {"Authorization": "Basic " + $base64.encode(user + ":" + password)}
                return $http.get(url, {headers: headers});
            }

            return $http.get(url);
        }
    });
