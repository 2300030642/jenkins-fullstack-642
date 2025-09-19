pipeline {
    agent any

    environment {
        // Set your Tomcat home
        CATALINA_HOME = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
                echo '📂 Listing workspace contents after checkout:'
                bat 'dir'
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

        stage('Deploy Backend to Tomcat (WAR)') {
            steps {
                echo '🚀 Deploying backend WAR to Tomcat...'
                bat '''
                "%CATALINA_HOME%\\bin\\shutdown.bat"
                
                if exist "%CATALINA_HOME%\\webapps\\springbootlibrarymanagement.war" (
                    del /Q "%CATALINA_HOME%\\webapps\\springbootlibrarymanagement.war"
                )
                if exist "%CATALINA_HOME%\\webapps\\springbootlibrarymanagement" (
                    rmdir /S /Q "%CATALINA_HOME%\\webapps\\springbootlibrarymanagement"
                )
                
                copy "LibraryManagementSystem\\target\\springbootlibrarymanagement.war" "%CATALINA_HOME%\\webapps\\springbootlibrarymanagement.war"
                
                "%CATALINA_HOME%\\bin\\startup.bat"
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                dir('library-reactapp') {
                    echo '📦 Installing frontend dependencies and building...'
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                echo '🚀 Deploying frontend to Tomcat...'
                bat '''
                "%CATALINA_HOME%\\bin\\shutdown.bat"
                
                if exist "%CATALINA_HOME%\\webapps\\library-frontend" (
                    rmdir /S /Q "%CATALINA_HOME%\\webapps\\library-frontend"
                )
                
                xcopy /E /I /Y library-reactapp\\dist\\* "%CATALINA_HOME%\\webapps\\library-frontend"
                
                "%CATALINA_HOME%\\bin\\startup.bat"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline Successful! Backend and Frontend deployed to Tomcat.'
        }
        failure {
            echo '❌ Pipeline Failed.'
        }
    }
}
