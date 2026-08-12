pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh '/usr/local/bin/docker run --rm -v "$WORKSPACE:/app" -w /app node:22 sh -c "npm install && npm run build"'
            }
        }

        stage('Test') {
            steps {
                sh '/usr/local/bin/docker run --rm -v "$WORKSPACE:/app" -w /app node:22 sh -c "npm test -- --run"'
            }
        }

        stage('Docker Build') {
            steps {
                sh '/usr/local/bin/docker build -t my-portfolio .'
            }
        }
    }
}
