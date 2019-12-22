pipeline {
    agent any

    options {
        skipDefaultCheckout true
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                dir ('server') {
                	sh 'docker-compose build'
                }                                
            }
        }
        stage('Deploy') {
            steps {
                dir ('server') {
                	sh 'docker-compose down --remove-orphans'
                    sh 'docker-compose up -d --build'
                }
                
            }
        }
    }
}
