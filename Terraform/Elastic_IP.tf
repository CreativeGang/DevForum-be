#Elastic IP
resource "aws_eip" "elastic_ip" {
  vpc = true

  tags = {
    Name = "elasticIP for Jenkins Server"
  }
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.JenkinsEC2.id
  allocation_id = aws_eip.elastic_ip.id
}