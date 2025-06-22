pipeline {
	agent {
		docker { 
			image 'node:22.16.0-alpine3.22' 
			label 'linux'
		}
	}
	stages {
		stage('Install') {
			steps {
				echo "Installing git in container"
				sh 'apk add --no-cache git'
				echo "Git is now installed: "
				sh 'git --version'
				echo "Checking out code"
				checkout scm
			}
		}
		
		stage('Build') {
			steps {
				echo "Node.js Version: "
				sh 'node --version'
			}
		}
	}
}
