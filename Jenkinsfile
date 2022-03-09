pipeline {
    agent any
    
//    options {}

//    tools {}

    environment {
        AWS_ACCOUNT_ID="355100329777"
        AWS_DEFAULT_REGION="ap-southeast-2"
        JENKINS_AWS_ID="p3.aws.credentials"
        IMAGE_REPO_NAME="p3backendimagerepo"
        IMAGE_TAG="latest"
        //IMAGE_TAG="${env.BUILD_NUMBER}"
        //AWSCLI_DIR = '/usr/local/bin/'
        REPOSITORY_URL = "https://${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
    }

    stages {
        stage('Git Clone') {
            steps {
                script {
                    try {
                        echo 'Git Cloning..'
                        checkout([$class: 'GitSCM', branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/CreativeGang/DevForum-be.git']]])
                    } catch (error) {
                        print(error)
                        env.cloneResult=false
                        currentBuild.result = 'FAILURE'
                    }
                }
            }

            post {
                success {
                    echo "The Git Clone stage successfully."
                }
                failure {
                    echo "The Git Clone stage failed."
                }
            }
        }



        stage(' Docker Image Building & push') {
            steps {
                echo 'Building image..'
                script {
                        try{
                                docker.withRegistry("${REPOSITORY_URL}","ecr:${AWS_DEFAULT_REGION}:${JENKINS_AWS_ID}"){
                                    def myImage = docker.build("${IMAGE_REPO_NAME}")
                                    myImage.push("${IMAGE_TAG}")
                                }
                        } catch (error) {
                            print(error)
                            echo 'Remove Deploy Files'
                            sh "sudo rm -rf /var/lib/jenkins/workspace/${env.JOB_NAME}/*"
                            currentBuild.result = 'FAILURE'
                        }
                }
                
            }
            
            post {
                success {
                    echo "The ECR Upload stage successfully."
                }
                failure {
                    echo "The ECR Upload stage failed."
                }
            }
        }





        stage('Deploy') {
            steps {
                echo 'ECS Deploying....'
                script{
                    try {
                            withAWS(region: 'ap-southeast-2', credentials: 'p3.aws.credentials') {
                                sh 'aws ecs update-service --region ap-southeast-2 --cluster P3-ECSCluster --service p3-ECSService --force-new-deployment'
                            }
                        
                        }catch (error) {
                            print(error)
                            echo 'Remove Deploy Files'
                            sh "sudo rm -rf /var/lib/jenkins/workspace/${env.JOB_NAME}/*"
                            currentBuild.result = 'FAILURE'
                        }
                    }
                
                }
            

            post {
                success {
                    echo "The deploy stage successfully."
                }
                failure {
                    echo "The deploy stage failed."
                }
            }
        }
    }
    
// post {}
}
