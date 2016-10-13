REPO = "https://github.com/toonborgers/hackathon-electron"
IMAGE_FOR_TESTS = "test:1";

stage name: "Build"
node {
    checkout();
    ensureDockerImage();
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

def ensureDockerImage(){
    def imageExists = executeCommand("docker images -q ${IMAGE_FOR_TESTS}")
    echo "Image exists: [${imageExists}]"
}

def executeCommand(String command) {
    sh "${command} > commandOutput.txt"
    def commandOutput = readFile("commandOutput.txt").trim()
    sh "rm commandOutput.txt"
    commandOutput
}