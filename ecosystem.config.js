module.exports = {
  apps: [{
    name: 'fbAuth',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-52-15-226-69.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/firstApp.pem',
      ref: 'origin/master',
      repo: 'git@github.com:rahulbudhrani01/fbAuth',
      path: '/home/ubuntu/fbAuth',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
