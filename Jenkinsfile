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
                    docker.withRegistry('https://registry.hub.docker.com', '6d743854-7905-4899-8780-166d97090755') {
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
                      sh "${scannerHome}/bin/sonar-scanner"
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
