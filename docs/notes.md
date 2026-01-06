


### Deploy to production

scp -r -i /home/davey/.ssh/deploy.pem /repo/personal_api/* deploy@web:/var/www/personal_api/

pip install -r requirements.txt