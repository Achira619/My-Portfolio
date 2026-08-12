pipeline {
    agent any

    stages {

        stage('Build & Test') {
            steps {
                sh '''
                    /usr/local/bin/docker run --rm \
                        -v "$WORKSPACE:/app" \
                        -w /app \
                        node:22 \
                        sh -c "npm install && npm run build && npm test"
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '/usr/local/bin/docker build -t my-portfolio .'
            }
        }
    }
}
