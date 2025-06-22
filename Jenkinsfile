pipeline {
	agent { docker { image 'node:22.16.0-alpine3.22' } }
	tools { git 'Git-Linux' }
	stages {
		stage('build') {
			steps {
				sh 'node --version'
			}
		}
	}
}
