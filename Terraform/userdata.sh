#!/bin/bash
####################################Python installtion#############################################
sudo apt-get -y update

sudo apt install python -y

####################################Jenkins installtion#############################################
sudo apt-get -y update
# Install OpenJDK 8
sudo apt-get -y install openjdk-11-jdk
# Install Jenkins
sudo wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo echo "deb https://pkg.jenkins.io/debian-stable binary/" >> /etc/apt/sources.list
sudo apt-get -y update
sudo apt-get -y install jenkins
 

####################################Docker installtion#############################################
sudo apt -y update
#install a few prerequisite packages which let apt use packages over HTTPS:
sudo apt install apt-transport-https ca-certificates curl software-properties-common
#add the GPG key for the official Docker repository to your system:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
#Add the Docker repository to APT sources:
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
#install Docker
sudo apt install docker-ce


####################################Git installtion#############################################
#Git will be installed by default



####################################AWSCLI installtion#############################################
#install awscli
sudo apt install awscli