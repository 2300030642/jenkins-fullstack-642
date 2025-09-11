pipeline {
    agent any

    environment {
        // Set your Tomcat path
        CATALINA_HOME = 'C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1'
        PATH = "C:\\Program Files\\nodejs;C:\\Program Files\\Apache\\maven\\bin;${env.PATH}"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo '🧹 Cleaning workspace...'
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm

                echo '📂 Listing workspace contents:'
                bat 'dir'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('library-reactapp') {
                    echo '📦 Installing frontend dependencies...'
                    bat 'npm install'
                    echo '🚀 Building frontend...'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('LibraryManagementSystem') {
                    echo '⚙️ Building backend with Maven...'
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                echo '📂 Deploying frontend and backend to Tomcat...'
                bat """
                "%CATALINA_HOME%\\bin\\shutdown.bat"
                timeout /t 5

                :: Deploy frontend
                if exist "%CATALINA_HOME%\\webapps\\library-frontend" rmdir /S /Q "%CATALINA_HOME%\\webapps\\library-frontend"
                xcopy /E /I /Y library-reactapp\\dist\\* "%CATALINA_HOME%\\webapps\\library-frontend"

                :: Deploy backend
                if exist "%CATALINA_HOME%\\webapps\\library-backend.war" del /Q "%CATALINA_HOME%\\webapps\\library-backend.war"
                if exist "%CATALINA_HOME%\\webapps\\library-backend" rmdir /S /Q "%CATALINA_HOME%\\webapps\\library-backend"
                copy "LibraryManagementSystem\\target\\*.war" "%CATALINA_HOME%\\webapps\\library-backend.war"

                "%CATALINA_HOME%\\bin\\startup.bat"
                """
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check console output.'
        }
    }
}
