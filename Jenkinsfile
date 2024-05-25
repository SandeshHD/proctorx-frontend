pipeline {
    agent any

    stages {
        stage('SCM Frontend') {
            steps {
                git 'https://github.com/SandeshHD/proctorx-frontend.git'
            }
        }
        stage('Frontend Docker Build'){
            steps{
                sh 'docker compose build'
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', '1a048b20-d794-4a44-94d5-a29598892077') {
                        docker.image('sandeshhd/proctorx-frontend-admin:latest').push()
                        docker.image('sandeshhd/proctorx-frontend-students:latest').push()
                        docker.image('sandeshhd/proctorx-frontend-super-admin:latest').push()
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps{
                script{
                    def scannerHome = tool 'sonar';
                    withSonarQubeEnv('sonarFrontend') {
                      sh "${scannerHome}/bin/sonar-scanner.sh"
                    }
                    
                }
            }
        }
        stage('Kubernetes Start'){
            steps{
                script{
                    sh 'kubectl apply -f deployment.yml'
                    sh 'kubectl apply -f services.yml'
                    sh 'kubectl get services'
                }
            }
        }
    }
}
