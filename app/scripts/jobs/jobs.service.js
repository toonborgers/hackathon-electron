angular.module("app.jobs")
    .service("JobsService", function ($http, $base64, SettingsService) {
        "ngInject";
        return {
            getJobs: getJobs
        };

        function getJobs() {
            var serverData = SettingsService.getServerData();
            var url = serverData.url;
            var user = serverData.user;
            var password = serverData.password;

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
