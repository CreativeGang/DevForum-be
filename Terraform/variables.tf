# var region
variable "region" {
  description = "aws region"
  type        = string
  default     = "us-east-1"
}

# list port of SG
variable "ingressrules" {
  type    = list(number)
  default = [8080, 22]
}

#AMI EC2 linux
variable "jenkins_ami" {
  default = "ami-04505e74c0741db8d"
}

#EC2 instance type
variable "instance_type" {
  default = "t2.micro"
}
