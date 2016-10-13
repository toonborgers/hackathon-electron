REPO = "https://github.com/toonborgers/hackathon-electron"
IMAGE_FOR_TESTS = "test:1";

stage name: "Build"
node {
    checkout();
    ensureDockerImage();
    runTests();
}

/**
 * Helper functions
 */
def checkout() {
    cleanWorkspace()
    git url: REPO
}

def cleanWorkspace() {
    sh 'rm -rf *'
}

def ensureDockerImage() {
    String imageExists = executeCommand("sudo docker images -q ${IMAGE_FOR_TESTS}")
    if (!imageExists?.trim()) {
        sh "docker build -t ${IMAGE_FOR_TESTS} jenkins/docker/"
    }
}

def runTests() {
    def currentDir = executeCommand("pwd");
    sh "sudo docker run -i --rm \
        -v ${currentDir}:/var/workspace \
        ${IMAGE_FOR_TESTS} \
        /bin/bash jenkins/buildOnJenkins.sh"

    step([$class: "JUnitResultArchiver", testResults: "**/target/results/TEST*.xml"])

    def resultcode = readFile("resultcode").trim();
    if (resultcode != "0") {
        currentBuild.result = 'FAILURE'
    }
}

def executeCommand(String command) {
    sh "${command} > commandOutput.txt"
    def commandOutput = readFile("commandOutput.txt").trim()
    sh "rm commandOutput.txt"
    commandOutput
}