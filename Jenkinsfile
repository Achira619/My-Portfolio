pipeline {
    agent any

    tools {
        nodejs 'Node 22'
    }

    stages {
        stage('Install') {
            steps {
              sh 'npm install -g npm@latest'
              
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
