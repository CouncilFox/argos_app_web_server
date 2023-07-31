/**
 * PM2 Application Configuration File (start.config.js)
 * 
 * This configuration file tells PM2 how to run your application.
 * 
 * In this file, we define an application with the name "argos_app_web_server" which will be managed by PM2.
 * 
 * We specify the start script using the "script" and "args" properties.
 * The "script" property is set to "npm", and the "args" property is set to "run start".
 * This means that PM2 will run the command "npm run start" to start your application.
 * 
 * In your package.json file, the "start" script runs your application using Node.js 
 * and the "prestart" script runs "npm install" before the application starts.
 * So, when PM2 starts your application, it will:
 *   1. Run "npm install" to install new dependencies,
 *   2. Then run your application using Node.js.
 * 
 * PM2 will manage your application, automatically restarting it if it crashes.
 * You can also configure PM2 to start your application when the server boots up.
 */

module.exports = {
  apps : [{
    name: "argos_app_web_server",
    script: "npm",
    args: "run start"
  }]
}
