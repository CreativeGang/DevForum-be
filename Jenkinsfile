pipeline {
    agent any
    
//    options {}

//    tools {}

    environment {
        AWS_ACCOUNT_ID="540303298966"
        AWS_DEFAULT_REGION="ap-southeast-2"
        JENKINS_AWS_ID="p3.aws.credentials"
        IMAGE_REPO_NAME="p3backendimagerepo"
        IMAGE_TAG="latest"
        //IMAGE_TAG="${env.BUILD_NUMBER}"
        //AWSCLI_DIR = '/usr/local/bin/'
        REPOSITORY_URL = "https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
        AWS_ECS_CLUSTER="P3-ECSCluster"
        AWS_ECS_SERVICE="P3-ECSService"
        
    }

    stages {
        stage('Git Clone') {
            steps {
                script {
                    echo 'Git Cloning..'
                    checkout([$class: 'GitSCM', branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/CreativeGang/DevForum-be.git']]])
                }
            }

            post {
                success {
                    echo "The Git Clone stage successfully."
                }
                failure {
                    echo "The Git Clone stage failed."
                    echo "delete git repo in Jenkins server.."
                    sh 'rm -rf /var/lib/jenkins/workspace/${env.JOB_NAME}/*'
                }
            }
        }

        stage('Docker Image Building & push to ECR') {
            steps {
                echo 'Building image..'
                script {
                    docker.withRegistry("${REPOSITORY_URL}","ecr:${AWS_DEFAULT_REGION}:${JENKINS_AWS_ID}"){
                        def myImage = docker.build("${IMAGE_REPO_NAME}")
                        myImage.push("${IMAGE_TAG}")
                    }
                }
            }
            
            post {
                success {
                    echo "The ECR Upload stage successfully."
                }
                failure {
                    echo "The ECR Upload stage failed."
                    echo 'Remove Deploy Files'
                    sh "sudo rm -rf /var/lib/jenkins/workspace/${env.JOB_NAME}/*"
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                echo 'ECS Deploying....'
                script{
                    withAWS(region: 'ap-southeast-2', credentials: 'p3.aws.credentials') {
                                sh 'aws ecs update-service --region ap-southeast-2 --cluster P3-ECSCluster --service P3-ECSService --force-new-deployment'
                    }
                }
            }
            
            post {
                success {
                    echo "The deploy stage successfully."
                }
                failure {
                    echo "The deploy stage failed."
                    echo 'Remove Deploy Files'
                    sh "sudo rm -rf /var/lib/jenkins/workspace/${env.JOB_NAME}/*"
                }
            }
        }

    }
    
// post {}
}
