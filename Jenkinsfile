pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/lydiaplu/CarLeasing-client.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo "🎉 Build succeeded! All stages completed successfully."
        }

        failure {
            echo "❌ Build failed! Please check the logs."
        }

        always {
            cleanWs()  // 清空工作区（防止磁盘被占满）
            echo "📦 Pipeline finished. Check above for results."
        }
    }
}