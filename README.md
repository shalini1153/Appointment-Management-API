![til](./Appointment_Management.gif)

# Appointment-Management-API

ba10613b1033af0f1f27033779f3bf2a

52e9f913a4e81c874cf2a6fbb4c3b367

Application Name
Appointment-Management-system
OAuth2 Redirect URL
http://localhost:4200
OAuth2 Client Id
ba10613b1033af0f1f27033779f3bf2a
OAuth2 Client Secret
52e9f913a4e81c874cf2a6fbb4c3b367


export PROJECT_ID=totemic-sector-341014

docker build -t gcr.io/totemic-sector-341014/appointment:v1 .

gcloud services enable containerregistry.googleapis.com

docker push gcr.io/totemic-sector-341014/appointment:v1

gcloud builds submit --tag us-central1-docker.pkg.dev/totemic-sector-341014/appointment-management-repo/appointment:v1

docker run gcr.io/totemic-sector-341014/appointment:v1

gcloud builds submit --tag gcr.io/totemic-sector-341014/appointment

gcloud container images delete gcr.io/totemic-sector-341014/appointment:v1  --force-delete-tags --quiet

http://35.246.44.203:8000



resourcemanager.projects.get
serviceusage.services.get

kubectl create deployment appointment-management --image=gcr.io/totemic-sector-341014/appointment:v1

gcloud artifacts repositories create appointment-management-repo --repository-format=docker \
    --location=us-central1 --description="Docker repository"
    
    
    gcloud container clusters create appointment-management-cluster
    
    kubectl scale deployment appointment-management --replicas=3
    
    kubectl autoscale deployment appointment-management --cpu-percent=80 --min=1 --max=5
    
    kubectl expose deployment clublit --name=clublit-service --type=LoadBalancer --port 3000 --target-port 3000

    
    kubectl expose deployment appointment-management --name=appointment-management-service --type=LoadBalancer --port 3000 --target-port 3000
