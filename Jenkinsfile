pipeline {
	agent { label 'linux' }
	tools { git 'Git-Linux' }
	stages {
		stage('Checkout Code') {
			steps {
				checkout scm
			}
		}

		stage('Build') {
			agent { docker { image 'node:22.16.0-alpine3.22' } }
			steps {
				echo "Running in a Docker Container!"
				sh 'node --version'
			}
		}
	}
}
