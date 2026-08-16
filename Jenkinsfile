pipeline {
    agent any

    stages {

        stage('Install') {
            steps {
                script {
                    def hasDocker = (sh(returnStatus: true, script: 'command -v docker >/dev/null 2>&1') == 0)
                    def hasNode = (sh(returnStatus: true, script: 'command -v node >/dev/null 2>&1') == 0)

                    if (hasDocker) {
                        sh '''docker run --rm -v "${WORKSPACE}:/workspace" -w /workspace node:18-alpine sh -c "npm install -g npm@latest && npm ci"'''
                    } else if (hasNode) {
                        sh 'npm install -g npm@latest || true'
                        sh 'npm ci'
                    } else {
                        sh '''
if [ -f /etc/debian_version ]; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get update && apt-get install -y nodejs
elif command -v brew >/dev/null 2>&1; then
  brew update && brew install node@18
else
  echo "No docker, no node, and no supported package manager found." >&2
  exit 1
fi
npm ci
'''
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (sh(returnStatus: true, script: 'command -v docker >/dev/null 2>&1') == 0) {
                        sh '''docker run --rm -v "${WORKSPACE}:/workspace" -w /workspace node:18-alpine sh -c "npm test"'''
                    } else {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (sh(returnStatus: true, script: 'command -v docker >/dev/null 2>&1') == 0) {
                        sh '''docker run --rm -v "${WORKSPACE}:/workspace" -w /workspace node:18-alpine sh -c "npm run build"'''
                    } else {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
                    script {
                        if (sh(returnStatus: true, script: 'command -v docker >/dev/null 2>&1') == 0) {
                            sh '''docker run --rm -v "${WORKSPACE}:/workspace" -w /workspace -e VERCEL_TOKEN="$VERCEL_TOKEN" node:18-alpine sh -c "npm install -g vercel && vercel deploy --prod --yes --token \"$VERCEL_TOKEN\""'''
                        } else {
                            sh 'npm install -g vercel || true'
                            sh 'vercel deploy --prod --yes --token "$VERCEL_TOKEN"'
                        }
                    }
                }
            }
        }
    }
}