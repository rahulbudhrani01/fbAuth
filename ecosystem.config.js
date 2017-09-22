module.exports = {
  apps: [{
    name: 'fbAuth',
    script: './server/app.js'
    node_args: ["--debug=7000"]
  }],
  deploy: {
    development: {
      user: 'ubuntu',
      host: 'ec2-18-221-155-123.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/firstApp.pem',
      ref: 'origin/master',
      repo: 'git@github.com:rahulbudhrani01/fbAuth',
      path: '/home/ubuntu/fbAuth',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
