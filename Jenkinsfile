pipeline {
    agent any

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
                bat '''
                "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\bin\\shutdown.bat"
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibrarymanagement.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibrarymanagement.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibrarymanagement" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibrarymanagement"
                )
                copy "LibraryManagementSystem\\target\\springbootlibrarymanagement.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootlibrarymanagement.war"
                "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\bin\\startup.bat"
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                dir('library-reactapp') {
                    echo '📦 Installing frontend dependencies...'
                    bat 'dir' // just to check package.json exists
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\bin\\shutdown.bat"
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\library-frontend" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\library-frontend"
                )
                xcopy /E /I /Y library-reactapp\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\library-frontend"
                "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\bin\\startup.bat"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed.'
        }
    }
}
