#!/bin/bash

echo "Installing hub-manager startup scripts"
echo "We will copy hub-manager.conf to /etc/init/, for this we need root permissions"
echo "Please enter your root password to continue"

sudo su

cp hub-manager.conf /etc/init/hub-manager.conf

exit