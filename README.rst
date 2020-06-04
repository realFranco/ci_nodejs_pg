=======================
CI Nodejs Postgres Example
=======================

.. image:: https://img.shields.io/badge/Node%20JS-12-green?style=for-the-badge&logo=appveyor
.. image:: https://img.shields.io/badge/DBMS-Postgres-blue?style=for-the-badge&logo=appveyor

**Manually steps** to install and run the bakcend app on an instance.
In the future I can use a docker to decrese the tricky steps for turn on
the app.

Follow the next set of steps:

    .. code-block:: console 
        $: # Clone the repo

        $: npm install

        $: # Go the db folder and create de database 'ci'
        $: cd db
        $: psql -d postgres -U user_name -h localhost -f 0_create_db.sql

        $: # Connect to the 'ci' table, this time to create the tables
        $: psql -d ci -U user_name -h localhost -f 1_create_tables.sql

        $: # Go back to the root folder of the project
        $: node app

        $: # Deamonize our app
        $: sudo npm install -g pm2

        $: # Remeber be placed at the root the folder.
        $: # In our case, the app.js file is the entry point for the project
        $: pm2 start app.js

        $: pm2 startup systemd
        $: # Use and execute the code line returned by the command above

        $: systemctl status pm2-ubuntu

        $: # (Optionall), you can list the currently apps. managed by pm2
        $: pm2 list

        $: # Follow the next command to start | stop | reload the service
        $: pm2 stop | start | restart  app.js


========================================
Set up Nginx as a Reverse Proxy Server
========================================

        .. code-block:: console
        
        $: sudo nano /etc/nginx/sites-available/default

        . . .
        location / {
            proxy_pass http://localhost:7000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        $: # Check if the nginx config. syntax  it is correct to proceed
        $: sudo nginx -t

===============
Start the app 
===============

        .. code-block:: console

        $: sudo service nginx start | restart

Now go to the web browser or the **curl** command and make a *GET* request
over the domain of the app.

======
Notes:        
======

If you want to change the port number where the app listen the requests
edit the **.env** file and restart the app.

If you have close to apache2 server write the next command:

    .. code-block:: console

    - sudo service apache2 stop
    
This is a resume from the digital ocean community. You follow the complete
tutorial, at the next link.

- `digitalocen Tutorial <https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04>`__
