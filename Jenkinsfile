pipeline {
    agent any
    tools {
        nodejs 'node-18'
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm install -g npm@latest'
                sh 'npm update'
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

        stage('Deploy to Vercel') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'vercel-token',
                        variable: 'VERCEL_TOKEN'
                    )
                ]) {
                    sh '''
                        npm install -g vercel
                        vercel deploy --prod --yes --token "$VERCEL_TOKEN"
                    '''
                }
            }
        }
    }
}