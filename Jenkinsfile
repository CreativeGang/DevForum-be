pipeline {
    agent any
    
//    options {}

//    tools {}

    environment {
        AWS_ACCOUNT_ID="540303298966"
        AWS_DEFAULT_REGION="ap-southeast-2"
        JENKINS_AWS_ID="p3.aws.credentials"
        IMAGE_REPO_NAME="p3backendimagerepo"
        REPOSITORY_URL = "https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
        AWS_ECS_CLUSTER="P3-ECSCluster"
        AWS_ECS_SERVICE="P3-ECSService"
        AWS_ECS_TASK="p3ECStask"
        AWS_ECS_TASK_DEFINITION_PATH="/var/lib/jenkins/workspace/p3-BE-pipeline-Dev/ECS/container-definition-update-image.json"
        
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
                        myImage.push("${currentBuild.number}")
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
                        
                        // Replace BUILD_TAG placeholder in the task-definition json file with the remoteImageTag (imageTag-BUILD_NUMBER)
                        echo 'Replace build Tag in task definition json '
                        sh "sed -i '5s/p3backendimagerepo:tag/p3backendimagerepo:${currentBuild.number}/g' ${AWS_ECS_TASK_DEFINITION_PATH}"
                        sh "cat ${AWS_ECS_TASK_DEFINITION_PATH}"
                        
                        //create new task revision
                        echo 'create new task revision'
                        sh '''
                            aws ecs register-task-definition \
                            --family p3ECStask \
                            --requires-compatibilities EC2 \
                            --cpu 400 \
                            --memory 400 \
                            --cli-input-json file://${AWS_ECS_TASK_DEFINITION_PATH}
                        '''
                        
                        //grap taskrevision number
                        echo 'grap taskrevision number'
                        taskRevision = sh( script: "aws ecs describe-task-definition --task-definition ${AWS_ECS_TASK} | egrep revision | awk '{print \$2}' | sed 's/,\$//g'", returnStdout: true).trim()
                        echo "task revision: ${taskRevision}"
                        //defind LastTaskRevision to prepare roll back during system incident
                        //LastTaskRevision = "${taskRevision}" -1
                        
                        //update ECS service with new version of task
                        echo 'update ECS service with new version of task'
                        sh "aws ecs update-service --cluster ${AWS_ECS_CLUSTER} --service ${AWS_ECS_SERVICE} --task-definition p3ECStask:${taskRevision}"
                        //update ECS service new last version of task
                        sh "aws ecs update-service --cluster ${AWS_ECS_CLUSTER} --service ${AWS_ECS_SERVICE} --task-definition p3ECStask:${LastTaskRevision}"
                        
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
