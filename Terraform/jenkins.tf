#create ec2 instance
resource "aws_instance" "JenkinsEC2" {
  instance_type   = var.instance_type
  ami             = var.jenkins_ami
  security_groups = [aws_security_group.jenkins_traffic.name]
  key_name        = "xinlei"
  #user_data       = "${file("userdata.sh")}"

  tags = {
    Name = "Jenkins-Server"
  }
    
}


output "jenkins_endpoint" {
  value = formatlist("http://%s:%s", aws_instance.JenkinsEC2.public_ip, "8080")
}