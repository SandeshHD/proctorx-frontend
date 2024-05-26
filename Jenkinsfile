pipeline {
    agent any

    stages {
        stage('SCM Frontend') {
            steps {
                git 'https://github.com/SandeshHD/proctorx-frontend.git'
            }
        }
        stage('Run Sonar Container'){
            steps{
                sh 'docker compose -f sonarqube-compose.yml up --build -d'
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
                    sh 'kubectl apply -f deployment.yml --validate=false'
                    sh 'kubectl apply -f services.yml --validate=false'
                    sh 'kubectl get services'
                }
            }
        }
    }
}
