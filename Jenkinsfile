pipeline {
    agent {
        docker {
            image 'node:20-alpine'       // 或 node:18-alpine
            args "-v ${JENKINS_HOME}/.npm:/root/.npm -u root:root" // 可选：缓存 npm
            reuseNode true
        }
    }

    stages {
        stage('Checkout') {
            steps {
                // checkout scm
                git branch: 'main', url: 'https://github.com/lydiaplu/CarLeasing-client.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm ci'   // 比 npm install 更稳定可重复
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:ci'
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
            // 1. 让 Jenkins 读取测试结果（会在构建详情里显示多少通过/失败）
            junit 'reports/junit/junit.xml'

            // 2. 保存覆盖率报告和 junit 报告作为构建产物，可点下载/浏览
            archiveArtifacts artifacts: 'coverage/**, reports/junit/junit.xml', fingerprint: true
            
            // cleanWs()  // 清空工作区（防止磁盘被占满）
            echo "📦 Pipeline finished. Check above for results."
        }
    }
}