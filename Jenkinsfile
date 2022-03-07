pipeline {
    agent any
    
//    options {}

//    tools {}

    environment {
        AWS_ACCOUNT_ID="355100329777"
        AWS_DEFAULT_REGION="ap-southeast-2"
        JENKINS_AWS_ID="p3.aws.credentials"
        IMAGE_REPO_NAME="p3backendimagerepo"
        IMAGE_TAG="Latest"
        AWSCLI_DIR = '/usr/local/bin/'
        REPOSITORY_URL = "https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
    }

    stages {
        stage('Git Clone') {
            steps {
                echo 'Git Cloning..'
                checkout([$class: 'GitSCM', branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/CreativeGang/DevForum-be.git']]])
            }
        }
        stage(' Docker Image Building & push') {
            steps {
                echo 'Building image..'
                script {
                    docker.withRegistry("${REPOSITORY_URL}","ecr:${AWS_DEFAULT_REGION}:${JENKINS_AWS_ID}"){
                        def myImage = docker.build("${IMAGE_REPO_NAME}")
                        myImage.push("${IMAGE_TAG}")
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'ECS Deploying....'
                script{
                    try {
                            withAWS(region: 'ap-southeast-2', credentials: 'p3.aws.credentials') {
                                sh '${AWSCLI_DIR}aws ecs update-service --region ap-southeast-2 --cluster p3-ECSCluster --service p3-ECSService --force-new-deployment'
                            }
                        
                        }catch (error) {
                            print(error)
                            echo 'Remove Deploy Files'
                            currentBuild.result = 'FAILURE'
                        }
                    }
                
                }
            }
        }
    
//    post {}
}
