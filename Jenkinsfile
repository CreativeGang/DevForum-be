
pipeline {
    
    agent any
    
    environment{
        AWS_ACCOUNT_ID="355100329777"
        AWS_DEFAULT_REGION="ap-southeast-2"
        IMAGE_REPO_NAME="p3backendimagerepo"
        IMAGE_TAG="Latest"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        DOCKER_CONTAINER_NAME = "P3-Backend-Dev"
        AWSCLI_DIR = '/usr/local/bin/'
    }
    
    stages {
        
        stage ('git checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/CreativeGang/DevForum-be.git']]])
            }
        }
        
        stage ('Building Docker image'){
            steps {
                script {
                    dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
                }
            }
        }
        
        stage('Loging into AWS ECR'){
            steps {
                script {
                    sh '${AWSCLI_DIR}aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com'
                }
            }
        }
        
        stage('Pushing into AWS ECR'){
            steps {
                script {
                    sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
                }
            }
        }
        
        stage('stop previous containers') {
            steps {
                sh 'docker ps -f name=${DOCKER_CONTAINER_NAME} -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=${DOCKER_CONTAINER_NAME} -q | xargs -r docker container rm'
            }
        }
      
        stage('Docker Run') {
            steps{
                script {
                    sh 'docker run -d -p 3000:3000 --rm --name ${DOCKER_CONTAINER_NAME} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}'
                }
            }
        }
    }
}

